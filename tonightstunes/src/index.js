import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/hover-min.css';
import Autocomplete from "./Autocomplete";
import { StyleSheet, css } from 'aphrodite';
import { bounceOutLeft } from 'react-animations';

let App = (props) => {
    return (
        <div className='app'>
            <Heading></Heading>
            <SpotifyBttn></SpotifyBttn>
            <LocationForm></LocationForm>
        </div >
    )
}


let Heading = (props) => {
    return (
        <div className='heading'>
            <h1 className='title'>Whip</h1>
            <h3 className='subTitle'>A playlist generator based on music near you</h3>
        </div>

    )
}

let SpotifyBttn = (props) => {
    const [artists, setArtists] = useState('')
    useEffect(() => {
        let token = window.location.hash.substr(1).split('&')[0].split("=")[1]
        if (token) {
            //console.log(token)
            window.opener.spotifyCallback(token)
        }
    }, []);

    let login = () => {
        let client_id = '2a1e4b30a72b41feb5c432aed9877ccb'
        let redirect_uri = 'http%3A%2F%2Flocalhost%3A3000'
        let scopes = 'user-top-read'
        let popup = window.open(`https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}&scope=${scopes}&show_dialog=true`, 'Login with Spotify', 'width=800,height=600')
        window.spotifyCallback = (payload) => {
            //alert(payload)
            popup.close()
            fetch('https://api.spotify.com/v1/me/top/artists', {
                headers: {
                    'Authorization': `Bearer ${payload}`
                }
            }).then(response => {
                return response.json()
            }).then(data => {
                //output data
                console.log(data)
                setArtists(data)
            })
        }
    }
    return (
        <button className='spotifyBttn' onClick={login}>connect to spotify</button>
    )
}
let LocationForm = (props) => {
    const [animation, setAnimation] = useState('')
    let locationSubmit = (e) => {
        e.preventDefault()
        setAnimation('bounceOutLeft')
        setTimeout(function () {
            setAnimation('')
        }, 900);
        fetch('http://localhost:5000/api/hello')
            .then(res => {
                console.log(res)

            })
    }
    let shouldMove = () => {
        if (animation !== '') { return true }
        else { return false }
    }
    const classy = css(
        shouldMove() ? styles.bounceOutLeft : styles.nothing
    )
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

const styles = StyleSheet.create({
    nothing: {},
    bounceOutLeft: {
        animationName: bounceOutLeft,
        animationDuration: '1s'
    }
})

let Track = (props) => {
    return (
        <div className='track'>
            <div className='albumArt hvr-grow'>
            </div>
            <div className='trackInfo'>
                <h4 className='trackName'>Butterfly Effect</h4>
                <div className='trackName2'>
                    <h5 className='trackArtist'>Travis Scott</h5>
                    <h5 className='trackLength'>3:45</h5>
                </div>
            </div>
        </div>
    )
}



ReactDOM.render(
    <App />,
    document.getElementById('root')
);