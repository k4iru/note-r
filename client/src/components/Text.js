import React from 'react';

function Text({data}) {
    return (
        <textarea rows="4" cols="50">
            {data}
        </textarea>
    )
};

exort default Text;
