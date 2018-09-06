import React, { Component } from 'react';
import BossView from './BossView.jsx';
import PropTypes from 'prop-types';

class DefaultBoss extends Component {
    bossWasHitAnimationDelay = 800;
    bossAttackAnimationDelay = 1200;

    constructor(props) {
        super(props);
        this.state = {
            animationStatus: ""
        }
    }

    componentDidUpdate(prevProps) {
         if (prevProps.currentHP > this.props.currentHP) {
            this.setState(
                {animationStatus: "was_hit"},
                () => {
                    setTimeout(
                        () => this.setState({animationStatus: ""}),
                        this.bossWasHitAnimationDelay
                    )
                }
            )
        } else if (this.props.isBossAttacking && this.state.animationStatus === "") {
             this.setState(
                {animationStatus: "attack"},
                () => {
                    this.props.stopAnimation();
                    setTimeout(
                        () => {this.setState({animationStatus: ""})},
                        this.bossAttackAnimationDelay
                    );
                }
            );
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
    isBossAttacking: PropTypes.bool.isRequired,
    currentHP: PropTypes.number.isRequired,
    stopAnimation: PropTypes.func.isRequired
};

export default DefaultBoss;