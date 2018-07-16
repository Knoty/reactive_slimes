import React from 'react';
import LevelBar from './LevelBar';
import PropTypes from 'prop-types';

const BossView = props => (
    <div className="boss">
        <button className="boss_img" title="click to attack" onClick = {props.onClick} />
        <div className="level_bar_wrapper boss_hp_bar" title="Boss hp">
            <LevelBar
                current = {props.currentHP}
                max = {props.maxHP}
            />
        </div>
    </div>
);

BossView.propTypes = {
    onClick: PropTypes.func.isRequired,
    currentHP: PropTypes.number.isRequired,
    maxHP: PropTypes.number.isRequired,
};

export default BossView;