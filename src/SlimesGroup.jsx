import React from 'react';
import DefaultSlime from './DefaultSlime.jsx';
import PropTypes from 'prop-types';

const SlimesGroup = ({ slimes, healPrice, healSlime }) => (
  <div>
    {
      slimes.map(
        (slime, index) => (
            <DefaultSlime
                className={"slime place_" + index}
                key = {slime.id}
                {...slime}
                healPrice = {healPrice}
                onClick = {(id) => healSlime(id)}
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
};

export default SlimesGroup;