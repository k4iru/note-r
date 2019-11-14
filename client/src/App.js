import React, { Component } from 'react';
import Text from './components/Text';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConvert = this.handleConvert.bind(this);
    }

    handleChange = (e) => {
        this.setState({ text: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        fetch(`/api/read`)
            .then(res => res.json())
            .then(state => {
                this.setState(state)
                console.log(this.state.text);
            });

    }

    handleConvert = async (e) => {
        e.preventDefault();
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'text/html',
                'Content-Type': 'text/html',
            }
        };

        try {
            const fetchResponse = await fetch('/api/update', settings);
            const data = await fetchResponse.json();
            return data;
        } catch (e) {
            return e;
        }
    }
    render() {

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="name">Enter your name: </label>
                        <button type="submit">Retrieve from DB</button>
                    </form>
                <form onSubmit={this.handleConvert}>
                    <button type="submit">UPDATE</button>
                </form>

                    <Text 
                        data={this.state.text}
                        onTextChange={this.handleChange}
                    />
                    <p>{this.state.text}</p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        );
    }
}
export default App;
