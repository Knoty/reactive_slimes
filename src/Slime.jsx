import React, { Component } from "react";
import SlimeView from './SlimeView.jsx'

class SlimeClassBased extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hp: Number(Math.random() * 100).toFixed(0),
      maxHp: 100,
      healAmount: 15
    }
  }

  onClick() {
    this.setState(
        oldState => ({hp: Number(oldState.hp) + Number(this.state.healAmount)})
    );
  }

  render() {
    return (
      <SlimeView
        {...this.props}
        {...this.state}
        onClick={() => this.onClick()}
        onMouseOver={this.onMouseOver}
      />
    )
  }
}

export default SlimeClassBased;