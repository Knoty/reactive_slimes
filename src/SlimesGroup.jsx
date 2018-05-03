import React from "react";
import DefaultSlime from './DefaultSlime.jsx';

const SlimesGroup = ({ slimes }) => (
  <div>
    {
      slimes.map(
        slime => <DefaultSlime key={slime.id} {...slime} />
      )
    }
  </div>
);

export default SlimesGroup;