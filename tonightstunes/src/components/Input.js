import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { bounceOutLeft } from 'react-animations';
import { jello } from 'react-animations';
import Autocomplete from "./Autocomplete";
import Track from './Track.js'
import Filters from './Filters'

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
    const [token, setToken] = useState(null)

    useEffect(() => {
        let token = window.location.hash.substr(1).split('&')[0].split("=")[1]
        if (token) {
            //console.log(token)
            setToken(token)
        }
    }, []);

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

        fetch('http://localhost:3001/nearby', requestOptions)
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
                    }
                }
            }
            //setLoading(false)
            newTracks = await sortTracks(newTracks)
            setTracks(newTracks)
        }
    }

    const login = () => {
        let client_id = '2a1e4b30a72b41feb5c432aed9877ccb'
        let redirect_uri = 'http%3A%2F%2Flocalhost%3A3000'
        let scopes = 'user-top-read'
        let popup = window.open(`https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}&scope=${scopes}&show_dialog=true`, 'Login with Spotify', 'width=800,height=600')
        window.spotifyCallback = (payload) => {
            //alert(payload)
            popup.close()
            fetch('https://api.spotify.com/v1/me/top/artists', {
                headers: {
                    'Authorization': `Bearer ${payload}`
                }
            }).then(response => {
                return response.json()
            }).then(data => {
                //output data
                console.log(data)
            })
        }
    }

    const popularSort = (a, b) => {
        let aPop = a.track.popularity + a.event.popularity
        let bPop = b.track.popularity + b.event.popularity
        return bPop - aPop
    }

    const dateSort = (a, b) => {
        let aDate = new Date(a.event.date)
        let bDate = new Date(b.event.date)
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
        if (value < 50 && value >= 0) {
            setSize(value)
        }
        else (setSize(20))
    }

    const sortTracks = async (input) => {
        setLoading(true)
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

    function formatDate(dateStr) {
        let date = new Date(dateStr)
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return (date.getMonth() + 1) + "/" + date.getDate() + " @ " + strTime;
    }

    const classy = css(shouldMove() ? styles.bounceOutLeft : styles.nothing)
    const noTracks = () => {
        return (
            <div className='noTracksDiv'>
                <h1 className='noTracksMsg'>no tracks found 😔</h1>
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
                        duration={obj.track.duration}
                        art={obj.track.art}
                        selected={(index === selectedTrack) ? true : false}
                        handleMouseover={handleMouseover}
                        audio={obj.track.audio}
                        venue={obj.event.venue ? obj.event.venue['name'] : '?'}
                        venueLink={obj.event.venue ? obj.event.venue['link'] : '/'}
                        date={obj.event.date ? formatDate(obj.event.date) : 'unknown date'}
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
        )
    }
    else if (!loading) {
        return (
            <div className='trackContainer'>
                <Filters updateSize={updateSize} size={size} location={location} changeTime={changeTime} changeSort={changeSort} shuffle={fetchTracks}></Filters>
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