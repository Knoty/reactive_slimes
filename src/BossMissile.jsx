import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BossMissile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
            x: props.startPoint.x,
            y: props.startPoint.y
        };

        setTimeout(
            this.move.bind(this),
            10
        );

        setTimeout(
            props.onDestroyed,
            4000
        )
    }

    move() {
        this.setState({
            isVisible: true,
            x: this.props.endPoint.x,
            y: this.props.endPoint.y
        })
    }

    render() {
        return(
            <div
                style={
                    {
                        position: "absolute",
                        left: this.state.x + "px",
                        top: this.state.y + "px",
                        width: "150px",
                        height: "30px",
                        backgroundColor: "darkviolet",
                        opacity: this.state.isVisible ? 1 : 0,
                        transition: "left linear 4s, top linear 4s"
                    }
                }
            />
        )
    }
}

BossMissile.propTypes = {
    startPoint: PropTypes.shape({x: PropTypes.number, y: PropTypes.number}).isRequired,
    endPoint: PropTypes.shape({x: PropTypes.number, y: PropTypes.number}).isRequired,
    onDestroyed: PropTypes.func.isRequired
};

export default BossMissile;