import React from 'react';
import poring from './pink_poring.png';
import LevelBar from "./LevelBar";
import PropTypes from 'prop-types';

const SlimeView = props => (
    <div className={props.className + ((props.hp < props.maxHP) ? ' injured' : '')}>
        <button onClick = {(props.hp < props.maxHP) ? () => props.onClick(props.id) : false} >
            <img alt={`Slime ${props.name}, id ${props.id}${(props.hp < props.maxHP) ? `, injured, heal cost: ${props.healPrice}` : ', healthy'}`}
                title={(props.hp < props.maxHP) ? `Heal ${props.id} slime, cost: ${props.healPrice}` : `Healthy ${props.id} slime`}
                src={poring}
            />
        </button>
        <div className="level_bar_wrapper" title={`${props.id} slime hp`}>
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
    name: PropTypes.any,
    id: PropTypes.number.isRequired,
    healPrice: PropTypes.number.isRequired
};

export default SlimeView
