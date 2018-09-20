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
            42
        );
        setTimeout(
            () => clearInterval(interval),
            1000
        );

        props.destroyAfterDelay()
    }

    move() {
        this.setState(
            oldState => ({
                isVisible: true,
                positionLeft: (this.props.startPoint.left + this.props.endPoint.left) * ((24 - oldState.animationStep) / 24),
                positionTop: (this.props.startPoint.top - this.props.endPoint.top) * ((24 - oldState.animationStep) / 24),
                animationStep: oldState.animationStep + 1
            })
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