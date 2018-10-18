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
    return 'is no free places'
}

function createStateUpdaterHealingSlime(targetSlime) {
    return (
        function (oldState) {

            const healSlimeByID = (oldSlime) => {
                let newHP = Number(oldSlime.hp) + Number(this.healAmount);
                if (newHP > oldSlime.maxHP) {
                    newHP = oldSlime.maxHP
                }
                console.log(
                    'Слайм №' + targetSlime.id + ' с ' + oldSlime.hp + ' хп был вылечен на ' + this.healAmount
                    + ', и теперь имеет ' + newHP + ' из ' + oldSlime.maxHP + '.'
                );
                return Object.assign({}, oldSlime, {hp: newHP});
            };

            const updatedSlime = healSlimeByID(targetSlime);
            const updatedSlimes = oldState.slimes.map(
                slime => slime.id === targetSlime.id ? updatedSlime : slime
            );
            const updatedResourceAmount = oldState.resourceAmount - this.healPrice;

            return {
                slimes: updatedSlimes,
                resourceAmount: updatedResourceAmount
            }
        }
    )
}

function createStateUpdaterHittingSlime(slimeID, bossDamage) {
    return (
        /**
         *
         * @param {Array} oldState.slimes
         * @returns {{slimes: any[]}}
         */
        function (oldState) {

            const hitSlimeByID = (oldSlime) => {
                if (slimeID !== oldSlime.id)
                    return oldSlime;
                let newHP = Number(oldSlime.hp) - bossDamage;
                console.log(
                    'В ответ босс нанес ' + bossDamage + ' повреждений слайму №' + slimeID + ' c ' + oldSlime.hp
                    + ' хп, и теперь у него ' + newHP + ' хп.'
                );
                let newStatus = oldSlime.status;
                if (newHP <= 0) {
                    newStatus = 'dead';
                    console.log('Слайм №' + oldSlime.id + ' погиб. T_T');
                }
                return Object.assign({}, oldSlime, {hp: newHP}, {status: newStatus});
            };

            let updatedSlimes = oldState.slimes.map(hitSlimeByID);

            return {
                slimes: updatedSlimes
            }
        }
    )
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
    playerPowerMultiplier = 1.3;
    slimeCreationAnimationLength = 10;
    bossWasHitAnimationLength = 800;
    bossAttackAnimationLength = 2000;
    missileFlyTime = 1000;

    slimeConstructor(id, placeNumber) {
        const maxHP = Number(Math.round(Math.random() * (this.highestMaxHP - this.smallestMaxHP) + this.smallestMaxHP));
        return {
            id: id,
            hp: maxHP,
            maxHP: maxHP,
            place: placeNumber,
            status: 'alive'
        }
    }

    slimesConstructor(slimes) {
        let slimesArr = [];
        for (let slimesCounter = 0; slimesCounter < slimes; slimesCounter++) {
            slimesArr.push(this.slimeConstructor(this.makeID(), slimesCounter))
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
            isBossAttacking: false, // TODO: this must belong to DefaultBoss component.
            isMissileExist: false,
            isBossWasHit: false
        };
    }

    makeID() {
        return ++this.maxID
    }

    getSlimeByID(id) {
        return this.state.slimes.find(
            slime => slime.id === id
        )
    }

    getRandomSlimeID() {
        let arrAliveSlimes = this.getAliveSlimesArray();
        const chosenSlime = Math.floor(Math.random() * arrAliveSlimes.length);
        return arrAliveSlimes[chosenSlime].id
    }

    getAliveSlimesArray() {
        let aliveSlimesArray = [];
        for (let slimeNumber = 0; slimeNumber < this.state.slimes.length; slimeNumber++) {
            if (this.state.slimes[slimeNumber].status === 'alive') {
                aliveSlimesArray.push(this.state.slimes[slimeNumber])
            }
        }
        return aliveSlimesArray;
    }

    getPlayerPower() {
        return 10 * this.state.slimes.length
    }

    getPlayerPowerMultiplier() {
        return this.isSlimesQuantityMaximum() ? this.playerPowerMultiplier : 1
    }

    getBossDamage() {
        return Math.round(Math.random() * (this.highestBossPower - this.smallestBossPower) + this.smallestBossPower)
    }

    getBossItselfAnimationLength() {
        return this.state.isBossWasHit
            ? (this.bossAttackAnimationLength + this.bossWasHitAnimationLength)
            : this.bossAttackAnimationLength
    }

    getAllBossActionAnimationLength() {
        return this.getBossItselfAnimationLength() + this.missileFlyTime
    }

    getAnimationBegininngOfSlimesReaction() {
        return this.getAllBossActionAnimationLength() - 800
    }

    isSlimesQuantityMaximum() {
        return this.getAliveSlimesQuantity() === this.maxSlimesQuantity
    }

    getAliveSlimesQuantity() {
        let aliveSlimesQuantity = 0;
        for (let slimeNumber = 0; slimeNumber < this.state.slimes.length; slimeNumber++) {
            if (this.state.slimes[slimeNumber].status === 'alive') {
                ++aliveSlimesQuantity
            }
        }
        return aliveSlimesQuantity
    }

    createSlime() {
        if (this.state.resourceAmount < this.createSlimeValue) {
            return
        }
        if (this.getAliveSlimesQuantity() >= this.maxSlimesQuantity) {
            return
        }
        this.setState(
            /**
             *
             * @param {Array} oldState.slimes
             * @param {Array} oldState.places
             * @param {...number} oldState.resourceAmount
             * @returns {{resourceAmount: number, slimes: [], places: any[]}}
             */
            oldState => {
                let freePlaceNumber = getEmptyPlaceNumber(oldState.places);
                if (freePlaceNumber === 'is no free places') {
                    let slimeIDToReplace;
                    let slimePlaceToReplace;
                    for (let i = 0; i < oldState.slimes.length; ++i) {
                        if (oldState.slimes[i].status === 'dead') {
                            slimeIDToReplace = oldState.slimes[i].id;
                            slimePlaceToReplace = oldState.slimes[i].place;
                            break;
                        }
                    }
                    if (slimeIDToReplace === undefined) {
                        throw new Error('Мертвых нет')
                    }
                    return {
                        resourceAmount: oldState.resourceAmount - this.createSlimeValue,
                        slimes: oldState.slimes.map(
                            slime => {
                                if (slime.id === slimeIDToReplace) {
                                    return this.slimeConstructor(slimeIDToReplace, slimePlaceToReplace)
                                }
                                return slime
                            }
                        ),
                        places: oldState.places
                    }
                }
                return {
                    resourceAmount: oldState.resourceAmount - this.createSlimeValue,
                    slimes: oldState.slimes.concat(
                        [this.slimeConstructor(this.makeID(), freePlaceNumber)]
                    ),
                    places: oldState.places.map(
                        (place, index) => index === freePlaceNumber
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
                        setTimeout(
                            () => {
                                console.log('Вы создали слайма! Маны потрачено: ' + this.createSlimeValue + '.');
                                this.hitSlime(this.getRandomSlimeID(), this.getBossDamage());
                            },
                            this.slimeCreationAnimationLength
                        )
                    }
                )
            }
        )
    }

    healSlime(slimeID) {
        if (this.state.resourceAmount - this.healPrice < 0) {
            console.log('Недостаточно маны для лечения');
            return
        }

        const targetSlimes = this.state.slimes.filter(
            slime => slime.id === slimeID
        );
        if (!targetSlimes.length) {
            throw new Error('Вы пытаетесь лечить несуществующего слайма ' + slimeID + '.')
        }
        const targetSlime = targetSlimes[0];
        if (targetSlime.hp === targetSlime.maxHP || targetSlime.hp <= 0) {
            console.log('Состояние слайма №' + slimeID + ' не позволяет его вылечить.');
            return
        }
        this.setState(
            createStateUpdaterHealingSlime.call(this, targetSlime),
            () => {
                this.setState(
                    {
                        isUserHasControl: false
                    },
                    () => this.hitSlime(this.getRandomSlimeID(), this.getBossDamage())
                )
            }
        )
    }

    hitSlime(slimeID, bossDamage) {
        this.setState(
            {
                isBossAttacking: true,
                missileTargetID: slimeID
            },
            () => {
                setTimeout(
                    () => {
                        this.setState(
                            createStateUpdaterHittingSlime(slimeID, bossDamage),
                            () => {
                                this.setState(
                                    {
                                        isUserHasControl: true
                                    }
                                )
                            }
                        )
                    },
                    this.getAnimationBegininngOfSlimesReaction()
                )
            }
        );
        setTimeout(
            () => this.createMissile(),
            this.bossAttackAnimationLength
        )
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
                        setTimeout(
                            () => {
                                this.setState(
                                    {
                                        isBossWasHit: true
                                    },
                                    () => {
                                        this.hitSlime(this.getRandomSlimeID(), this.getBossDamage())
                                    }
                                );
                            },
                            this.bossWasHitAnimationLength
                        )
                    }
                )
            }
        )
    }

    createMissile() {
        this.setState(
            {
                isMissileExist: true
            }
        )
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
                        this.state.isMissileExist
                        &&
                        <BossMissile
                            startPoint = {{left: 900, top: 300}}
                            endPoint = {this.getMissileEndPoint()}
                            targetSlime = {this.state.missileTargetID}
                            flyTime = {this.missileFlyTime}
                            destroyAfterDelay = {
                                () => {
                                    setTimeout(
                                        () => this.setState({isMissileExist: false}),
                                        this.missileFlyTime
                                    )
                                }
                            }
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
                        this.getAliveSlimesQuantity() <= 0
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
                            bossAttackAnimationLength = {this.bossAttackAnimationLength}
                            bossWasHitAnimationLength = {this.bossWasHitAnimationLength}
                            stopAnimation = {() => this.setState({isBossAttacking: false})}
                        />
                    }

                    <CreateSlimeButton
                        active = {
                            this.getAliveSlimesQuantity() < this.maxSlimesQuantity &&
                            this.state.resourceAmount >= this.createSlimeValue &&
                            this.state.isUserHasControl
                        }
                        createSlimeValue = {this.createSlimeValue}
                        onClick = {this.state.isUserHasControl ? () => this.createSlime() : () => {}}
                    />

                    <div className = 'level_bar_wrapper slimes_quantity_bar' title = 'slimes quantity & power'>
                        <div className = {`level_bar_label slimes_quantity_label ${this.getSlimesQuantity()}`} />
                        <LevelBar
                            current = {this.getAliveSlimesQuantity()}
                            max = {this.maxSlimesQuantity}
                        />
                        {
                            this.isSlimesQuantityMaximum()
                            &&
                            <p className = 'player_power_multiplier'>
                                X {this.playerPowerMultiplier}
                            </p>
                        }
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
                        <div className = 'disable_actions' title = 'please wait...' />
                    }

                </div>
            </div>
        )
    }
}

export default App;