import React, { Component } from 'react';
import BossView from './BossView.jsx';
import PropTypes from 'prop-types';

class DefaultBoss extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animationStatus: ''
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentHP > this.props.currentHP) {
            this.setState(
                {animationStatus: 'was_hit'},
                () => {
                    setTimeout(
                        () => this.setState({animationStatus: ''}),
                        this.props.bossWasHitAnimationLength
                    )
                }
            )
        } else if (this.props.isBossAttacking && this.state.animationStatus === '') {
            setTimeout(
                () => {
                    this.setState(
                        {animationStatus: 'attack'},
                        () => {
                            this.props.stopAnimation();
                            setTimeout(
                                () => this.setState({animationStatus: ''}),
                                this.props.bossAttackAnimationLength
                            );
                        }
                    );
                },
                60 //Necessary delay for browser animation memory cleanup.
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
    stopAnimation: PropTypes.func.isRequired,
    bossAttackAnimationLength: PropTypes.number.isRequired,
    bossWasHitAnimationLength: PropTypes.number.isRequired
};

export default DefaultBoss;