import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


let App = (props) => {
    return (
        <div className='app'>
            <Heading></Heading>
            <Track></Track>
        </div>
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
let Track = (props) => {
    return (
        <div className='track'>
            <div className='albumArt'>
            </div>
            <div className='trackInfo'>
                <h4 className='trackName'>Butterfly Effect</h4>
                <div className='trackName2'>
                    <h5 className=''>Travis Scott</h5>
                    <h5 className=''>3:45</h5>
                </div>
            </div>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);