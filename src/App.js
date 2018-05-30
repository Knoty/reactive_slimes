import React from 'react';
import './App.css';
import SlimeGroup from './SlimesGroup.jsx';
import CreateSlimeButton from './CreateSlimeButton.jsx';
import Boss from './Boss.jsx';

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
                    maxHP: 100,
                    currentHP: 90
                },
                {
                    id: 2,
                    name: 'name2',
                    maxHP: 100,
                    currentHP: 80
                }
            ],
            poolAmount: this.maxPoolAmount,
            createSlimeButtonAvailable: true,
        };
        this.maxId = this.state.slimes.length;
    }

    onClick() {
        if (this.state.poolAmount >= this.newSlimeValue && this.maxId < this.maxSlimesQuantity){
            ++this.maxId;
            this.setState(
                oldState => ({
                     slimes: oldState.slimes.concat(
                         [{ id: this.maxId, name: `name${this.maxId}`, maxHP: 100, currentHP: 75 }]
                     )
                })
            );
            this.setState(
                oldState => ({
                    poolAmount: oldState.poolAmount - this.newSlimeValue
                })
            )
        }
        if (this.maxId >= this.maxSlimesQuantity) {
            this.state.createSlimeButtonAvailable = false;
        }

    }

    render() {
        return (
            <div className="App">
                <div className="App-intro">
                    <h2>Welcome to Slimes Rumble</h2>
                </div>
                <SlimeGroup slimes={this.state.slimes} />
                {
                    this.state.createSlimeButtonAvailable
                    &&
                    <CreateSlimeButton
                        currentPoolAmount={this.state.poolAmount}
                        maxPoolAmount={this.maxPoolAmount}

                        onClick={
                            () => {
                                this.onClick()
                            }
                        }

                    />
                }
                <Boss currentHP={this.props.boss.currentHP} maxHP={this.props.boss.maxHP} damage={this.props.boss.damage} />
            </div>
        )
    }
}

export default App;
