import React, { Component } from 'react';
import SlimeView from './SlimeView.jsx';

class DefaultSlime extends Component {

    render() {
        return (
            <SlimeView
                {...this.props}
            />
        )
    }
}

export default DefaultSlime;