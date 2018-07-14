import React from 'react';
import './StartScreen.css';
import PropTypes from 'prop-types';

const StartScreen = props => (
    <div className="start_screen">
        <button className="start_button" autoFocus onClick={props.onClick} />
    </div>
);

StartScreen.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default StartScreen;
