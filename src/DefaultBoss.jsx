import React, { Component } from 'react';
import BossView from './BossView.jsx';

class DefaultBoss extends Component {

    render() {
        return (
            <BossView
                {...this.props}
            />
        )
    }
}

export default DefaultBoss;