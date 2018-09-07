import React from 'react';
import './css/App.css';
import SlimeGroup from './SlimesGroup.jsx';
import CreateSlimeButton from './CreateSlimeButton.jsx';
import DefaultBoss from './DefaultBoss.jsx';
import LevelBar from './LevelBar';
import BossMissile from './BossMissile';

function getEmptyPlaceNumber(places) {
    for (let placeNumber = 0; placeNumber < places.length; placeNumber++) {
        if (places[placeNumber].isFree === true) {
            return placeNumber;
        }
    }
    return -1
}

class App extends React.Component {
    maxID = 0;
    beginningSlimesAmount = 2;
    maxSlimesQuantity = 8;
    maxResourceAmount = 1000;
    createSlimeValue = 100;
    smallestMaxHP = 80;
    highestMaxHP = 121; //N.B. highestMaxHP = highestMaxHP - 1
    healPrice = 5;
    healAmount = 80;
    maxBossHP = 1000;
    smallestBossPower = 35;
    highestBossPower = 71; //N.B. highestBossPower = highestBossPower - 1
    playerPowerMultiplier = 1.4;
    commonUserControlTakeAwayDelay = 1000;

    slimeConstructor(id, placeNumber) {
        const maxHP = Number(Math.round(Math.random() * (this.highestMaxHP - this.smallestMaxHP) + this.smallestMaxHP));
        return {
            id: id,
            hp: maxHP,
            maxHP: maxHP,
            place: placeNumber
        }
    }

    slimesConstructor(slimes) {
        let slimesArr = [];
        for (let count = 0; count < slimes; count++) {
            slimesArr.push(this.slimeConstructor(this.makeID(), count))
        }
        return slimesArr
    }

    constructor(props) {
        super(props);

        this.state = {
            slimes: this.slimesConstructor(this.beginningSlimesAmount),
            resourceAmount: this.maxResourceAmount,
            bossHP: this.maxBossHP,
            places: [
                {left: 55, top: 260, isFree: false},
                {left: 55, top: 415, isFree: false},
                {left: 195, top: 195, isFree: true},
                {left: 195, top: 350, isFree: true},
                {left: 340, top: 260, isFree: true},
                {left: 340, top: 415, isFree: true},
                {left: 475, top: 195, isFree: true},
                {left: 475, top: 350, isFree: true}
            ],
            isUserHasControl: true,
            isBossAttacking: false // TODO: this must belong to DefaultBoss component.
        };
    }

    makeID() {
        return ++this.maxID;
    }

    getSlimeByID(id) {
        return this.state.slimes.find(
            slime => slime.id === id
        )
    }

    getRandomSlimeID() {
        const slimeNumber = Math.floor(Math.random() * this.state.slimes.length);
        return this.state.slimes[slimeNumber].id
    }

    getPlayerPower() {
        return 10 * this.state.slimes.length;
    }

    getPlayerPowerMultiplier() {
        return this.state.slimes.length === this.maxSlimesQuantity ? this.playerPowerMultiplier : 1;
    }

    getBossDamage() {
        return Math.round(Math.random() * (this.highestBossPower - this.smallestBossPower) + this.smallestBossPower);
    }

    createSlime() {
        if (this.state.resourceAmount >= this.createSlimeValue && this.state.slimes.length < this.maxSlimesQuantity){
            this.setState(
                oldState => {
                    let placeNumber = getEmptyPlaceNumber(oldState.places);
                    if (placeNumber === -1) {
                        throw new Error('Свободных мест нет')
                    }
                    return {
                        resourceAmount: oldState.resourceAmount - this.createSlimeValue,
                        slimes: oldState.slimes.concat(
                            [this.slimeConstructor(this.makeID(), placeNumber)]
                        ),
                        places: oldState.places.map(
                            (place, index) => index === placeNumber
                                ? Object.assign({}, place, {isFree: false})
                                : place
                        )
                    }
                },
                () => {
                    this.setState(
                        {
                            isUserHasControl: false
                        },
                        () => {
                            console.log('Вы создали слайма! Маны потрачено: ' + this.createSlimeValue + '.');
                            this.hitSlime(this.getRandomSlimeID(), this.getBossDamage())
                        }
                    )
                }
            );
        }
    }

    healSlime(id) {
        this.setState(
            oldState => {

                const updatedResourceAmount = oldState.resourceAmount - this.healPrice;
                if (updatedResourceAmount <= 0) {
                    console.log('Недостаточно маны для лечения');
                    return oldState;
                }

                const healSlimeByID = (oldSlime) => {
                    let newHP = Number(oldSlime.hp) + Number(this.healAmount);
                    if (newHP > oldSlime.maxHP) {
                        newHP = oldSlime.maxHP
                    }
                    console.log(
                        'Слайм №' + id + ' с ' + oldSlime.hp + ' хп был вылечен на ' + this.healAmount
                        + ', и теперь имеет ' + newHP + ' из ' + oldSlime.maxHP + '.'
                    );
                    return Object.assign({}, oldSlime, {hp: newHP});
                };

                const targetSlimes = oldState.slimes.filter(
                    slime => slime.id === id
                );
                if (!targetSlimes.length) {
                    throw new Error('Вы лечите несуществующего слайма ' + id)
                }
                const targetSlime = targetSlimes[0];
                if (targetSlime.hp === targetSlime.maxHP) {
                    console.log('Слайм №' + id + ' полностью здоров!');
                    return oldState;
                }
                const updatedSlime = healSlimeByID(targetSlime);
                const updatedSlimes = oldState.slimes.map(
                    slime => slime.id === targetSlime.id ? updatedSlime : slime
                );

                return {
                    slimes: updatedSlimes,
                    resourceAmount: updatedResourceAmount
                };
            },
            () => {
                this.setState(
                    {
                        isUserHasControl: false
                    },
                    () => {
                        this.hitSlime(this.getRandomSlimeID(), this.getBossDamage())
                    }
                )
            }
        );
    }

