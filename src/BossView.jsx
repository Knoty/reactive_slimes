import React from "react";
import Boss from './Boss1.png';
import LevelBar from "./LevelBar";
import PropTypes from 'prop-types';

const BossView = props => (
    <div className="boss">
        <button onClick = {props.onClick}>
            <img alt='Boss' src={Boss} />
        </button>
        <div className="level_bar_wrapper">
            <LevelBar
                current={props.currentHP}
                max={props.maxHP}
            />
        </div>
    </div>
);

LevelBar.propTypes = {
    currentHP: PropTypes.number.isRequired,
    maxHP: PropTypes.number.isRequired,
    onClick: PropTypes.func
};

export default BossView;