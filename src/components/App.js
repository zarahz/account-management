// @flow
import React, { Component } from 'react';
import logo from '../assets/icons/logo.svg';
import '../assets/stylesheets/App.css';

class App extends Component {
  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
                a reactive account management microservice
          </p>
        </header>
      </div>
    );
  }
}

export default App;
