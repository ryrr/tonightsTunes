import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/hover-min.css';
import Input from './components/Input.js'
import Track from './components/Track.js'
import Heading from './components/Heading.js'


let App = (props) => {
    const [token, setToken] = useState(null);
    useEffect(() => {
        fetch('http://localhost:3001/token')
            .then(response => response.json())
            .then(data => setToken(data.token));
    }, []);

    return (
        <div className='app'>
            <Heading></Heading>
            <Input token={token}></Input>
        </div >
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);