import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem'
const navigationItems= (props   ) =>{
    return <ul className={classes.NavigationItems}>
        {props.isAuth ?<NavigationItem link="/searchPlanet" >SearchPlanet</NavigationItem>: null}
        {props.isAuth ?<NavigationItem link="/logout" >Logout</NavigationItem> :null}
        {props.isAuth ?null :<NavigationItem link="/" exact>Login</NavigationItem>}
    </ul>
}
export default navigationItems;