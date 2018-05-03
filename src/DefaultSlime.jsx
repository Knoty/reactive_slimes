import React, { Component } from "react";
import SlimeView from './SlimeView.jsx'

class DefaultSlime extends Component {
    maxHP = 100;
    healAmount = 15;

  constructor(props) {
    super(props);

    this.state = {
      hp: Number(Math.random() * 100).toFixed(0),
    }
  }

  onClick() {
    this.setState(
        oldState => {
            const newHp = Number(oldState.hp) + Number(this.healAmount);
            if (newHp < this.maxHP) {
                return { hp: newHp };
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