import React from 'react';
import './App.css';
import SlimeGroup from './SlimesGroup.jsx';
import CreateSlimeButton from './CreateSlimeButton.jsx';
import BossContainer from './BossContainer';


const App = (props) => (
  <div className="App">
    <div className="App-intro">
      <h2>Welcome to Slimes Rumble</h2>
    </div>
    <SlimeGroup slimes={props.slimes} />
    <CreateSlimeButton currentPoolAmount={props.poolAmount} maxPoolAmount={1000} onClickFunction={() => null} />
    <BossContainer />
  </div>
);

export default App;
