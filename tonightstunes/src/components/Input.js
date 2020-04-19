import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { bounceOutLeft } from 'react-animations';
import Autocomplete from "./Autocomplete";
import Track from './Track.js'

let Input = (props) => {
    const [animation, setAnimation] = useState(null)
    const [v, setV] = useState(true)
    const [tracks, setTracks] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState(-1);
    const testData = require('../util/testData.json')

    let locationSubmit = (e) => {
        e.preventDefault()
        setAnimation('bounceOutLeft')
        setV(false)
        /*
        setTimeout(function () {
            setAnimation(null)
        }, 900);
        */
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
        /*
        fetch('http://localhost:3001/nearby', requestOptions)
            .then(response => response.json())
            .then(data => processData(data));
        */
        //console.log(testData)
        processData(testData)
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
        setTracks(newTracks)
    }

    const handleTrackClick = (trackNum) => {
        console.log(trackNum)
        if (trackNum === selectedTrack) {
            setSelectedTrack(-1);
        }
        else {
            setSelectedTrack(trackNum);
        }
    }


    const millisToMinutesAndSeconds = millis => {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
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
                        handleTrackClick={handleTrackClick}
                        audio={obj.track.audio}
                        venue={obj.event.venue ? obj.event.venue['name'] : '?'}
                        venueLink={obj.event.venue ? obj.event.venue['link'] : '/'}
                        location={obj.event.location}

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