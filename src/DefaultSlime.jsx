import React, { Component } from 'react';
import SlimeView from './SlimeView.jsx';

class DefaultSlime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animationStatus: ""
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.hp > this.props.hp) {
            setTimeout(
                () => this.hitAnimation(),
                3900
            )
        } else if (prevProps.hp < this.props.hp) {
            this.setState(
                {animationStatus: "was_healed"},
                () => {
                    setTimeout(
                        () => this.setState({animationStatus: ""}),
                        5000
                    )
                }
            )
        } else if (prevProps.hp === undefined && this.props.hp === this.props.maxHP) {
            setTimeout(
                () => this.creationAnimation(),
                0
            )
        } else if (this.props.hp <= 0) {
            this.setState(
                {animationStatus: "dying"},
                () => {
                    setTimeout(
                        () => this.setState({animationStatus: ""}),
                        5000
                    )
                }
            )
        }
    }

    hitAnimation() {
        this.setState(
            {animationStatus: "was_hit"},
            () => {
                setTimeout(
                    () => this.setState({animationStatus: ""}),
                    5000
                )
            }
        )
    }

    creationAnimation() {
        this.setState(
            {animationStatus: "was_created"},
            () => {
                setTimeout(
                    () => this.setState({animationStatus: ""}),
                    5000
                )
            }
        )
    }

    render() {
        return (
            <SlimeView
                {...this.props}
                additionalClass = {this.state.animationStatus}
            />
        )
    }
}

export default DefaultSlime;