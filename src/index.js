import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game';
import registerServiceWorker from './registerServiceWorker';
import './css/index.css';

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

registerServiceWorker();
