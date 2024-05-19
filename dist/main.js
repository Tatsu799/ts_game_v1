"use strict";
window.addEventListener('load', init);
function init() {
    let textEle = document.querySelector('.text');
    let redBtn = document.querySelector('.red-button');
    let whiteBtn = document.querySelector('.white-button');
    ////temp
    let subText = document.querySelector('.sub-text'); //temp
    ///temp
    let redBtnText = document.querySelector('.redBtnText');
    let whiteBtnText = document.querySelector('.whiteBtnText');
    let stage = new createjs.Stage('canvas');
    const gameState = new GameState();
    console.log(gameState);
    textEle.addEventListener('click', () => {
        window.setTimeout(() => {
            const current = gameState.flagInstructions();
            window.setTimeout(() => {
                if (gameState.judgeFlag(gameState.currentFlagState, current)) {
                    gameState.updateCountGame();
                    gameState.updateScore();
                    // console.log(gameState.countGame);
                    // console.log(gameState.countScore);
                    console.log('正解！！');
                    subText.innerHTML = '正解'; /////temp
                }
                else {
                    console.log('不正解');
                    subText.innerHTML = '不正解';
                }
            }, 2900);
        }, 0);
        gameState.startInstructions();
    });
    const redButton = redBtn.addEventListener('click', () => {
        !gameState.redFlag ? (gameState.redFlag = true) : (gameState.redFlag = false);
        gameState.updateFlagState(gameState.redFlag, gameState.whiteFlag);
        console.log('push button', gameState.currentFlagState);
        redBtnText.innerHTML = gameState.redFlag ? '赤上がってる' : '赤下がってる'; ///temp text
    });
    const whiteButton = whiteBtn.addEventListener('click', () => {
        !gameState.whiteFlag ? (gameState.whiteFlag = true) : (gameState.whiteFlag = false);
        gameState.updateFlagState(gameState.redFlag, gameState.whiteFlag);
        console.log('push button', gameState.currentFlagState);
        whiteBtnText.innerHTML = gameState.whiteFlag ? '白上がってる' : '白下がってる'; ///temp text
    });
}
class GameState {
    constructor() {
        this.Instructions = {
            0: '赤上げて', //true r
            1: '赤下げて', //false r
            2: '白上げて', //true w
            3: '白下げて', // false w
            4: '赤上げて白上げない', //true r, false w
            5: '赤上げて白上げる', // true r, true w
            6: '赤上げないで白上げない', //false r, false w
            7: '赤上げないで白上げる', // false r, true w
            8: '白上げて赤上げない', // false r, true w
            9: '白上げて赤上げる', // true r, true w
            10: '白上げないで赤上げない', // false r, false w
            11: '白上げないで赤上げる', // true r, false
        };
        this.redFlag = false;
        this.whiteFlag = false;
        this.currentFlagState = [this.redFlag, this.whiteFlag];
        this.countGame = 0;
        this.countScore = 0;
    }
    updateFlagState(redFlag, whiteFlag) {
        this.currentFlagState = [redFlag, whiteFlag];
    }
    updateCountGame() {
        this.countGame++;
    }
    updateScore() {
        this.countScore += 10;
    }
    getResult() { }
    getRandomNumber() {
        let min = 0;
        let max = 4;
        return Math.floor(Math.random() * (max - min) + min);
    }
    flagInstructions() {
        const textEle = document.querySelector('.text');
        const random = this.getRandomNumber();
        // const random = 11;
        textEle.innerHTML = '';
        textEle.innerHTML = this.Instructions[random];
        console.log(this.Instructions[random]);
        return this.Instructions[random];
    }
    startInstructions() {
        let text = document.querySelector('.sub-text'); //temp
        const timeIntervalId = window.setInterval(() => {
            console.log('実行');
            const current = this.flagInstructions();
            const timeOutId = window.setTimeout(() => {
                if (this.judgeFlag(this.currentFlagState, current)) {
                    console.log('正解！！');
                    text.innerHTML = '正解'; /////temp
                    this.updateCountGame();
                    this.updateScore();
                    // console.log(this.countGame);
                    // console.log(this.countScore);
                }
                else {
                    clearTimeout(timeOutId);
                    clearTimeout(timeIntervalId);
                    console.log('不正解');
                    text.innerHTML = '不正解'; /////temp
                }
            }, 2900);
        }, 3000);
    }
    judgeFlag(currentFlagState, currentInstructions) {
        let result = false;
        switch (currentInstructions) {
            case '赤上げて':
                currentFlagState[0] === true ? (result = true) : (result = false);
                break;
            case '赤下げて':
                currentFlagState[0] === false ? (result = true) : (result = false);
                break;
            case '白上げて':
                currentFlagState[1] === true ? (result = true) : (result = false);
                break;
            case '白下げて':
                currentFlagState[1] === false ? (result = true) : (result = false);
                break;
            case '赤上げて白上げない':
                currentFlagState[0] === true && currentFlagState[1] === false ? (result = true) : (result = false);
                break;
            case '赤上げて白上げる':
                currentFlagState[0] === true && currentFlagState[1] === true ? (result = true) : (result = false);
                break;
            case '赤上げないで白上げない':
                currentFlagState[0] === false && currentFlagState[1] === false ? (result = true) : (result = false);
                break;
            case '赤上げないで白上げる':
                currentFlagState[0] === false && currentFlagState[1] === true ? (result = true) : (result = false);
                break;
            case '白上げて赤上げない':
                currentFlagState[0] === false && currentFlagState[1] === true ? (result = true) : (result = false);
                break;
            case '白上げて赤上げる':
                currentFlagState[0] === true && currentFlagState[1] === true ? (result = true) : (result = false);
                break;
            case '白上げないで赤上げない':
                currentFlagState[0] === false && currentFlagState[1] === false ? (result = true) : (result = false);
                break;
            case '白上げないで赤上げる':
                currentFlagState[0] === true && currentFlagState[1] === false ? (result = true) : (result = false);
                break;
        }
        return result;
    }
}
//# sourceMappingURL=main.js.map