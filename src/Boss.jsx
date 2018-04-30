import React from "react";
import boss from './Boss1.png';

function Boss(props) {
  return (
    <div className="boss" onClick={props.onClickFunction} >
      <img alt='Boss' src={boss} />
      {props.currentHP}/{props.maxHP}
    </div>
  );
}

export default Boss;