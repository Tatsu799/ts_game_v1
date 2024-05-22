window.addEventListener('load', init);
function init() {
  let textEle = <HTMLElement>document.querySelector('.text');
  let redBtn = <HTMLButtonElement>document.querySelector('.red-button');
  let whiteBtn = <HTMLButtonElement>document.querySelector('.white-button');

  ////temp
  let subText = <HTMLElement>document.querySelector('.sub-text'); //temp
  ///temp

  let redBtnText = <HTMLElement>document.querySelector('.redBtnText');
  let whiteBtnText = <HTMLElement>document.querySelector('.whiteBtnText');

  let stage = new createjs.Stage('canvas');

  const gameState: GameState = new GameState();
  console.log(gameState);

  const textEle1 = <HTMLElement>document.querySelector('.text');

  textEle.addEventListener('click', () => {
    // window.setTimeout(() => {
    //   const current = gameState.flagInstructions();
    //   window.setTimeout(() => {
    //     if (gameState.judgeFlag(gameState.currentFlagState, current)) {
    //       gameState.updateCountGame();
    //       gameState.updateScore();
    //       console.log(gameState.countGame);
    //       // console.log(gameState.countScore);
    //       console.log('正解！！');
    //       subText.innerHTML = '正解'; /////temp
    //     } else {
    //       console.log('不正解');
    //       subText.innerHTML = '不正解';
    //     }
    //   }, 2900);
    // }, 0);

    ///////////////////////　参考
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(() => resolve(ms), ms));
    sleep(0)
      .then(() => {
        console.log(1);
        gameState.firstMove(); //////////////////////
        // return sleep(1000);
      })
      .then(() => {
        console.log(2);
        gameState.startInstructions(gameState);
        // return sleep(3000);
      });
    ///////////////////////　参考///////////////////////https://qiita.com/knaot0/items/af0a38cc916176cdd50f

    // gameState.firstMove(); //////////////////////
    // gameState.startInstructions(gameState); //////////////////////;
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
  redFlag: boolean;
  whiteFlag: boolean;
  currentFlagState: boolean[];
  countGame: number;
  countScore: number;
  time: number;
  Instructions: { [index: number]: string } = {
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
  constructor() {
    this.redFlag = false;
    this.whiteFlag = false;
    this.currentFlagState = [this.redFlag, this.whiteFlag];
    this.countGame = 0;
    this.countScore = 0;
    this.time = 3500;
  }

  //////////////////////
  firstMove() {
    const textEle1 = <HTMLElement>document.querySelector('.text');
    setTimeout(() => {
      textEle1.innerHTML = '赤あげる';
    }, 0);
    setTimeout(() => {
      textEle1.innerHTML = '白あげる';
    }, 500);
    setTimeout(() => {
      textEle1.innerHTML = '赤さげる';
    }, 1000);
    setTimeout(() => {
      textEle1.innerHTML = '白さげる';
      // gameState.startInstructions(gameState);
    }, 1500);
  }
  //////////////////////

  updateFlagState(redFlag: boolean, whiteFlag: boolean) {
    this.currentFlagState = [redFlag, whiteFlag];
  }

  updateCountGame() {
    this.countGame++;
  }

  updateScore() {
    this.countScore += 10;
  }

  resetData(gameState: GameState) {
    gameState.countGame = 0;
    gameState.countScore = 0;
  }

  getResult() {}

  getRandomNumber() {
    let min: number = 0;
    let max: number = 4;

    if (this.countGame < 10) {
      return Math.floor(Math.random() * (max - min) + min);
    } else {
      max = 11;
      return Math.floor(Math.random() * (max - min) + min);
    }
  }

  flagInstructions(): string {
    const textEle = <HTMLElement>document.querySelector('.text');
    const random = this.getRandomNumber();
    // const random = 11;

    textEle.innerHTML = '';
    textEle.innerHTML = this.Instructions[random];
    console.log(this.Instructions[random]);

    return this.Instructions[random];
  }

  //////////////////////
  startInstructions(gameState: GameState) {
    let text = <HTMLElement>document.querySelector('.sub-text'); //temp
    let timeIntervalId = window.setInterval(() => {
      const current = gameState.flagInstructions();
      console.log('interval 発火');

      //////ここにゲーにをいれれはいけるのか？？？
      console.log('ゲージ発火');
      const timeOutId = window.setTimeout(() => {
        console.log('timeout 発火');
        console.log('ゲージ終了');
        if (gameState.judgeFlag(gameState.currentFlagState, current)) {
          console.log('正解！！');
          text.innerHTML = '正解'; /////temp
          gameState.updateCountGame();
          gameState.updateScore();
          // console.log(gameState.countGame);
          // console.log(gameState.countScore);
          // console.log(gameState.time);

          //////////////////////
          if (gameState.countGame === 3) {
            gameState.time = 2000;
          }
          if (gameState.countGame === 5) {
            gameState.time = 1000;
          }

          //////////////////////
        } else {
          // clearTimeout(timeOutId);いらないはず
          // clearTimeout(timeIntervalId);
          // timeIntervalId = 0;S

          console.log('不正解');
          text.innerHTML = '不正解'; /////temp
        }
      }, gameState.time - 500); //////////////////////
    }, gameState.time); //////////////////////
  }

  //////////////////////

  judgeFlag(currentFlagState: boolean[], currentInstructions: string) {
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
