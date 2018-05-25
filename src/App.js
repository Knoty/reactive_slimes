import React from 'react';
import './App.css';
import SlimeGroup from './SlimesGroup.jsx';
import CreateSlimeButton from './CreateSlimeButton.jsx';
import Boss from './Boss.jsx';

class App extends React.Component {
    maxId;

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
            ]
        };

        this.maxId = this.state.slimes.length;
    }

    onClick() {
        ++this.maxId;
        this.setState(
            oldState => ({
                 slimes: oldState.slimes.concat(
                     [{ id: this.maxId, name: `name${this.maxId}`, maxHP: 100, currentHP: 75 }]
                 )
            })
        )
    }

    render() {
        return (
            <div className="App">
                <div className="App-intro">
                    <h2>Welcome to Slimes Rumble</h2>
                </div>
                <SlimeGroup slimes={this.state.slimes} />
                <CreateSlimeButton
                    currentPoolAmount={this.props.poolAmount}
                    maxPoolAmount={1000}

                    onClick={
                        () => {
                            this.onClick()
                        }
                    }

                />
                <Boss currentHP={this.props.boss.currentHP} maxHP={this.props.boss.maxHP} damage={this.props.boss.damage} />
            </div>
        )
    }
}

export default App;
