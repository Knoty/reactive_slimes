import React from 'react';
import './App.css';
import SlimeGroup from './SlimesGroup.jsx';
import CreateSlimeButton from './CreateSlimeButton.jsx';
import DefaultBoss from './DefaultBoss.jsx';

class App extends React.Component {
    maxID = 0;
    maxPoolAmount = 1000;
    newSlimeValue = 100;
    maxSlimesQuantity = 8;
    smallestMaxHP = 80;
    highestMaxHP = 121; //N.B. highestMaxHP = highestMaxHP - 1
    healAmount = 30;
    healPrice = 5;
    playerPower = 80;
    smallestBossPower = 35;
    highestBossPower = 71; //N.B. highestBossPower = highestBossPower - 1
    maxBossHP = 1000;

    slimeConstructor(id) {
        const maxHP = Number(Math.round(Math.random() * (this.highestMaxHP - this.smallestMaxHP) + this.smallestMaxHP));
        return {
            id: id,
            hp: maxHP,
            maxHP: maxHP
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            slimes: [
                this.slimeConstructor(this.makeID()),
                this.slimeConstructor(this.makeID())
            ],
            poolAmount: this.maxPoolAmount,
            bossHP: this.maxBossHP
        };
    }

    makeID() {
        return ++this.maxID;
    }

    getRandomSlimeID() {
        const slimeNumber = Math.floor(Math.random() * this.state.slimes.length);
        return this.state.slimes[slimeNumber].id
    }

    createSlime() {
        if (this.state.poolAmount >= this.newSlimeValue && this.state.slimes.length < this.maxSlimesQuantity){
            this.setState(
                oldState => ({
                    poolAmount: oldState.poolAmount - this.newSlimeValue,
                    slimes: oldState.slimes.concat(
                        [this.slimeConstructor(this.makeID())]
                    )
                })
            );
            console.log('Вы создали слайма! Маны потрачено: '+this.newSlimeValue+'.');
            this.hitSlime(this.getRandomSlimeID())
        }
    }

    healSlime(id) {
        this.setState(
            oldState => {

                const healSlimeByID = (oldSlime) => {
                    if (id !== oldSlime.id)
                        return oldSlime;
                    if (oldSlime.hp === oldSlime.maxHP) {
                        console.log('Слайм №'+id+' полностью здоров!');
                        return oldSlime;
                    }
                    let newHP = Number(oldSlime.hp) + Number(this.healAmount);
                    if (newHP > oldSlime.maxHP) {
                        newHP = oldSlime.maxHP
                    }
                    if (newHP > oldSlime.hp) {
                        oldState.poolAmount -= this.healPrice;
                        console.log(
                            'Слайм №'+id+' с '+oldSlime.hp+' хп был вылечен на '+this.healAmount+', и теперь имеет '+newHP+' из '+oldSlime.maxHP+'.'
                        );
                        this.hitSlime(this.getRandomSlimeID())
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

    hitSlime(id) {

        let bossHit = Math.round(Math.random() * (this.highestBossPower - this.smallestBossPower) + this.smallestBossPower);
        console.log('В ответ босс нанес '+bossHit+' повреждений слайму №'+id);

        this.setState(
            oldState => {

                const hitSlimeByID = (oldSlime) => {
                    if (id !== oldSlime.id)
                        return oldSlime;
                    let newHP = Number(oldSlime.hp) - bossHit;
                    if (newHP <= 0) {
                        console.log('Слайм №'+oldSlime.id+' погиб. T_T');
                        return undefined;
                    }
                    return Object.assign({}, oldSlime, { hp: newHP });
                };

                return {
                    slimes: oldState.slimes.map(
                        hitSlimeByID
                    ).filter((slime) => {
                        return slime !== undefined
                    })
                };
            }
        );
    }

    hitBoss() {
        this.setState(
            oldState => {
                const newHP = Number(oldState.bossHP) - Number(this.playerPower);
                if (newHP > 0) {
                    console.log('Босс с '+oldState.bossHP+' хп был поражён на '+this.playerPower+', и теперь имеет '+newHP+'.');
                    this.hitSlime(this.getRandomSlimeID());
                    return { bossHP: newHP };
                } else {
                    return { bossHP: 0 };
                }
            }
        );
    }

    render() {
        return (
            <div className='App'>

                {
                    this.state.bossHP <= 0
                    &&
                    <div className='win_screen'>
                        <div className='win_message'>
                            <h1>Поздравляем! Вы одержали победу!</h1>
                        </div>
                    </div>
                }

                {
                    this.state.slimes.length <= 0
                    &&
                    <div className='lose_screen'>
                        <div className='lose_message'>
                            <h1>Вы проиграли! Т_Т</h1>
                        </div>
                    </div>
                }

                <div className='App-intro'>
                    <h2>Welcome to Slimes Rumble!</h2>
                </div>

                {
                    this.state.slimes.length < this.maxSlimesQuantity && this.state.poolAmount > this.healPrice
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

                <DefaultBoss
                    currentHP = {this.state.bossHP}
                    maxHP = {this.maxBossHP}
                    onClick = {() => this.hitBoss()}
                />
            </div>
        )
    }
}

export default App;
