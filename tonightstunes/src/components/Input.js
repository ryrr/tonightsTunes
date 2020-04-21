import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { bounceOutLeft } from 'react-animations';
import Autocomplete from "./Autocomplete";
import Track from './Track.js'
import Filters from './Filters'

let Input = (props) => {
    const [animation, setAnimation] = useState(null)
    const [v, setV] = useState(true)
    const [tracks, setTracks] = useState([]);
    const [audioPlayer] = useState(new Audio());
    const [selectedTrack, setSelectedTrack] = useState(-1);
    //const testData = require('../util/testDataAudio.json')

    let locationSubmit = (e) => {
        e.preventDefault()
        setAnimation('bounceOutLeft')
        setV(false)

        setTimeout(function () {
            setAnimation(null)
        }, 900);

        fetchTracks(e.target[0].value)
    }

    let fetchTracks = (location) => {
        const token = props.token;
        let data = {
            token: token,
            location: location,
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
    const processData = data => {
        let newTracks = []
        for (let obj of data.events) {
            if (obj.tracks) {
                if (obj.tracks[0]) {
                    obj.tracks[0].duration = millisToMinutesAndSeconds(obj.tracks[0].duration)
                    newTracks.push({ track: obj.tracks[0], event: obj.event })
                }
            }
        }
        newTracks = shuffle(newTracks)
        setTracks(newTracks)
    }

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


    const millisToMinutesAndSeconds = millis => {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
    }).join('')

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

    const createTracks = () => {

        return (<div className='tracks'>
            {
                tracks.map((obj, index) => (
                    <Track
                        key={index}
                        index={index}
                        artist={obj.track.artist}
                        name={obj.track.name}
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

    let shouldMove = () => {
        if (animation) {
            return true
        }
        else { return false }
    }
    const classy = css(
        shouldMove() ? styles.bounceOutLeft : styles.nothing
    )
    if (v) {
        return (
            <div className='locationDiv'>
                <form onSubmit={locationSubmit} className={classy}>
                    <Autocomplete
                        className='locationForm'
                        suggestions={
                            {
                                '7644': 'New York',
                                'N2393': 'New Yam'
                            }
                        }
                    />
                </form>
            </div>
        )
    }
    else {
        return (

            <div className='trackContainer'>
                <Filters></Filters>
                {v ? null : createTracks()}
            </div>
        )
    }
}

const styles = StyleSheet.create({
    nothing: {},
    bounceOutLeft: {
        animationName: bounceOutLeft,
        animationDuration: '1s',
    }
})





export default Input