import React, { useState, useEffect } from 'react';
let Connect = (props) => {
    let login = async () => {
        let token = props.token
        console.log(props.uris)
        const getUserOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        let createPlaylistData = {
            name: "Music near New York 7/15",
            public: false,
            description: 'a playlist generated by Whip!'
        }
        let updatePlaylistData = {
            'uris': props.uris
        }
        const playlistCreateOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(createPlaylistData)
        };
        const playlistUpdateOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatePlaylistData)
        };

        let res = await fetch('https://api.spotify.com/v1/me', getUserOptions)
        let userInfo = await res.json()
        let user_id = userInfo.id
        let res2 = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, playlistCreateOptions)
        let playlistInfo = await res2.json()
        console.log(playlistInfo)
        props.setAdded(playlistInfo.external_urls['spotify'])
        let playlist_id = playlistInfo.id
        let res3 = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, playlistUpdateOptions)
        let complete = await res3.json()
        console.log(complete)

        /*
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
        */

    }
    return (
        <h3 className='connectBttn' onClick={login}><img className='spotifyico' src='/spotifyico.png' />add playlist to spotify</h3>
    )
}
export default Connect