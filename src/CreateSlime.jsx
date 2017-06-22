import React from "react";

function CreateSlimeButton(props) {
  return (
    <div className="create_slime_button" >
      <button onClick={props.onClickFunction} onMouseOver={props.onMouseOver}>
        <img alt={`Create new slime`} src={`./logo.svg`} />
      </button>
      <pre>{`${props.currentPoolAmount}`}</pre>
    </div>
  );
}

export default CreateSlimeButton;