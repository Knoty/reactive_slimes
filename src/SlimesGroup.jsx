import React from "react";
import DefaultSlime from './DefaultSlime.jsx';

const SlimesGroup = ({ slimes, healPrice, healSlime }) => (
  <div>
    {
      slimes.map(
        (slime, index) => (
            <DefaultSlime
                className={'slime place_' + index}
                key={slime.id}
                {...slime}
                healPrice={healPrice}
                onClick = {(id) => healSlime(id)}
            />
        )
      )
    }
  </div>
);

export default SlimesGroup;