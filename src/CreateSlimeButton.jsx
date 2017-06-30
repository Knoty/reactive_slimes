import React from "react";

function CreateSlimeButton(props) {
  return (
    <div title ="Create new slime" className="create_slime_button" onClick={props.onClickFunction}>
      <pre>{props.currentPoolAmount} / {props.maxPoolAmount}</pre>
    </div>
  );
}

export default CreateSlimeButton;