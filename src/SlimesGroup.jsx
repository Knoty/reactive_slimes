import React from "react";
import DefaultSlime from './DefaultSlime.jsx';

const SlimesGroup = ({ slimes, healSlime }) => (
  <div>
    {
      slimes.map(
        slime => <DefaultSlime key={slime.id} {...slime} onClick = {(id) => healSlime(id)} />
      )
    }
  </div>
);

export default SlimesGroup;