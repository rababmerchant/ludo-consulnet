let dice = document.querySelector(".cube");
let diceface = document.getElementsByClassName("cube-face");
let currentClass = "";
let turn = "green";
let randNum;
let shouldMovePawn = false;
let canRoll = true;
let safePlaces = [5, 6, 39, 52, 65, 66, 32, 19]; //stops and starts ya safeplaces
const steps = document.getElementsByClassName("astep"); //all steps of ludo
// for (let i = 0; i < 72; i++) {
//   steps[i].textContent = i;
// }

const paths = {
  //yellow ka path
  yellow: [
    5, 8, 11, 14, 17, 36, 37, 38, 39, 40, 41, 47, 53, 52, 51, 50, 49, 48, 56,
    59, 62, 65, 68, 71, 70, 69, 66, 63, 60, 57, 54, 35, 34, 33, 32, 31, 30, 24,
    18, 19, 20, 21, 22, 23, 15, 12, 9, 6, 3, 0, 1, 4, 7, 10, 13, 16,
  ],

  //blue ka path
  blue: [
    52, 51, 50, 49, 48, 56, 59, 62, 65, 68, 71, 70, 69, 66, 63, 60, 57, 54, 35,
    34, 33, 32, 31, 30, 24, 18, 19, 20, 21, 22, 23, 15, 12, 9, 6, 3, 0, 1, 2, 5,
    8, 11, 14, 17, 36, 37, 38, 39, 40, 41, 47, 46, 45, 44, 43, 42,
  ],

  //red ka path
  red: [
    66, 63, 60, 57, 54, 35, 34, 33, 32, 31, 30, 24, 18, 19, 20, 21, 22, 23, 15,
    12, 9, 6, 3, 0, 1, 2, 5, 8, 11, 14, 17, 36, 37, 38, 39, 40, 41, 47, 53, 52,
    51, 50, 49, 48, 56, 59, 62, 65, 68, 71, 70, 67, 64, 61, 58, 55,
  ],

  //green ka path
  green: [
    19, 20, 21, 22, 23, 15, 12, 9, 6, 3, 0, 1, 2, 5, 8, 11, 14, 17, 36, 37, 38,
    39, 40, 41, 47, 53, 52, 51, 50, 49, 48, 56, 59, 62, 65, 68, 71, 70, 69, 66,
    63, 60, 57, 54, 35, 34, 33, 32, 31, 30, 24, 25, 26, 27, 28, 29,
  ],
};

const currPosition = {
  red: [-1, -1, -1, -1],
  blue: [-1, -1, -1, -1],
  yellow: [-1, -1, -1, -1],
  green: [-1, -1, -1, -1],
};

// dice rolling aur turn checking
function rollDice() {
  if (canRoll) {
    randNum = Math.ceil(Math.random() * 6);
    // randNum = 1;
    let showClass = "show-" + randNum;
    if (currentClass) {
      dice.classList.remove(currentClass);
    }
    dice.classList.add(showClass);
    currentClass = showClass;
    canRoll = false;
    decideNextTurn();
  }
}

function changeDiceColor(color) {
  for (const faces of diceface) {
    faces.style.backgroundColor = color;
  }
}

dice.addEventListener("click", rollDice);

function anyGotiBahirOrNot() {
  let flag = false;
  for (let i = 0; i < 4; i++) {
    if (currPosition[turn][i] != -1) {
      flag = true;
      break;
    }
  }
  return flag;
}

function decideNextTurn() {
  if (shouldMovePawn) {
    if (randNum != 6) {
      nextTurn();
    }
    canRoll = true;
    randNum = 0;
  } else if (randNum != 6 && !anyGotiBahirOrNot()) {
    nextTurn();
    canRoll = true;
    randNum = 0;
  }
  shouldMovePawn = false;
}

function nextTurn() {
  switch (turn) {
    case "green":
      // console.log(dice)
      changeDiceColor("yellow");
      turn = "yellow";
      console.log("its yellow's turn");
      break;
    case "yellow":
      changeDiceColor("blue");
      turn = "blue";
      console.log("its blue's turn");
      break;
    case "blue":
      changeDiceColor("red");
      turn = "red";
      console.log("its red's turn");
      break;
    case "red":
      changeDiceColor("green");
      turn = "green";
      console.log("its green's turn");
      break;
  }
}

function movePawn(color, num) {
  if (randNum == 0) {
    return;
  }
  goti = document.getElementById(color + num);
  let currentPosition = currPosition[color][num - 1];
  if (turn === color) {
    if (randNum == 6 && currentPosition === -1) {
      goti.style.display = "hidden";
      steps[paths[color][0]].appendChild(goti);
      currentPosition = 0;
      // safeSteps(color, currentPosition);
      currPosition[color][num - 1] = currentPosition;
      shouldMovePawn = true;
      canRoll = true;
    } else if (currentPosition != -1 && currentPosition < 52) {
      currentPosition += randNum;
      goti.style.display = "hidden";
      steps[paths[color][currentPosition]].appendChild(goti);
      currPosition[color][num - 1] = currentPosition;
      shouldMovePawn = true;
      pawnMove = true;
      canRoll = true;
      onKill(currentPosition);
    }
    decideNextTurn();
  }
}

function onKill(pos) {
  if (safePlaces.includes(paths[turn][pos])) {
    return;
  }

  for (const color in currPosition) {
    for (let i = 0; i < 4; i++) {
      if (
        color != turn &&
        paths[color][currPosition[color][i]] === paths[turn][pos]
      ) {
        let victim = document.getElementsByClassName(color + "" + i);
        victim.style.display = "hidden";
        let victimHome = document.getElementById(color+"Home"+i)
        victimHome.appendChild(victim);
        currPosition[color][i] = -1
        break;
      }
    }
  }
}

// goti-win ki logic yeh ha k agr currPosition = 52
// tw wo goti win kr jai aur currPosition update ho jai 52 se
// aur agr >52 k tw goti wahin pr rahae
function goti_win() {}

// winner ki logic yeh ha k agr kisi ki 4ron
// gotiyaan win kr jai tw uske home pr 1st likha aa jai
// aur baqi agr less than 2 players ho tw
// game finish ho jai
function winner() {}
