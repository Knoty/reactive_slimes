import React from 'react'
import poring from './pink_poring.png';

const SlimePureFunction = props => (
    <div className="slime">
        <button onClick={props.onClick} onMouseOver={props.onMouseOver}>
        <img alt={`Slime ${props.name}, id ${props.id}`} src={poring} />
        </button>
        <pre>{`${props.hp}/${props.max}`}</pre>
    </div>
);

export default SlimePureFunction
