import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { bounceOutLeft } from 'react-animations';
import { jello } from 'react-animations';
import Autocomplete from "./Autocomplete";
import Track from './Track.js'
import Filters from './Filters'
import Connect from './Connect.js'
const moment = require('moment')

let Input = (props) => {
    const [animation, setAnimation] = useState(null)
    const [v, setV] = useState(true)
    const [tracks, setTracks] = useState([]);
    const [audioPlayer] = useState(new Audio());
    const [selectedTrack, setSelectedTrack] = useState(-1);
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState(null)
    const [sortType, setSortType] = useState('random')
    const [time, setTime] = useState('day')
    const [size, setSize] = useState(20)
    const [badLocation, setBadLocation] = useState(false)
    const [uris, setUris] = useState([])
    const [added, setAdded] = useState(false)

    let locationSubmit = (e) => {
        e.preventDefault()
        setAnimation('bounceOutLeft')
        setV(false)
        setTimeout(function () {
            setAnimation(null)
        }, 900);
        setLocation(e.target[0].value)
        fetchTracks(e.target[0].value)
    }

    let fetchTracks = (location) => {
        setLoading(true)
        const token = props.token;
        let data = {
            token: token,
            location: location,
            span: time,
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        //167.172.138.71
        //localhost
        fetch('http://167.172.138.71:2222/nearby', requestOptions)
            .then(response => response.json())
            .then(data => processData(data));

        //console.log(testData)
        //processData(testData)
    }
    const processData = async (data) => {
        if (data.err) {
            setBadLocation(true)
            setV(true)
            setLoading(false)
        }
        else {
            setBadLocation(false)
            let newTracks = []
            let trackUris = []
            let counter = 0
            console.log(size)
            console.log(counter)
            let shuffledEvents = shuffle(data.events)
            for (let obj of shuffledEvents) {
                if (counter === size) {
                    console.log('broke')
                    break
                }
                if (obj.tracks) {
                    if (obj.tracks[0]) {
                        counter += 1
                        obj.tracks[0].duration = millisToMinutesAndSeconds(obj.tracks[0].duration)
                        newTracks.push({ track: obj.tracks[0], event: obj.event })
                        trackUris.push(obj.tracks[0].uri)
                    }
                }
            }
            setUris(trackUris)
            newTracks = await sortTracks(newTracks)
            setTracks(newTracks)
        }
    }



    const popularSort = (a, b) => {
        let aPop = a.track.popularity + a.event.popularity
        let bPop = b.track.popularity + b.event.popularity
        return bPop - aPop
    }

    const dateSort = (a, b) => {

        let aDate = new Date(a.event.date).toISOString()
        let bDate = new Date(b.event.date).toISOString()
        return aDate - bDate
    }

    const changeSort = (e) => {
        setSortType(e.target.value)
    }

    const changeTime = (e) => {
        let value = e.target.value
        if (value === 'tonight') {
            setTime('day')
        }
        else {
            setTime('week')
        }
    }

    const updateSize = (value) => {
        value = Number(value)
        if (value < 50 && value >= 1) {
            setSize(value)
        }
        else (setSize(20))
    }

    const sortTracks = async (input) => {
        setLoading(true)
        setAdded(false)
        let sortedTracks
        if (input) { sortedTracks = input }
        else { sortedTracks = tracks }
        if (sortType === 'popularity') {
            sortedTracks.sort(popularSort)
        }
        else if (sortType === 'date') {
            sortedTracks.sort(dateSort)
        }
        if (!input) { setTracks(sortedTracks) }
        setTimeout(function () {
            setLoading(false)
            setSortType('random')
        }, 500);
        return sortedTracks

    }
    const handleMouseover = (trackNum) => {
        if (trackNum === selectedTrack) {
            audioPlayer.pause();
            setSelectedTrack(-1);
        }
        else {
            const newSource = tracks[trackNum].track.audio;
            //console.log(newSource)
            if (newSource === null)
                audioPlayer.pause();
            else {
                audioPlayer.src = newSource
                audioPlayer.play()
            }

            setSelectedTrack(trackNum);
        }
    }

    let shouldMove = () => {
        if (animation) {
            return true
        }
        else { return false }
    }

    const goBack = () => {
        setV(true)
        setSize(20)
    }

    //HELPERS

    function formatDate(dateStr) {
        //console.log(dateStr)
        let blah = moment.utc(dateStr).toDate()
	dateStr = moment(blah).local().format('YYYY-MM-DD HH:mm:ss')
        let hours = moment(dateStr).hour();
       //dateStr = blah.toISOString()
        console.log('format fn: '+dateStr)
        if (!dateStr || !hours) {
            return null
        }
        else {
            let minutes = moment(dateStr).minute();
            let ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;
            let strTime = hours + ':' + minutes + ' ' + ampm;
            let thingy = moment(dateStr).month() + "/" + moment(dateStr).date() + " @ " + strTime
            thingy = thingy.toString()
            console.log(thingy+'\n')
            return thingy
        }
    }

    const millisToMinutesAndSeconds = millis => {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
    }).join('')

    function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    const classy = css(shouldMove() ? styles.bounceOutLeft : styles.nothing)
    const noTracks = () => {
        return (
            <div className='noTracksDiv'>
                <h1 className='noTracksMsg'>no events found 😔</h1>
                <button className='goBackBttn' onClick={goBack}>go back</button>
            </div>
        )
    }
    const createTracks = () => {
        return (<div className='tracks'>
            {
                tracks.map((obj, index) => (
                    <Track
                        key={index}
                        index={index}
                        artist={obj.track.artist}
                        name={obj.track.name}
                        link={obj.event.link}
                        uri={obj.track.uri}
                        duration={obj.track.duration}
                        art={obj.track.art}
                        selected={(index === selectedTrack) ? true : false}
                        handleMouseover={handleMouseover}
                        audio={obj.track.audio}
                        venue={obj.event.venue ? obj.event.venue['name'] : '?'}
                        venueLink={obj.event.venue ? obj.event.venue['link'] : '/'}
                        date={obj.event.date ? formatDate(obj.event.date) : 'unknown date'}
                        dateStr={formatDate(obj.event.date2) ? formatDate(obj.event.date2) : 'unknown date'}
                        location={obj.event.location}
                        primaryColor={rgbToHex(obj.track.colors[0][0], obj.track.colors[0][1], obj.track.colors[0][2])}
                        secondaryColor={rgbToHex(obj.track.colors[1][0], obj.track.colors[1][1], obj.track.colors[1][2])}
                        detailColor={rgbToHex(obj.track.colors[2][0], obj.track.colors[2][1], obj.track.colors[2][2])}
                    />
                ))
            }
        </div>);
    }
    if (v) {
        return (
            <div className='wrapper'>
                <div className='locationDiv'>
                    <form onSubmit={locationSubmit} className={classy, 'timmy'}>
                        <input
                            className='cityInput'
                            placeholder='enter a city'
                            suggestions={
                                {
                                    '7644': 'New York',
                                    'N2393': 'New Yam'
                                }
                            }
                        />
                        <h3 className={'locNotFound', css(styles.jello)}>{badLocation ? '🤔city not found, try again🤔' : null}</h3>
                    </form>
                </div>
                <h4 className='footer'>©2020 Ryan Rivera </h4>
            </div>
        )
    }
    else if (!loading && added) {
        return (
            <div className='trackContainer'>
                <a className='playlistLink' href={added} target="_blank"><h3 className='added' >🎉 playlist added here 🎉</h3></a>
                <Filters goBack={goBack} updateSize={updateSize} size={size} location={location} changeTime={changeTime} changeSort={changeSort} shuffle={fetchTracks}></Filters>
                {tracks.length ? null : noTracks()}
                {loading ? null : createTracks()}
            </div>
        )
    }
    else if (!loading) {
        return (
            <div className='trackContainer'>
                {props.accessToken ? <Connect setAdded={(playLink) => { setAdded(playLink) }} uris={uris} token={props.accessToken}></Connect> : null}
                <Filters goBack={goBack} updateSize={updateSize} size={size} location={location} changeTime={changeTime} changeSort={changeSort} shuffle={fetchTracks}></Filters>
                {tracks.length ? null : noTracks()}
                {loading ? null : createTracks()}
            </div>
        )
    }
    else {
        return (
            <div className='loading'>
                <i style={{ color: '#63585E' }} className="fas fa-circle-notch fa-spin fa-2x"></i>
            </div>
        )
    }
}

const styles = StyleSheet.create({
    nothing: {},
    bounceOutLeft: {
        animationName: bounceOutLeft,
        animationDuration: '1s',
    },
    jello: {
        animationName: jello,
        animationDuration: '1s',
        fontFamily: 'Roboto',
        color: '#C0C8E2',
        padding: '5px',
    }
})





export default Input
