import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { fadeIn } from 'react-animations';
let Track = (props) => {
    const [isPlaying, setPlaying] = useState(false)
    const [type, setType] = useState(true)
    const [isShown,setIsShown] = useState(false)
    const handleTrackClick = e => {
        setType(!type)
    }
    const handleMouseover = e => {
        props.handleMouseover(props.index)
    }
    const handlePlay = () => {
        console.log(isPlaying)
        setPlaying(!isPlaying)
    }
    const handleMouseEnter = () => {
        console.log('enetered')
    }
    const handleMouseLeave = () => {
        console.log('left')
    }
    const primaryColor = props.primaryColor
    const secondaryColor = props.secondaryColor
    const styles = StyleSheet.create({
        detailColor: {
            color: props.detailColor
        },
        fadeIn: {
            animationName: fadeIn,
            animationDuration: '1s',
        },
        none: {}
    })
    const play = "fas fa-play fa-2x playBttn"
    const pause = "fas fa-pause fa-2x pauseBttn"

    useEffect(()=>{
        console.log(isShown)
    },[isShown])

    if (type === true) {
        return (
            <div className='track' style={{ backgroundColor: primaryColor, borderBottom: 'solid ' + primaryColor }}>
                <div className={'albumArt hvr-grow'} onClick={handlePlay} onMouseEnter={()=>{setIsShown(true)}} onMouseLeave={()=>{setIsShown(false)}}>
                    <img src={props.art} alt='bah' className='albumArt' onClick={handleMouseover} />
                    {isShown ? <i onClick={handleMouseover} style={{ color: '#C0C8E2' }} className={isPlaying ? pause : play}></i> : null}
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
                <div className={'albumArt hvr-grow'} onClick={handlePlay} onMouseEnter={()=>{setIsShown(true)}} onMouseLeave={()=>{setIsShown(false)}}>
                    <img src={props.art} alt='bah' className='albumArt' onClick={handleMouseover} />
                    {isShown ? <i onClick={handleMouseover} style={{ color: '#C0C8E2' }} className={isPlaying ? pause : play}></i> : null}
                </div>
                <div className='eventInfo' onClick={handleTrackClick} style={{ color: secondaryColor }}>
                    <p className='info overflow'><a style={{ color: props.detailColor }} target="_blank" href={props.link} className='eventlink'><b className={css(styles.detailColor)}>{props.artist}</b> @ <b className={css(styles.detailColor)}>{props.venue}</b></a></p>
                    <p className='info overflow'><b className={css(styles.detailColor)}>{props.date}</b> in <b className={css(styles.detailColor)}>{props.location}</b></p>
                </div >
            </div >
        )
    }
}


export default Track