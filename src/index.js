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
  }
};

ReactDOM.render(
  <App boss={state.boss}/>,
  document.getElementById('root')
);

registerServiceWorker();
