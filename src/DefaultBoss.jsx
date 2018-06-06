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
                    console.log('Босс с ' + oldState.hp + ' хп был поражён на ' + this.playerPower + ' хп, и теперь имеет ' + newHP + ' хп.');
                    this.props.reaction();
                    return { hp: newHP };
                } else {
                    return { hp: 0 };
                }
            }
        );
    }

    render() {
        if (this.state.hp > 0) {
            return (
                <BossView
                    onClick = {() => this.onClick()}
                    currentHP = {this.state.hp}
                    maxHP = {this.maxHP}
                />
            )
        } else {
            return (
                <div className='win_screen'>
                    <div className='win_message'>
                        <h1>Поздравляем! Вы одержали победу!</h1>
                    </div>
                </div>
            )
        }
    }
}

export default DefaultBoss;