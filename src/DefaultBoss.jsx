import React, { Component } from "react";
import BossView from './BossView.jsx'

class DefaultBoss extends Component {
    playerPower = 80;
    maxHP = 1000;

    constructor(props) {
        super(props);

        this.state = {
            hp: this.maxHP
        }
    }

    onClick() {
        this.setState(
            oldState => {
                const newHP = Number(oldState.hp) - Number(this.playerPower);
                if (newHP > 0) {
                    return { hp: newHP };
                } else {
                    return { hp: 0 };
                }
            }
        );
    }

    render() {
        return (
            <BossView
                onClick = {() => this.onClick()}
                currentHP = {this.state.hp}
                maxHP = {this.maxHP}
            />
        )
    }
}

export default DefaultBoss;