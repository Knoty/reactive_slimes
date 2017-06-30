import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const state = {
  slimes: [
    {
      id: 1,
      name: 'name',
      maxHP: 100,
      currentHP: 90
    },
    {
      id: 2,
      name: 'name2',
      maxHP: 100,
      currentHP: 80
    }
  ],
  boss: {
    maxHP: 100,
    currentHP: 70,
    damage: 40
  },
  poolAmount: 1000
};

ReactDOM.render(<App {...state} />, document.getElementById('root'));
registerServiceWorker();
