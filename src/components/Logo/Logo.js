import React from 'react';
import planetLogoImage from '../../assets/Images/1.jpg';
import classes from './Logo.css';

const planetLogo = ()=>{
    return (
        <div className={classes.Logo}>
            <img src={planetLogoImage} alt="planetLogo"/>
        </div>
    )
}
export default planetLogo;