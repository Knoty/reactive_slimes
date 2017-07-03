import React, { Component } from "react";
import Slime from './Slime.jsx';

class SlimesGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
          slimes: props.slimes
        };
    }

    healSlime(id) {
        const healOnlySlimesOfId = function (slime) {
            if (slime.id === id) {
                const newSlimeState = Object.assign({}, slime);
                newSlimeState.currentHP += Math.round((5 + Math.random() * 10));
                return newSlimeState;
            } else {
                return slime;
            }
        };
        this.setState(
          {
            slimes: this.state.slimes.map(healOnlySlimesOfId)
          }
        );
    }

    render () {
        return (
            <div>
              {this.state.slimes.map((slime) => <Slime key={slime.id} onClickFunction={() => { this.healSlime(slime.id); } } {...slime} />)}
            </div>
        );
    }
}

export default SlimesGroup;