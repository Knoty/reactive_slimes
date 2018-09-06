import React from 'react';
import PropTypes from 'prop-types';

const CreateSlimeButton = props => (
    <button
        className = {`create_slime_button ${(props.active) ? 'active' : ''}`}
        title = {`${(props.active) ? `click to create new blob for ${props.createSlimeValue}` : 'slimes creating temporary unavailable'}`}
        onClick = {props.onClick}
    />
);

CreateSlimeButton.propTypes = {
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    createSlimeValue: PropTypes.number.isRequired
};

export default CreateSlimeButton;