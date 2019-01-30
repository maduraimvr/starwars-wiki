import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar =(props)=>{
    return (
        <header className={classes.Toolbar}>
            <div className={classes.Logo}>
            <Logo/>
            </div>
            <nav className={classes.desktopOnly}>
                <NavigationItems isAuth={props.isAuth}/>
            </nav>
        </header>
    )
}
export default toolbar;