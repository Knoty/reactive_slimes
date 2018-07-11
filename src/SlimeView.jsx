import React from 'react';
import poring from './pink_poring.png';
import LevelBar from "./LevelBar";
import PropTypes from 'prop-types';

const getHealStatus = (currentHP, maxHP) => {
    if (currentHP < maxHP)
        return ' injured';
    else
        return '';
};

const getHealAbility = (currentHP, maxHP, ability, id) => {
    if (currentHP < maxHP)
        return () => ability(id);
    else
        return false;
};

const SlimeView = props => (
    <div className={props.className + getHealStatus(props.hp, props.maxHP)}>
        <button onClick = {getHealAbility(props.hp, props.maxHP, props.onClick, props.id)} >
            <img alt={`slime ${props.name}, id ${props.id}`} src={poring} />
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
    onClick: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.any,
    hp: PropTypes.number.isRequired,
    maxHP: PropTypes.number.isRequired,
};

export default SlimeView
