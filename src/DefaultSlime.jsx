import React, { Component } from "react";
import SlimeView from './SlimeView.jsx'

class DefaultSlime extends Component {
    healAmount = 15;
    smallestMaxHP = 80;
    highestMaxHP = 121;
    maxHP = Number(Math.floor(Math.random() * (this.highestMaxHP - this.smallestMaxHP) + this.smallestMaxHP));

    constructor(props) {
        super(props);

        this.state = {
            hp: this.maxHP
        }
    }

    onClick() {
        this.setState(
            oldState => {
                if (oldState.hp === this.maxHP) {
                    alert('Слайм полность здоров!');
                    return oldState;
                }
                let newHP = Number(oldState.hp) + Number(this.healAmount);
                if (newHP > this.maxHP) {
                    newHP = this.maxHP
                }
                return { hp: newHP };
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