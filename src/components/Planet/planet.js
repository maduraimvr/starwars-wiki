import React from 'react';

const planet=(props)=>{
  
    return (
    <li key={props.planetval} onClick={props.click}>
    <span >{props.planetval}</span ></li>)
}

export default planet;