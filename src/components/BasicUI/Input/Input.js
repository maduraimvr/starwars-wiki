import React from 'react';
import classes from './Input.css'
const input =(props) =>{
    let validationError=null,
    inputClasses= [classes.InputElement];

    if(props.Invalid && props.shouldValidate && props.isTouched){
        inputClasses.push(classes.Invalid);
        validationError = <p style={{color:'white',fontWeight:'bold'}}>Please enter a valid value!</p>;
    }
    
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            <input className={inputClasses.join(' ')} 
                {...props.elementConfig} value={props.value} onChange={props.changed}/>
            {validationError}
        </div>
    );
}
export default input;