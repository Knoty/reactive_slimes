import React from "react";

function Slime(props) {
  return (
    <div className="slime" >
      <button onClick={props.onClickFunction} onMouseOver={props.onMouseOver}>
        <img alt={`Slime ${props.name}, id ${props.id}`} src={`./logo.svg`} />
      </button>
      <pre>{`${props.currentHP}/${props.maxHP}`}</pre>
    </div>
  );
}

export default Slime;