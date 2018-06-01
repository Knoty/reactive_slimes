import React, { Component } from "react";
import SlimeView from './SlimeView.jsx'

class DefaultSlime extends Component {
    healAmount = 15;
    smallestMaxHP = 80;
    highestMaxHP = 120;
    maxHP = Number(Math.round(Math.random() * (this.highestMaxHP - this.smallestMaxHP) + this.smallestMaxHP));

    constructor(props) {
        super(props);

        this.state = {
            hp: this.maxHP
        }
    }

    onClick() {
        this.setState(
            oldState => {
                let newHP = Number(oldState.hp) + Number(this.healAmount);
                if (newHP < this.maxHP) {
                    return { hp: newHP };
                } else {
                    return { hp: this.maxHP };
                }
            }
        );
    }

    render() {
        return (
            <SlimeView
                {...this.props}
                onClick = {() => this.onClick()}
                currentHP = {this.state.hp}
                maxHP = {this.maxHP}
            />
        )
    }
}

export default DefaultSlime;