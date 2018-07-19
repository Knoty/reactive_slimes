import React from 'react';
import PropTypes from 'prop-types';

const getLevelBarLength = (currentLevel, maxLevel) => {
    return (currentLevel / maxLevel) * 100
};

const LevelBar = props => (
    <div className="level_bar">
        <div
            className="level_bar_value"
            style={
                {
                    width: getLevelBarLength(props.current, props.max) + '%'
                }
            }
        />
        <div className="level_value_dividing" />
        <p>{props.current}/{props.max}</p>
    </div>
);

LevelBar.propTypes = {
    current: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
};

export default LevelBar