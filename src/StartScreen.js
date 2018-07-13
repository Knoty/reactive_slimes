import React from 'react';
import PropTypes from 'prop-types';
import StartButton from './start_button.png';
import StartScreenBackground from './start_screen.png';
import './StartScreen.css';

const StartScreen = props => (
    <div className="start_screen">
        <button className='start_button' autoFocus onClick={props.onClick}>
            <img src={StartButton} alt="Начать игру" />
        </button>
        <img src={StartScreenBackground} alt="Фон" />
    </div>
);

StartScreen.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default StartScreen;
