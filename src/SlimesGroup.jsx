import React from "react";
import Slime from './Slime.jsx';

const SlimesGroup = ({ slimes }) => (
  <div>
    {
      slimes.map(
        slime => <Slime key={slime.id} {...slime} />
      )
    }
  </div>
);

export default SlimesGroup;