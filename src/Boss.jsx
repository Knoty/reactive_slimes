import React from "react";
import poring from './pink_poring.png';

function Boss(props) {
  return (
    <div className="boss" onClick={props.onClickFunction} >
      <img alt='Boss' src={poring} />
      {props.currentHP}/{props.maxHP}
    </div>
  );
}

export default Boss;