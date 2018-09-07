import React from 'react';
import './css/StartScreen.css';
import PropTypes from 'prop-types';

const StartScreen = props => (
    <div className = 'start_screen'>
        <button
            autoFocus
            className = 'start_button'
            onClick = {props.onClick}
        />
    </div>
);

StartScreen.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default StartScreen;
