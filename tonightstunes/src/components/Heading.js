import React from 'react';
let Heading = (props) => {
    let cursor = props.accessToken ? 'auto' : 'pointer'
    return (
        <div className='heading'>
            <h1 className='title'>Whip</h1>
            <h3 className='subTitle'>A playlist generator for your local music scene</h3>
            <div className="pwrDiv">
                <img className='songkickLogo' src='/songkicklogo.png'></img>
                <div className='connectDiv'>
                    <a href={props.accessToken ? null : props.link} className='authLink'><h2 className='spotifyBttn' style={{ cursor: cursor }} > <img className='spotifyico' src='/spotifyico.png' />{props.accessToken ? '✅' : 'connect spotify'}</h2></a>
                </div>
            </div>
        </div>

    )
}
export default Heading