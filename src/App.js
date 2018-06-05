import React from 'react';
import './App.css';
import SlimeGroup from './SlimesGroup.jsx';
import CreateSlimeButton from './CreateSlimeButton.jsx';
import DefaultBoss from './DefaultBoss.jsx';

class App extends React.Component {
    maxId;
    maxPoolAmount = 1000;
    newSlimeValue = 100;
    maxSlimesQuantity = 8;

    constructor(props) {
        super(props);

        this.state = {
            slimes: [
                {
                    id: 1,
                    name: 'name',
                },
                {
                    id: 2,
                    name: 'name2',
                }
            ],
            poolAmount: this.maxPoolAmount,
            createSlimeButtonAvailable: true,
        };
        this.maxId = this.state.slimes.length;
    }

    createSlime() {
        if (this.state.poolAmount >= this.newSlimeValue && this.maxId < this.maxSlimesQuantity){
            ++this.maxId;
            this.setState(
                oldState => ({
                    poolAmount: oldState.poolAmount - this.newSlimeValue,
                    slimes: oldState.slimes.concat(
                        [{ id: this.maxId, name: `name${this.maxId}` }]
                    )
                })
            );
        }
        if (this.maxId >= this.maxSlimesQuantity) {
            this.setState({createSlimeButtonAvailable : false})
        }
    }

    render() {
        return (
            <div className="App">
                <div className="App-intro">
                    <h2>Welcome to Slimes Rumble!</h2>
                </div>

                {
                    this.state.createSlimeButtonAvailable
                    &&
                    <CreateSlimeButton
                        currentPoolAmount = {this.state.poolAmount}
                        maxPoolAmount = {this.maxPoolAmount}
                        onClick = {() => this.createSlime()}
                    />
                }

                <SlimeGroup slimes={this.state.slimes} />

                <DefaultBoss/>
            </div>
        )
    }
}

export default App;
