import React from "react";
let Track = (props) => {
    const handleTrackClick = e => {
        props.handleTrackClick(props.index);
    }
    return (
        <div className='track'>
            <div className='albumArt hvr-grow'>
                <img src={props.art} className='albumArt' />
            </div>
            <div className='trackInfo'>
                <h4 className='trackName'>{props.name}</h4>
                <div className='trackName2'>
                    <h5 className='trackArtist'>{props.artist}</h5>
                    <h5 className='trackLength'>{props.duration}</h5>
                </div>
            </div>
        </div>
    )
}

export default Track