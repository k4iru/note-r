import React from 'react';

function Text(props) {
    return (
        <textarea rows="4" cols="50"
            onChange={()=>props.onChange()}>
            {props.data}
        </textarea>
    )
};

export default Text;
