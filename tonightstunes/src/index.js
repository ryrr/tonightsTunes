import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/hover-min.css';
import Input from './components/Input.js'
//import Track from './components/Track.js'
import Heading from './components/Heading.js'
import hash from './util/hash'

let App = (props) => {
    const [token, setToken] = useState(null);
    const [accessToken, setAccessToken] = useState(null)
    useEffect(() => {
        fetch('http://167.172.138.71:2222/token')
            .then(response => response.json())
            .then(data => setToken(data.token));
    }, []);

    useEffect(() => {
        let accessToken = hash.access_token;
        if (accessToken) {
            setAccessToken(accessToken);
            console.log(accessToken);
        }
    }, []);

    let client_id = '2a1e4b30a72b41feb5c432aed9877ccb'
    //let redirect_uri = 'http%3A%2F%2F167.172.138.71%2F'
    let redirect_uri = 'http%3A%2F%2Ftonightstunes.xyz%2F'
    let scopes = 'playlist-modify-private'
    let link = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}&scope=${scopes}&show_dialog=true`

    return (
        <div className='app'>
            <Heading accessToken={accessToken} link={link}></Heading>
            <Input accessToken={accessToken} token={token}></Input>
        </div >
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);