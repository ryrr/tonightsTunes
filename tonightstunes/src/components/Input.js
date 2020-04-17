import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { bounceOutLeft } from 'react-animations';
import Autocomplete from "./Autocomplete";
import Track from './Track.js'

let Input = (props) => {
    const [animation, setAnimation] = useState(null)
    const [v, setV] = useState(true)
    const [tracks, setTracks] = useState([]);
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
        console.log(location)
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

    }
    const processData = data => {
        console.log(data);
        let newTracks = []
        for (let obj of data.events) {
            if (obj.tracks) {
                if (obj.tracks[0]) {
                    obj.tracks[0].duration = millisToMinutesAndSeconds(obj.tracks[0].duration)
                    newTracks.push(obj.tracks[0])
                }
            }
        }
        setTracks(newTracks)
    }

    const millisToMinutesAndSeconds = millis => {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    const createTracks = () => {

        return (<div className='tracks'>
            {
                tracks.map((track, index) => (
                    <Track
                        key={index}
                        index={index}
                        artist={track.artist}
                        name={track.name}
                        duration={track.duration}
                        art={track.art}
                        audio={track.audio} />
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