import React from 'react';
import LevelBar from './LevelBar';
import PropTypes from 'prop-types';

const SlimeView = props => (
    <div
        className = {props.className}
        style = {
            {
                left: props.place.left + 'px',
                top: props.place.top + 'px'
            }
        }
    >
        <button
            className = {
                `slime_img
                ${props.animationClass}
                ${(props.hp < props.maxHP && !props.animationClass)
                    ? 'injured'
                    : ''
                }`
            }
            title = {
                `Slime ${props.name} #${props.id}${(props.hp < props.maxHP && props.hp > 0)
                    ? `, click to heal for ${props.healPrice} resources`
                    : ''}`
            }
            onClick = {props.onClick}
        />
        {
            props.hp > 0
            &&
            <div
                className = 'level_bar_wrapper slime_hp_bar'
                title = {`${props.id} slime hp`}
            >
                <LevelBar
                    current = {props.hp}
                    max = {props.maxHP}
                />
            </div>
        }
    </div>
);

SlimeView.propTypes = {
    className: PropTypes.string.isRequired,
    hp: PropTypes.number.isRequired,
    maxHP: PropTypes.number.isRequired,
    onClick: PropTypes.any,
    name: PropTypes.string,
    id: PropTypes.number.isRequired,
    healPrice: PropTypes.number.isRequired,
    animationClass: PropTypes.string,
    place: PropTypes.shape({
        left: PropTypes.number,
        top: PropTypes.number,
        isFree: PropTypes.bool,
    }).isRequired
};

SlimeView.defaultProps = {
    name: ''
};

export default SlimeView
