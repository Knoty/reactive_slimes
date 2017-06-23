import React, { Component } from 'react';
import './App.css';
import SlimeGroup from './SlimesGroup.jsx';
import CreateButton from './CreateSlime.jsx';
import Boss from './Boss.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-intro">
          <h2>Welcome to Slimes Rumble</h2>
        </div>
        <SlimeGroup slimesAmount="3" />
        <CreateButton />
        <Boss currentHP="100" maxHP="100"/>
      </div>
    );
  }
}

export default App;
