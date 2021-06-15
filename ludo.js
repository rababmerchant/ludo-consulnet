let dice = document.querySelector(".cube");
let diceface = document.getElementsByClassName("cube-face");
let currentClass = "";
let turn = "green";
let randNum;
let shouldMovePawn = false;
let canRoll = true;
let safePlaces = [5, 6, 39, 52, 65, 66, 32, 19]; //stops and starts ya safeplaces
const steps = document.getElementsByClassName("astep"); //all steps of ludo
let kill = false;
let winGoti = false;
let winner = [];
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
  // red: [5, -1, -1, -1],
  // blue: [17, -1, -1, -1],
  red: [-1, -1, -1, -1],
  blue: [-1, -1, -1, -1],
  yellow: [-1, -1, -1, -1],
  green: [-1, -1, -1, -1],
};

// steps[paths["red"][5]].appendChild(document.getElementById("red1"));
// steps[paths["blue"][17]].appendChild(document.getElementById("blue1"));

function changeDiceColor(color) {
  for (const faces of diceface) {
    faces.style.backgroundColor = color;
  }
}

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

dice.addEventListener("click", rollDice);

function anyGotiBahirOrNot() {
  let flag = false;
  for (let i = 0; i < 4; i++) {
    if (currPosition[turn][i] != -1 || currPosition[turn][i] != 56) {
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
  } else if (winGoti) {
    if (win[turn] === 4) {
      // yahan pr winner declare krna ha
    }
    winGoti = false;
    canRoll = true;
    randNum = 0;
  }
  shouldMovePawn = false;
}

function nextTurn() {
  switch (turn) {
    case "green":
      changeDiceColor("yellow");
      turn = "yellow";
      diceface.addEventListener('transitionend', function() {
        
      });
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
      currPosition[color][num - 1] = currentPosition;
      shouldMovePawn = true;
      canRoll = true;
    } else if (currentPosition != -1 && currentPosition < 56) {
      currentPosition += randNum;
      if (currentPosition < 56) {
        goti.style.display = "hidden";
        steps[paths[color][currentPosition]].appendChild(goti);
        shouldMovePawn = true;
        pawnMove = true;
        canRoll = true;
        onKill(currentPosition);
      } else if (currentPosition === 56) {
        goti_win(currentPosition);
        canRoll = true;
      }
      currPosition[color][num - 1] = currentPosition;
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
        let victim = document.getElementById(color + "" + (i + 1));
        console.log(victim);
        victim.style.display = "hidden";
        let victimHome = document.getElementById(color + "Home" + (i + 1));
        victimHome.appendChild(victim);
        currPosition[color][i] = -1;
        kill = true;
        shouldMovePawn = false;
        return;
      }
    }
  }
}

let win = {
  red: 0,
  blue: 0,
  green: 0,
  yellow: 0,
};

// steps[paths["red"][55]].appendChild(document.getElementById("red1"));
// steps[paths["red"][55]].appendChild(document.getElementById("red2"));
// steps[paths["red"][55]].appendChild(document.getElementById("red3"));
// steps[paths["red"][55]].appendChild(document.getElementById("red4"));

// steps[paths["blue"][55]].appendChild(document.getElementById("blue1"));
// steps[paths["blue"][55]].appendChild(document.getElementById("blue2"));
// steps[paths["blue"][55]].appendChild(document.getElementById("blue3"));
// steps[paths["blue"][55]].appendChild(document.getElementById("blue4"));

// steps[paths["green"][55]].appendChild(document.getElementById("green1"));
// steps[paths["green"][55]].appendChild(document.getElementById("green2"));
// steps[paths["green"][55]].appendChild(document.getElementById("green3"));
// steps[paths["green"][55]].appendChild(document.getElementById("green4"));

// goti-win ki logic yeh ha k agr currPosition = 55
// tw wo goti win kr jai aur currPosition update ho jai 52 se
// aur agr >52 k tw goti wahin pr rahae

function goti_win(position) {
  if (position == 56) {
    goti.style.display = "hidden";
    winPosition = document.getElementById(turn + "-triangle");
    winPosition.appendChild(goti);
    goti.style.position = "absolute";
    decideWinPosition(turn);
    position = 56;
    win[turn] += 1;
    console.log(win[turn]);
    shouldMovePawn = false;
    winGoti = true;
    // checkWinner();
  }
}

function decideWinPosition(color) {
  switch (color) {
    case "red":
      goti.style.bottom = "-81px";
      goti.style.right = "-29px";
      break;

    case "yellow":
      goti.style.bottom = "29px";
      goti.style.right = "-25px";
      break;

    case "green":
      goti.style.bottom = "-24px";
      goti.style.right = "30px";
      break;

    case "blue":
      goti.style.bottom = "-28px";
      goti.style.left = "39px";
      break;
  }
}

// winner ki logic yeh ha k agr kisi ki 4ron
// gotiyaan win kr jai tw uske home pr 1st likha aa jai
// aur baqi agr less than 2 players ho tw
// game finish ho jai
// function checkWinner() {
//   for (const color in win) {
//     if (win[color] === 4) {
//       winner.push(color);
//     }
//   }
//   if (winner.length === 3) {
// yahan pr points chat lagana ha
//   }
// }