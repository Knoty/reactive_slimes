import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { ActionTypes } from "redux/es/createStore";

const initialState = {
  slimes: [
    {
      id: 1,
      name: 'name',
      maxHP: 160,
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


const reducer = function (state, action) {
  switch (action.type) {
    case 'hitSlime':
      return state;
    case 'hitBoss':
      const bossStats = Object.assign({}, state.boss);
      bossStats.currentHP -= action.damage;
      return Object.assign({}, state, {boss: bossStats});
    case 'heal':
      return state;
    case 'create':
      return state;
    case ActionTypes.INIT:
      return state;
    default:
      throw new Error('invalid action: ' + action.type);
  }
};

ReactDOM.render(
  <Provider store={createStore(reducer, initialState)}>
    <App slimes={initialState.slimes} poolAmount={initialState.poolAmount} />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
