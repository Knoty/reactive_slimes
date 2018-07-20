import React from 'react';
import './css/App.css';
import SlimeGroup from './SlimesGroup.jsx';
import CreateSlimeButton from './CreateSlimeButton.jsx';
import DefaultBoss from './DefaultBoss.jsx';
import LevelBar from './LevelBar';

class App extends React.Component {
    maxID = 0;
    maxResourceAmount = 1000;
    createSlimeValue = 100;
    maxSlimesQuantity = 8;
    smallestMaxHP = 80;
    highestMaxHP = 121; //N.B. highestMaxHP = highestMaxHP - 1
    healAmount = 80;
    healPrice = 5;
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
            ResourceAmount: this.maxResourceAmount,
            bossHP: this.maxBossHP
        };
    }

    getPlayerPower() {
        return 10 * this.state.slimes.length;
    }

    makeID() {
        return ++this.maxID;
    }

    getRandomSlimeID() {
        const slimeNumber = Math.floor(Math.random() * this.state.slimes.length);
        return this.state.slimes[slimeNumber].id
    }

    createSlime() {
        if (this.state.ResourceAmount >= this.createSlimeValue && this.state.slimes.length < this.maxSlimesQuantity){
            this.setState(
                oldState => ({
                    ResourceAmount: oldState.ResourceAmount - this.createSlimeValue,
                    slimes: oldState.slimes.concat(
                        [this.slimeConstructor(this.makeID())]
                    )
                }),
                () => {
                    console.log('Вы создали слайма! Маны потрачено: '+this.createSlimeValue+'.');
                    this.hitSlime(this.getRandomSlimeID(), this.getBossDamage())
                }
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
                        console.log('Слайм №'+id+' полностью здоров!');
                        return oldSlime;
                    }
                    let newHP = Number(oldSlime.hp) + Number(this.healAmount);
                    if (newHP > oldSlime.maxHP) {
                        newHP = oldSlime.maxHP
                    }
                    if (newHP > oldSlime.hp) {
                        oldState.ResourceAmount -= this.healPrice;
                        console.log(
                            'Слайм №'+id+' с '+oldSlime.hp+' хп был вылечен на '+this.healAmount+', и теперь имеет '+newHP+' из '+oldSlime.maxHP+'.'
                        );
                    }
                    return Object.assign({}, oldSlime, {hp: newHP});
                };

                return {
                    slimes: oldState.slimes.map(
                        healSlimeByID
                    )
                };
            },
            () => {
                this.hitSlime(this.getRandomSlimeID(), this.getBossDamage())
            }
        );
    }

    getBossDamage() {
        return Math.round(Math.random() * (this.highestBossPower - this.smallestBossPower) + this.smallestBossPower);
    }

    hitSlime(id, bossDamage) {
        this.setState(
            oldState => {

                const hitSlimeByID = (oldSlime) => {
                    if (id !== oldSlime.id)
                        return oldSlime;
                    let newHP = Number(oldSlime.hp) - bossDamage;
                    console.log(
                        'В ответ босс нанес ' + bossDamage + ' повреждений слайму №' + id + ' c ' + oldSlime.hp + ' хп, и теперь у него ' + newHP + ' хп.'
                    );
                    if (newHP <= 0) {
                        console.log('Слайм №'+oldSlime.id+' погиб. T_T');
                        return undefined;
                    }
                    return Object.assign({}, oldSlime, {hp: newHP});
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

                const playerPower = this.getPlayerPower();
                const newHP = Number(oldState.bossHP) - Number(playerPower);

                if (newHP > 0) {
                    console.log('Босс с '+oldState.bossHP+' хп был поражён на '+playerPower+', и теперь имеет '+newHP+'.');
                    return {bossHP: newHP};
                } else {
                    return {bossHP: 0};
                }
            },
            () => {
                this.hitSlime(this.getRandomSlimeID(), this.getBossDamage())
            }
        );
    }

    getSlimesQuantity() {

        const slimes_alive_ratio = this.state.slimes.length / this.maxSlimesQuantity * 100;

        switch (true) {
            case (slimes_alive_ratio <= 0):
                return 'no_slimes';
            case (slimes_alive_ratio > 1 && slimes_alive_ratio < 49):
                return 'few_slimes';
            case (slimes_alive_ratio > 49 && slimes_alive_ratio < 100):
                return 'many_slimes';
            case (slimes_alive_ratio === 100):
                return 'maximum_slimes';
            default:
                return 'maximum_slimes';
        }
    }

    render() {
        return (
            <div className="App">
                <div className="border">

                    {
                        this.state.bossHP <= 0
                        &&
                        <div
                            className="win_screen"
                            title="Поздравляем! Вы одержали победу! Нажмите, чтобы попробовать еще раз."
                            onClick = {() => window.location.reload()}
                        />
                    }

                    {
                        this.state.slimes.length <= 0
                        &&
                        <div
                            className="lose_screen"
                            title="Поражение! Вы проиграли. Нажмите, чтобы попробовать еще раз."
                            onClick = {() => window.location.reload()}
                        />
                    }

                    <SlimeGroup
                        slimes = {this.state.slimes}
                        healPrice = {this.healPrice}
                        healSlime = {(id) => this.healSlime(id)}
                    />

                    {
                        this.state.bossHP > 0
                        &&
                        <DefaultBoss
                            currentHP = {this.state.bossHP}
                            maxHP = {this.maxBossHP}
                            onClick = {() => this.hitBoss()}
                        />
                    }

                    <CreateSlimeButton
                        active = {this.state.slimes.length < this.maxSlimesQuantity && this.state.ResourceAmount > this.healPrice}
                        createSlimeValue = {this.createSlimeValue}
                        onClick = {() => this.createSlime()}
                    />

                    <div className="level_bar_wrapper slimes_quantity_bar" title="slimes quantity & power">
                        <div
                            className={`level_bar_label slimes_quantity_label ${this.getSlimesQuantity()}`}
                        />
                        <LevelBar
                            current = {this.state.slimes.length}
                            max = {this.maxSlimesQuantity}
                        />
                    </div>

                    <div className="level_bar_wrapper resources_bar" title="resource">
                        <div
                            className={`level_bar_label resource_label ${(this.state.ResourceAmount > 0) ? 'full_resource_label' : 'resource_depleted_label'}`}
                        />
                        <LevelBar
                            current = {this.state.ResourceAmount}
                            max = {this.maxResourceAmount}
                        />
                    </div>

                </div>
            </div>
        )
    }
}

export default App;
