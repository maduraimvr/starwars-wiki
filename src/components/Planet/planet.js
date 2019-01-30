import React from 'react';

const planet=(props)=>{
    var styleSet = {
        fontSize: 30+(props.index*5)
      };
    return (
    <li key={props.planetval} onClick={props.click}>
    <span style={styleSet}>{props.planetval}</span ></li>)
}

export default planet;