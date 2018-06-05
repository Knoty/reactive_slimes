import React from 'react';
import './App.css';
import SlimeGroup from './SlimesGroup.jsx';
import CreateSlimeButton from './CreateSlimeButton.jsx';
import DefaultBoss from './DefaultBoss.jsx';

class App extends React.Component {
    maxPoolAmount = 1000;
    newSlimeValue = 100;
    maxSlimesQuantity = 8;
    healAmount = 15;
    smallestMaxHP = 80;
    highestMaxHP = 121;
    maxHP = Number(Math.floor(Math.random() * (this.highestMaxHP - this.smallestMaxHP) + this.smallestMaxHP));

    makeSlime(id) {
        let maxHP = Number(Math.floor(Math.random() * (this.highestMaxHP - this.smallestMaxHP) + this.smallestMaxHP));
        return {
            id: id,
            name: `name${id}`,
            hp: maxHP,
            maxHP: maxHP
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            slimes: [
                this.makeSlime(1),
                this.makeSlime(2)
            ],
            poolAmount: this.maxPoolAmount,
            createSlimeButtonAvailable: true,
        };
    }

    createSlime() {
        if (this.state.poolAmount >= this.newSlimeValue && this.state.slimes.length < this.maxSlimesQuantity){
            this.setState(
                oldState => ({
                    poolAmount: oldState.poolAmount - this.newSlimeValue,
                    slimes: oldState.slimes.concat(
                        [this.makeSlime(oldState.slimes.length + 1)]
                    ),
                    createSlimeButtonAvailable: oldState.slimes.length + 1 < this.maxSlimesQuantity
                })
            );
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
