import React from 'react';
let Heading = (props) => {
    let cursor = props.accessToken ? 'auto' : 'pointer'
    return (
        <div className='heading'>
            <div className='thetexts'>
                <h1 className='title'>Whip</h1>
                <h3 className='subTitle'>A playlist generator based on</h3>
            </div>
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