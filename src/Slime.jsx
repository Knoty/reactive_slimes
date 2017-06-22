import React from "react";

function Slime(props) {
  return (
    <button className="slime" onClick={props.onClickFunction}>
      <img alt={`Slime ${props.id}`} src={`./logo.svg`} />
    </button>
  );
}

export default Slime;