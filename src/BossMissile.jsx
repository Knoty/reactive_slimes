import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BossMissileView from "./BossMissileView";

class BossMissile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
            xPosition: props.startPoint.x,
            yPosition: props.startPoint.y
        };

        setTimeout(
            this.move.bind(this),
            10
        );

        setTimeout(
            props.onDestroyed,
            1000
        )
    }

    move() {
        this.setState({
            isVisible: true,
            xPosition: this.props.endPoint.left,
            yPosition: this.props.endPoint.top
        })
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
    onDestroyed: PropTypes.func.isRequired
};

export default BossMissile;