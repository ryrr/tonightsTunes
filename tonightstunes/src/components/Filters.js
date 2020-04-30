import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
let Filters = (props) => {
    let [opened, setOpened] = useState('0px')
    let [location, setLocation] = useState(null)
    let [dropdown, setDropdown] = useState('settings')
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
        },
        iconDiv: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: '80%'
        },
        instList: {
            fontFamily: 'Roboto',
            color: '#C0C8E2'
        },
        extList: {
            fontFamily: 'Roboto',
            color: '#DF2935',
        },
        li: {
            marginBottom: '8px',
            fontSize: '13pt'
        },
        emphasis: {
            color: 'white',
        },
        howTo: {
            fontFamily: 'Roboto',
            color: '#C0C8E2'
        }


    })

    const handleClick = (e) => {
        let clicked = e.target.getAttribute('name')
        if (dropdown !== clicked) {
            setOpened("0px")
            setTimeout(function () {
                setDropdown(clicked)
                setOpened("500px")
            }, 2500);
        }
        else {
            setDropdown(clicked)
            if (opened === '0px') {
                setOpened("500px")
            }
            else {
                setOpened("0px")
            }
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
    if (dropdown == 'settings') {

        return (
            <div className={css(styles.container)}>
                <div className={css(styles.iconDiv)}>
                    <i className="fas fa-sync-alt fa-2x settingsIco" onClick={shuffle}></i>
                    <i className="fas fa-cog fa-2x settingsIco" name='settings' onClick={handleClick}></i>
                    <i className="fas fa-question-circle fa-2x settingsIco" name='info' onClick={handleClick}></i>
                </div>
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
    else {
        return (
            <div className={css(styles.container)}>
                <div className={css(styles.iconDiv)}>
                    <i className="fas fa-sync-alt fa-2x settingsIco" onClick={shuffle}></i>
                    <i className="fas fa-cog fa-2x settingsIco" name='settings' onClick={handleClick}></i>
                    <i className="fas fa-question-circle fa-2x settingsIco" name='info' onClick={handleClick}></i>
                </div>
                <div className={css(styles.settings)}>
                    <h2 className={css(styles.howTo)}>HOW TO USE</h2>
                    <ul className={css(styles.instList)}>
                        <li className={css(styles.li)}>click <i className={css(styles.emphasis)}>right side</i> of track to toggle between event & track info</li>
                        <li className={css(styles.li)}>click <i className={css(styles.emphasis)}>album art</i> to play a sample of the track</li>
                        <li className={css(styles.li)}>connecting to spotify is strongly reccomended as it will allow you to save the playlist along with access to future features</li>
                    </ul>
                    <ul className={css(styles.extList)}>
                        <li>
                            Due to COVID-19 many, if not all events and concerts
                            have been canceled. In order to maintain functionality,
                            canceled events have been temporarily allowed in the results.
                        </li>

                    </ul>
                </div>
            </div>
        )
    }
}
/*
<div className={css(styles.filter)}>
    <h2>where?</h2>
    <input onChange={updateLocation} placeholder={location ? location : location} className={css(styles.where)}>
    </input>
</div>
*/


export default Filters