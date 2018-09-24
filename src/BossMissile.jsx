import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BossMissileView from "./BossMissileView";

class BossMissile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
            positionLeft: props.startPoint.left,
            positionTop: props.startPoint.top,
            animationStep: 1
        };

        const interval = setInterval(
            () => this.move(),
            43.47
        );

        setTimeout(
            () => clearInterval(interval),
            1000
        );

        props.destroyAfterDelay()
    }

    move() {
        if (this.state.animationStep > 24)
            return;

        this.setState(
            oldState => {
                let proportion = (24 - oldState.animationStep) / oldState.animationStep;
                return {
                    isVisible: true,
                    positionLeft: (this.props.endPoint.left + proportion * this.props.startPoint.left) / (1 + proportion),
                    positionTop: (this.props.endPoint.top + proportion * this.props.startPoint.top) / (1 + proportion),
                    animationStep: oldState.animationStep + 1
                }
            }
        )
    }

    render() {
        return(
            <div
                className = 'missile_wrapper'
                style = {
                    {
                        left: this.state.positionLeft + 'px',
                        top: this.state.positionTop + 'px'
                    }
                }
            >
                {
                    this.state.isVisible
                    &&
                    <BossMissileView />
                }
            </div>
        )
    }
}

BossMissile.propTypes = {
    startPoint: PropTypes.shape({left: PropTypes.number, top: PropTypes.number}).isRequired,
    endPoint: PropTypes.shape({left: PropTypes.number, top: PropTypes.number}).isRequired,
    destroyAfterDelay: PropTypes.func.isRequired
};

export default BossMissile;