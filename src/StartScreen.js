import React from 'react';
import PropTypes from 'prop-types';
import StartButton from './start_button.png';
import StartScreenBackground from './start_screen.png';

const StartScreen = props => (
    <div className="start_screen">
        <button className='start_button' autoFocus onClick={props.onClick}><img src={StartButton}/></button>
        <img src={StartScreenBackground}/>
    </div>
);

StartScreen.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default StartScreen;
