import React, { Component } from 'react';
import BossView from './BossView.jsx';

class DefaultBoss extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBeingHit: false
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentHP <= this.props.currentHP) {
            return;
        }
        this.setState(
            {isBeingHit: true},
            () => {
                setTimeout(
                    () => this.setState({isBeingHit: false}),
                    500
                )
            }
        )
    }

    render() {
        return (
            <BossView
                {...this.props}
                isBeingHit = {this.state.isBeingHit}
            />
        )
    }
}

export default DefaultBoss;