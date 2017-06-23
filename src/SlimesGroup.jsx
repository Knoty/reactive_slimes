import React from "react";
import Slime from './Slime.jsx';

const SlimesGroup = (props) => {

  let slimesGroup = [];

  for (let i = 0; i <= props.slimesAmount; i++) {
    slimesGroup.push(
      <Slime />
    )
  }
  return (
    <div>
      {slimesGroup}
    </div>
  );
};

export default SlimesGroup;