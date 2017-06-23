import React from "react";
import addSlime from './add.png';

function CreateSlimeButton(props) {
  return (
    <div className="create_slime_button" >
      <button onClick={props.onClickFunction} onMouseOver={props.onMouseOver}>
        <img alt={`Create new slime`} src={addSlime} />
      </button>
      <pre>{props.currentPoolAmount}</pre>
    </div>
  );
}

export default CreateSlimeButton;