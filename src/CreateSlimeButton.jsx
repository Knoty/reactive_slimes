import React from "react";
import add from './add.png';

const CreateSlimeButton = props => (
    <div className="create_slime_button">
        <button onClick = {props.onClick}>
            <img alt='Create new slime' src={add} />
        </button>
    </div>
);

export default CreateSlimeButton;