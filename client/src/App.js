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

    // retrieve from DB
    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const fetchResponse = await fetch('/api/read');
            const result = await fetchResponse.json()
            this.setState({ text: result.rows[0].markdown });
        } catch(e) {
            return e;
        }
    }

    // send file to DB
    handleConvert = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/update', {
            method: 'POST',
            mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: this.state.text})
            });
            const data = await response.json();
            console.log(data);
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
