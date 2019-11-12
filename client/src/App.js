import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            text: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ name: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        fetch(`/api/read`)
            .then(res => res.json())
            .then(state => this.setState(state));
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
                        <input
                            id="name"
                            type="text"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                        <button type="submit">Submit</button>
                    </form>
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
