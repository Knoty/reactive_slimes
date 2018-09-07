import React, {Component} from 'react';
import App from './App';
import StartScreen from './StartScreen.jsx';

class Game extends Component {

    constructor(props) {
        super(props);

        this.state = {
            buttonWasClicked: false
        };
    }

    clickStartButton() {
        this.setState(
            oldState => {
                oldState.buttonWasClicked = true
            }
        )
    }

    render() {
        return (
            this.state.buttonWasClicked
                ? <App />
                : <StartScreen onClick = {() => {this.clickStartButton()}} />
        )
    }
}

export default Game;
