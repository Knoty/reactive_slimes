import React from 'react';
import poring from './pink_poring.png';
import LevelBar from "./LevelBar";
import PropTypes from 'prop-types';

const SlimeView = props => (
    <div className={props.className + ((props.hp < props.maxHP) ? ' injured' : '')}>
        <button onClick = {(props.hp < props.maxHP) ? () => props.onClick(props.id) : false} >
            <img alt={`slime ${props.name}, id ${props.id} ${(props.hp < props.maxHP) ? `, heal cost: ${props.healPrice}` : ''}`}
                 title={(props.hp < props.maxHP) ? `heal cost: ${props.healPrice}` : ''}
                 src={poring}
            />
        </button>
        <div className="level_bar_wrapper">
            <LevelBar
                current={props.hp}
                max={props.maxHP}
            />
        </div>
    </div>
);

LevelBar.propTypes = {
    className: PropTypes.string.isRequired,
    hp: PropTypes.number.isRequired,
    maxHP: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.any,
    healPrice: PropTypes.number.isRequired
};

export default SlimeView
