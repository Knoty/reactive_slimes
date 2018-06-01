import React from "react";
import Boss from './Boss1.png';

const BossView = props => (
    <div className="boss">
        <button onClick={props.onClick}>
            <img alt='Boss' src={Boss} />
        </button>
        <pre>{props.currentHP} / {props.maxHP}</pre>
    </div>
);

export default BossView;