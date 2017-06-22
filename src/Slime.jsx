import React from "react";
import poring from './pink_poring.png';

function Slime(props) {
  return (
    <div className="slime" >
      <button onClick={props.onClickFunction} onMouseOver={props.onMouseOver}>
        <img alt={`Slime ${props.name}, id ${props.id}`} src={poring} />
      </button>
      <pre>{`${props.currentHP}/${props.maxHP}`}</pre>
    </div>
  );
}

export default Slime;