import React from 'react';

class Text extends React.Component {
    constructor(props) {
        super(props);
    }

    handleTextChange = (e) => {
        this.props.onTextChange(e);
    }

    render() {
        return (
            <textarea rows="4" cols="50"
                onChange={this.handleTextChange}>
                {this.props.data}
            </textarea>
        )
    }
};

export default Text;
