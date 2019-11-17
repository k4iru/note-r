import React from 'react';

class Text extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.data
        };
    }

    componentDidUpdate(prepProps, prevState) {
        if(prevState.text !== this.state.text) {
            this.setState({ text: this.props.data });
        }
    }
    handleTextChange = (e) => {
        this.props.onTextChange(e);
    }

    render() {
        return (
            <textarea rows="12" cols="80"
                onChange={this.handleTextChange}
                text={this.state.text}>
            </textarea>
        )
    }
};

export default Text;
