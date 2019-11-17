import React from 'react';

function Text(props){
    return (
        <textarea rows="12" cols="80"
            onChange={props.onTextChange}
            text={props.text}>
        </textarea>
    )
};

export default Text;
