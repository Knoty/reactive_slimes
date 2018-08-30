import React from 'react';
import PropTypes from 'prop-types';

const CreateSlimeButton = props => (
    <button
        className={`create_slime_button ${(props.active) ? "active" : ""}`}
        title={`click to create new blob for ${props.createSlimeValue}`}
        onClick = {props.onClick}
    />
);

CreateSlimeButton.propTypes = {
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    createSlimeValue: PropTypes.number.isRequired
};

export default CreateSlimeButton;