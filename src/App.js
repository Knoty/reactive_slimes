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
    healAmount = 15;
    smallestMaxHP = 80;
    highestMaxHP = 121;
    maxHP = Number(Math.floor(Math.random() * (this.highestMaxHP - this.smallestMaxHP) + this.smallestMaxHP));

    constructor(props) {
        super(props);

        this.state = {
            slimes: [
                {
                    id: 1,
                    name: 'name',
                    hp: 10,
                    maxHP: this.maxHP
                },
                {
                    id: 2,
                    name: 'name2',
                    hp: 45,
                    maxHP: this.maxHP
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
                        [{id: this.maxId, name: `name${this.maxId}`}]
                    )
                })
            );
        }
        if (this.maxId >= this.maxSlimesQuantity) {
            this.setState({createSlimeButtonAvailable : false})
        }
    }

    healSlime(id) {
        this.setState(
            oldState => {

                const healSlimeByID = (oldSlime) => {
                    if (id !== oldSlime.id)
                        return oldSlime;
                    if (oldSlime.hp === oldSlime.maxHP) {
                        alert('Слайм полность здоров!');
                        return oldSlime;
                    }
                    let newHP = Number(oldSlime.hp) + Number(this.healAmount);
                    if (newHP > oldSlime.maxHP) {
                        newHP = oldSlime.maxHP
                    }
                    return Object.assign({}, oldSlime, { hp: newHP });
                };

                return {
                    slimes: oldState.slimes.map(
                        healSlimeByID
                    )
                };
            }
        );
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

                <SlimeGroup
                    slimes = {this.state.slimes}
                    healSlime = {(id) => this.healSlime(id)}
                />

                <DefaultBoss/>
            </div>
        )
    }
}

export default App;
