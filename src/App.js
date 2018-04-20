import React from 'react';
import './App.css';
import SlimeGroup from './SlimesGroup.jsx';
import CreateSlimeButton from './CreateSlimeButton.jsx';
import Boss from './Boss.jsx';

const App = (
  { slimes, boss, poolAmount }
) => (
  <div className="App">
    <div className="App-intro">
      <h2>Welcome to Slimes Rumble</h2>
    </div>
    <SlimeGroup slimes={slimes} />
    <CreateSlimeButton currentPoolAmount={poolAmount} maxPoolAmount={1000} onClickFunction={() => null} />
    <Boss currentHP={boss.currentHP} maxHP={boss.maxHP} damage={boss.damage} />
  </div>
);

export default App;
