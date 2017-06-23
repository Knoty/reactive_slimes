import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SlimeGroup from './SlimesGroup.jsx';
import CreateButton from './CreateSlime.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Slimes Rumble</h2>
        </div>
        <SlimeGroup slimesAmount="3" />
        <CreateButton />
      </div>
    );
  }
}

export default App;
