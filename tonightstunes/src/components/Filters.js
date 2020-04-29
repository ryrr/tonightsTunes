import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
let Filters = (props) => {
    let [opened, setOpened] = useState('0px')
    let [location, setLocation] = useState(null)
    useEffect(() => {
        setLocation(props.location)
    }, []);
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginBottom: '20px',
            maxWidth: '500px',
        },
        settings: {
            maxHeight: opened,
            overflow: 'hidden',
            transition: 'all 3s ease',
            display: 'flex',
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: '100%',
            backgroundColor: '#63585E',
            borderRadius: '20px',
        },
        filter: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: "center",
            alignItems: "center",
            fontFamily: 'Roboto',
            color: '#C0C8E2',
            letterSpacing: '5px'
        },
        shuffle: {
            fontFamily: 'Roboto',
            fontWeight: 'bold',
            color: '#63585E',
            borderRadius: '10px',
            fontSize: '20pt',
            letterSpacing: '2px',
            marginBottom: '20px',
            marginTop: '20px',
            backgroundColor: '#C0C8E2',
            outline: 'none',
        },
        select: {
            fontFamily: 'Roboto',
            borderRadius: '2px',
            marginLeft: '10px',
            backgroundColor: '#C0C8E2',
            color: '#63585E',
            fontWeight: 'bold',
            fontSize: '17pt',
            textAlign: 'center'
        },
        where: {
            fontFamily: 'Roboto',
            borderRadius: '2px',
            marginLeft: '10px',
            backgroundColor: '#C0C8E2',
            color: '#63585E',
            fontWeight: 'bold',
            fontSize: '17pt',
            textAlign: 'center',
            width: '200px',
        },
        count: {
            fontFamily: 'Roboto',
            borderRadius: '2px',
            marginLeft: '5px',
            marginRight: '8px',
            backgroundColor: '#C0C8E2',
            color: '#63585E',
            fontWeight: 'bold',
            fontSize: '17pt',
            textAlign: 'center',
            width: '45px',
        }
    })

    const handleClick = () => {
        if (opened === '0px') {
            setOpened("500px")
        }
        else {
            setOpened("0px")
        }
    }
    const changeSort = (e) => {
        props.changeSort(e)
    }
    const changeTime = (e) => {
        props.changeTime(e)
    }
    const updateSize = (e) => {
        props.updateSize(e.target.value)
    }
    const updateLocation = (e) => {
        setLocation(e.target.value)
    }

    const shuffle = () => {
        props.shuffle(location)
    }
    return (
        <div className={css(styles.container)}>
            <i className="fas fa-cog fa-2x settingsIco" onClick={handleClick}></i>
            <div className={css(styles.settings)}>
                <div className={css(styles.filter)}>
                    <h2>sort by?</h2>
                    <select onChange={changeSort} className={css(styles.select)}>
                        <option>nothing</option>
                        <option>popularity</option>
                        <option>date</option>
                    </select>
                </div>
                <div className={css(styles.filter)}>
                    <h2>when?</h2>
                    <select onChange={changeTime} className={css(styles.select)}>
                        <option>tonight</option>
                        <option>this week</option>
                    </select>
                </div>
                <div className={css(styles.filter)}>
                    <h2>how many?</h2>
                    <input className={css(styles.count)} placeholder={props.size} onChange={updateSize} onKeyDown={() => { return false }} type="number" min="1" max="50"></input>
                </div>
                <div className='filterBttnDiv'>
                    <button className='goBackBttn2' onClick={props.goBack}>go back</button>
                    <button onClick={shuffle} className={css(styles.shuffle)}>apply filters</button>
                </div>
            </div>
        </div>
    )
}
/*
<div className={css(styles.filter)}>
    <h2>where?</h2>
    <input onChange={updateLocation} placeholder={location ? location : location} className={css(styles.where)}>
    </input>
</div>
*/


export default Filters