import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BossMissileView from "./BossMissileView";

class BossMissile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
            xPosition: props.startPoint.x,
            yPosition: props.startPoint.y,
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
                xPosition: (this.props.startPoint.x + this.props.endPoint.left) * ((24 - oldState.animationStep) / 24),
                yPosition: (this.props.startPoint.y + this.props.endPoint.top) * ((24 - oldState.animationStep) / 24),
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
                        left: this.state.xPosition + 'px',
                        top: this.state.yPosition + 'px'
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
    startPoint: PropTypes.shape({x: PropTypes.number, y: PropTypes.number}).isRequired,
    endPoint: PropTypes.shape({left: PropTypes.number, top: PropTypes.number}).isRequired,
    destroyAfterDelay: PropTypes.func.isRequired
};

export default BossMissile;