import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
let Track = (props) => {
    const [type, setType] = useState(true)
    const handleTrackClick = e => {
        setType(!type)
    }
    const handleMouseover = e => {
        props.handleMouseover(props.index)
    }
    const primaryColor = props.primaryColor
    const secondaryColor = props.secondaryColor
    const styles = StyleSheet.create({
        detailColor: {
            color: props.detailColor
        }
    })

    if (type === true) {
        return (
            <div className='track' style={{ backgroundColor: primaryColor, borderBottom: 'solid ' + primaryColor }}>
                <div className='albumArt hvr-grow'>
                    <img src={props.art} className='albumArt' onClick={handleMouseover} />
                </div>
                <div className='trackInfo' onClick={handleTrackClick} style={{ color: secondaryColor }}>
                    <h4 className='trackName'>{props.name}</h4>
                    <div className='trackName2'>
                        <p className='trackArtist'>{props.artist}</p>
                        <p className='trackLength'>{props.duration}</p>
                    </div>
                </div>
            </div >
        )
    }
    else {
        return (
            <div className='track' style={{ backgroundColor: primaryColor, borderBottom: 'solid ' + primaryColor }}>
                <div className='albumArt hvr-grow'>
                    <img src={props.art} className='albumArt' onClick={handleMouseover} />
                </div>
                <div className='eventInfo' onClick={handleTrackClick} style={{ color: secondaryColor }}>
                    <p className='info overflow'><b className={css(styles.detailColor)}>{props.artist}</b> @ <b className={css(styles.detailColor)}>{props.venue}</b></p>
                    <p className='info overflow'><b className={css(styles.detailColor)}>{props.date}</b> in <b className={css(styles.detailColor)}>{props.location}</b></p>
                </div >
            </div >
        )
    }
}


export default Track