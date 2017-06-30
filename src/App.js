import React from 'react';
import './App.css';
import SlimeGroup from './SlimesGroup.jsx';
import CreateSlimeButton from './CreateSlimeButton.jsx';
import Boss from './Boss.jsx';

const App = (props) => (
  <div className="App">
    <div className="App-intro">
      <h2>Welcome to Slimes Rumble</h2>
    </div>
    <SlimeGroup slimes={props.slimes} />
    <CreateSlimeButton poolAmount={props.poolAmount} />
    <Boss currentHP={props.boss.currentHP} maxHP={props.boss.maxHP} damage={props.boss.damage} />
  </div>
);

export default App;
