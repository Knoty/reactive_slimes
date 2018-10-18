import React from 'react';
import DefaultSlime from './DefaultSlime.jsx';
import PropTypes from 'prop-types';

const SlimesGroup = ({ slimes, healPrice, healSlime, places }) => (
    <div className = 'slimes_group'>
        {
            slimes.map(
                (slime) => (
                    <DefaultSlime
                        className = {'slime place_' + slime.place}
                        key = {slime.id}
                        {...slime}
                        healPrice = {healPrice}
                        place = {places[slime.place]}
                        healSlime = {healSlime}
                    />
                )
            )
        }
    </div>
);

SlimesGroup.propTypes = {
    slimes: PropTypes.arrayOf(
        PropTypes.shape(
            {
                id: PropTypes.number
            }
        )
    ).isRequired,
    healPrice: PropTypes.number.isRequired,
    healSlime: PropTypes.func.isRequired,
    places: PropTypes.arrayOf(
        PropTypes.shape()
    ).isRequired
};

export default SlimesGroup;