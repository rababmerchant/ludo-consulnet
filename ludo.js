let dice = document.querySelector(".cube");
let diceface = document.getElementsByClassName("cube-face");
let currentClass = "";
let turn = "green";
let randNum;
let shouldMovePawn = false;
let canRoll = true;
let safePlaces = [5, 6, 39, 52, 65, 66, 32, 19]; //stops and starts ya safeplaces
let a = 0;
const steps = document.getElementsByClassName("astep"); //all steps of ludo

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
  // randNum = Math.ceil(Math.random() * 6);
  if (canRoll) {
    randNum = a % 2 == 0 ? 6 : 5;
    let showClass = "show-" + randNum;
    if (currentClass) {
      dice.classList.remove(currentClass);
    }
    dice.classList.add(showClass);
    currentClass = showClass;
    a++;
    if(randNum != 6){
      canRoll = true;
    }
    canRoll = false;
  }
}

dice.addEventListener("click", rollDice);

function decideNextTurn() {
  if (shouldMovePawn && randNum != 6) {
    nextTurn(turn);
  }
  shouldMovePawn = false;
  randNum = 0;
}

function nextTurn() {
    switch (turn) {
      case "green":
        // diceface.style.backgroundColor = "yellow";
        turn = "yellow";
        console.log("its yellow's turn");
        break;
      case "yellow":
        // diceface.style.backgroundColor = "blue";
        turn = "blue";
        console.log("its blue's turn");
        break;
      case "blue":
        // diceface.style.backgroundColor = "red";
        turn = "red";
        console.log("its red's turn");
        break;
      case "red":
        // diceface.style.backgroundColor = "green";
        turn = "green";
        console.log("its green's turn");
        break;
    }
}

function movePawn(color, num) {
  let goti = document.getElementById(color + num);
  let currentPosition = currPosition[color][num - 1];
  console.log("Button Pressed");
  console.log(randNum);
  if (turn === color) {
    if (randNum == 6 && currentPosition === -1) {
      goti.style.display = "hidden";
      steps[paths[color][0]].appendChild(goti);
      currentPosition = 0;
      // safeSteps(currPosition);
      currPosition[color][num - 1] = currentPosition;
      shouldMovePawn = true;
      canRoll = true;

    } else if (currentPosition != -1 && currentPosition < 52) {
      currentPosition += randNum;
      goti.style.display = "hidden";
      onKill(goti, currentPosition);
      steps[paths[color][currentPosition]].appendChild(goti);
      currPosition[color][num - 1] = currentPosition;
      shouldMovePawn = true;
      pawnMove = true;
      canRoll = true;
    }
    decideNextTurn();
  }
  
}



function safeSteps(position) {
  img = document.querySelector("img");
  for (const safes in safePlaces) {
    if (steps[safes] === position) {
      img.style.display = "none";
      return true;
    }
    return false;
  }
}

// logic yeh ha k jo goti chl rahi hogi wo jahan rukae
// uske parent ko pkroo
// check kroo k kya parent k andr koi aur goti ha agr han
// to uska color check kroo aur agr same nahi ha aanae wali goti k color se
// aur safeplaces pr bhi nahi ha tw
// to remove krdou

function onKill(goti, position) {
  let step = goti.parentNode;
  let victim;
  if (step.hasChildNodes()) {
    victim = step.firstChild;
    if (victim.color != goti.color && !safeSteps(position)) {
      step = step.removeChild(victim);
      // .appendChild(victim)
      // position = -1
    }
  } else {
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
