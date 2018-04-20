import React, { Component } from "react";
import SlimePureFunction from './SlimePureFunction.jsx'

class SlimeClassBased extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hp: Number(Math.random() * 100).toFixed(0),
      max: 100
    }
  }

  onClick(event) {
    const healAmount = 15;
    const newHp = Number(this.state.hp) + healAmount;
    this.setState(
      {
        hp: newHp
      }
    );

    console.log(event.target);
    console.log(this.props)
  }

  render() {
    return (
      <SlimePureFunction
        {...this.props}
        {...this.state}
        onClick={(chtulhu) => this.onClick(chtulhu)}
        onMouseOver={this.onMouseOver}
      />
    )
  }
}

export default SlimeClassBased;