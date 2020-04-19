import React, { useState, useEffect } from 'react';
let Track = (props) => {
    const [type, setType] = useState(true)
    const handleTrackClick = e => {
        setType(!type)
    }
    if (type === true) {
        return (
            <div className='track'>
                <div className='albumArt hvr-grow'>
                    <img src={props.art} className='albumArt' />
                </div>
                <div className='trackInfo' onClick={handleTrackClick}>
                    <h4 className='trackName'>{props.name}</h4>
                    <div className='trackName2'>
                        <h5 className='trackArtist'>{props.artist}</h5>
                        <h5 className='trackLength'>{props.duration}</h5>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className='track'>
                <div className='albumArt hvr-grow'>
                    <img src={props.art} className='albumArt' />
                </div>
                <div className='eventInfo' onClick={handleTrackClick}>
                    <p className='eventText'>
                        <p><b>{props.artist}</b> @ {props.venue}</p>
                        <p>{props.location}:{props.time}</p>
                    </p>
                </div>
            </div>
        )
    }
}

export default Track