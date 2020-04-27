import React from 'react';
let Heading = (props) => {
    return (
        <div className='heading'>
            <h1 className='title'>Whip</h1>
            <h3 className='subTitle'>A playlist generator based on</h3>
            <div className="pwrDiv">
                <img className='songkickLogo' src='/songkicklogo.png'></img>
            </div>
        </div>

    )
}
export default Heading