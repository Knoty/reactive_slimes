import React, { Component } from 'react';
import BossView from './BossView.jsx';
import PropTypes from 'prop-types';

class DefaultBoss extends Component {
    bossWasHitAnimationDelay = 800;
    bossAttackAnimationDelay = 2000;

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
                        this.bossWasHitAnimationDelay
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
                                this.bossAttackAnimationDelay
                            );
                        }
                    );
                },
                20 //Necessary delay for browser animation memory cleanup.
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