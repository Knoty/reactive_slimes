import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const state = {
  boss: {
    maxHP: 100,
    currentHP: 70,
    damage: 40
  },
  poolAmount: 1000
};

ReactDOM.render(
  <App slimes={state.slimes} boss={state.boss} poolAmount={state.poolAmount} />,
  document.getElementById('root')
);

registerServiceWorker();
