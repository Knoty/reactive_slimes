import React from 'react';
import LevelBar from './LevelBar';
import PropTypes from 'prop-types';

const SlimeView = props => (
    <div className={props.className + ((props.hp < props.maxHP) ? ' injured' : '')}>
        <button
            className={`slime_img ${(props.hp < props.maxHP) ? 'injured' : ''}`}
            onClick = {(props.hp < props.maxHP) ? () => props.onClick(props.id) : false}
            title={`Slime ${props.name} ${props.id}${(props.hp < props.maxHP) ? `, click to heal for ${props.healPrice}` : ', healthy'}`}
        />
        <div className='level_bar_wrapper' title={`${props.id} slime hp`}>
            <LevelBar
                current = {props.hp}
                max = {props.maxHP}
            />
        </div>
    </div>
);

SlimeView.propTypes = {
    className: PropTypes.string.isRequired,
    hp: PropTypes.number.isRequired,
    maxHP: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    name: PropTypes.string,
    id: PropTypes.number.isRequired,
    healPrice: PropTypes.number.isRequired
};

SlimeView.defaultProps = {
    name: ''
};

export default SlimeView
