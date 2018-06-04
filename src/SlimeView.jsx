import React from 'react'
import poring from './pink_poring.png';

const SlimeView = props => (
    <div className={'slime slime_' + props.id}>
        <button onClick={props.onClick}>
            <img alt={`slime ${props.name}, id ${props.id}`} src={poring} />
        </button>
        <pre>{props.currentHP} / {props.maxHP}</pre>
    </div>
);

export default SlimeView
