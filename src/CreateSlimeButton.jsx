import React from "react";
import add from './add.png';
import PropTypes from 'prop-types';
import LevelBar from "./LevelBar";

const CreateSlimeButton = props => (
    <div className="create_slime_button">
        <button onClick = {props.onClick}>
            <img
                alt={`Create new slime cost: ${props.createSlimeValue}`}
                title={`Create new slime cost: ${props.createSlimeValue}`}
                src={add}
            />
        </button>
    </div>
);

LevelBar.propTypes = {
    onClick: PropTypes.func.isRequired,
    createSlimeValue: PropTypes.number.isRequired
};

export default CreateSlimeButton;