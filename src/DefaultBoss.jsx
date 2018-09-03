import React, { Component } from 'react';
import BossView from './BossView.jsx';
import PropTypes from 'prop-types';

class DefaultBoss extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animationStatus: ""
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.isBossAttacking && this.state.animationStatus === "") {
            this.setState(
                {animationStatus: "attack"},
                () => {
                    this.props.stopAnimation();
                    setTimeout(
                        () => {this.setState({animationStatus: ""})},
                        500
                    );
                }
            );
        } else if (prevProps.currentHP > this.props.currentHP) {
            this.setState(
                {animationStatus: "was_hit"},
                () => {
                    setTimeout(
                        () => this.setState({animationStatus: ""}),
                        800
                    )
                }
            )
        }
    }

    render() {
        return (
            <BossView
                {...this.props}
                animationClass = {this.state.animationStatus}
            />
        )
    }
}

DefaultBoss.propTypes = {
    isBossAttacking: PropTypes.bool,
    currentHP: PropTypes.number.isRequired,
    stopAnimation: PropTypes.func.isRequired
};

export default DefaultBoss;