    hitSlime(id, bossDamage) {
        this.setState(
            oldState => {

                const hitSlimeByID = (oldSlime) => {
                    if (id !== oldSlime.id)
                        return oldSlime;
                    let newHP = Number(oldSlime.hp) - bossDamage;
                    console.log(
                        'В ответ босс нанес ' + bossDamage + ' повреждений слайму №' + id + ' c ' + oldSlime.hp
                        + ' хп, и теперь у него ' + newHP + ' хп.'
                    );
                    if (newHP <= 0) {
                        console.log('Слайм №' + oldSlime.id + ' погиб. T_T');
                    }
                    return Object.assign({}, oldSlime, {hp: newHP});
                };

                let updatedSlimes = oldState.slimes.map(hitSlimeByID);

                let deadSlimePlaces = updatedSlimes.reduce(
                    (places, slime) => {
                        if (slime.hp <= 0) {
                            places.push(slime.place);
                        }
                        return places
                    },
                    []
                );

                return {
                    missileTargetID: id,
                    isBossAttacking: true,
                    slimes: updatedSlimes.filter((slime) => {
                        return slime.hp > 0
                    }),
                    places: oldState.places.map(
                        function (place, index) {
                            if (deadSlimePlaces.includes(index)) {
                                return Object.assign({}, place, {isFree: true})
                            }
                            return place
                        }
                    )
                };
            },
            () => {
                setTimeout(
                    () => {
                        this.setState(
                            {isUserHasControl: true}
                        )
                    },
                    this.commonUserControlTakeAwayDelay
                )
            }
        );
    }

    hitBoss() {
        this.setState(
            oldState => {

                const playerPower = this.getPlayerPower() * this.getPlayerPowerMultiplier();
                const newHP = Number(oldState.bossHP) - Number(playerPower);

                if (newHP > 0) {
                    console.log('Босс с ' + oldState.bossHP + ' хп был поражён на ' + playerPower
                        + ', и теперь имеет ' + newHP + '.');
                    return {bossHP: newHP};
                } else {
                    return {bossHP: 0};
                }
            },
            () => {
                this.setState(
                    {
                        isUserHasControl: false
                    },
                    () => {
                        this.hitSlime(this.getRandomSlimeID(), this.getBossDamage())
                    }
                )
            }
        );
    }

    getMissileEndPoint() {
        const targetSlime = this.getSlimeByID(this.state.missileTargetID);
        if (!targetSlime) {
            console.error('No valid target for missile');
            return {left: 100, top: 300};
        }
        return this.state.places[targetSlime.place];
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
            <div className = 'App'>
                <div className = 'border'>
                    {
                        this.state.missileTargetID
                        &&
                        <BossMissile
                            startPoint = {{x: 900, y: 300}}
                            endPoint = {this.getMissileEndPoint()}
                            targetSlime = {this.state.missileTargetID}
                            onDestroyed = {() => this.setState({missileTargetID: undefined})}
                        />
                    }

                    {
                        this.state.bossHP <= 0
                        &&
                        <div
                            className = 'win_screen'
                            title = 'Congratulations! You won! Click to try again.'
                            onClick = {() => window.location.reload()}
                        />
                    }

                    {
                        this.state.slimes.length <= 0
                        &&
                        <div
                            className = 'lose_screen'
                            title = 'Defeat! You lost. Click to try again.'
                            onClick = {() => window.location.reload()}
                        />
                    }

                    <SlimeGroup
                        slimes = {this.state.slimes}
                        healPrice = {this.healPrice}
                        healSlime = {this.state.isUserHasControl ? (id) => this.healSlime(id) : () => {}}
                        places = {this.state.places}
                    />

                    {
                        this.state.bossHP > 0
                        &&
                        <DefaultBoss
                            currentHP = {this.state.bossHP}
                            maxHP = {this.maxBossHP}
                            onClick = {this.state.isUserHasControl ? () => this.hitBoss() : () => {}}
                            isBossAttacking = {this.state.isBossAttacking}
                            stopAnimation = {() => this.setState({isBossAttacking: false})}
                        />
                    }

                    <CreateSlimeButton
                        active = {
                            this.state.slimes.length < this.maxSlimesQuantity &&
                            this.state.resourceAmount >= this.createSlimeValue &&
                            this.state.isUserHasControl
                        }
                        createSlimeValue = {this.createSlimeValue}
                        onClick = {this.state.isUserHasControl ? () => this.createSlime() : () => {}}
                    />

                    <div className = 'level_bar_wrapper slimes_quantity_bar' title = 'slimes quantity & power'>
                        <div className = {`level_bar_label slimes_quantity_label ${this.getSlimesQuantity()}`} />
                        <LevelBar
                            current = {this.state.slimes.length}
                            max = {this.maxSlimesQuantity}
                        />
                    </div>

                    <div className = 'level_bar_wrapper resources_bar' title = 'resource'>
                        <div
                            className = {`level_bar_label resource_label ${(this.state.resourceAmount > 0)
                                ? 'full_resource_label'
                                : 'resource_depleted_label'}`}
                        />
                        <LevelBar
                            current = {this.state.resourceAmount}
                            max = {this.maxResourceAmount}
                        />
                    </div>

                    {
                        !this.state.isUserHasControl
                        &&
                        <div className = 'disable_actions' title = 'wait for results' />
                    }

                </div>
            </div>
        )
    }
}

export default App;