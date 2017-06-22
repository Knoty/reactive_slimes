import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Slime from './Slime.jsx';
import CreateButton from './CreateSlime';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Slimes Rumble</h2>
        </div>
        <Slime />
        <CreateButton />
      </div>
    );
  }
}

export default App;
