import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
let Filters = (props) => {
    let [opened, setOpened] = useState('0px')

    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginBottom: '20px',
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
            borderRadius: '20px',
            fontSize: '20pt',
            letterSpacing: '2px',
            marginBottom: '20px',
            marginTop: '20px',
            backgroundColor: '#C0C8E2',
            outline: 'none',
            transform: 'rotate(2deg)'
        },
        select: {
            fontFamily: 'Roboto',
            borderRadius: '2px',
            marginLeft: '10px',
            backgroundColor: '#C0C8E2',
            color: '#63585E',
            fontWeight: 'bold',
            fontSize: '20pt',
            transform: 'rotate(-2deg)'
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
    return (
        <div className={css(styles.container)}>
            <i className="fas fa-cog fa-2x settingsIco" onClick={handleClick}></i>
            <div className={css(styles.settings)}>
                <div className={css(styles.filter)}>
                    <h2>sort by:</h2>
                    <select className={css(styles.select)}>
                        <option>popularity</option>
                        <option>date</option>
                    </select>
                </div>
                <div className={css(styles.filter)}>
                    <h2>venue:</h2>
                    <select className={css(styles.select)}>
                        <option>bowery ballroom</option>
                        <option>le poisson rouge</option>
                        <option>terminal 5</option>
                    </select>
                </div>
                <div className={css(styles.filter)}>
                    <h2>time range:</h2>
                    <select className={css(styles.select)}>
                        <option>day</option>
                        <option>week</option>
                        <option>month</option>
                    </select>
                </div>
                <button className={css(styles.shuffle)}>SHUFFLE TRACKS</button>
            </div>
        </div>
    )
}


export default Filters