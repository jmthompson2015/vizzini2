import Token from "./Token.js";
import WarChestBoardUI from "./WarChestBoardUI.js";

const RAVEN = Token.properties[Token.RAVEN];
const WOLF = Token.properties[Token.WOLF];
const ARCHER = Token.properties[Token.ARCHER];
const CAVALRY = Token.properties[Token.CAVALRY];
const CROSSBOWMAN = Token.properties[Token.CROSSBOWMAN];
const LANCER = Token.properties[Token.LANCER];
const PIKEMAN = Token.properties[Token.PIKEMAN];
const SWORDSMAN = Token.properties[Token.SWORDSMAN];

const anToTokens1 = {
  d7: WOLF,
  e2: RAVEN,
  e3: SWORDSMAN,
  e5: [WOLF, LANCER, LANCER],
  e6: CAVALRY,
  f4: ARCHER,
  g3: [RAVEN, CROSSBOWMAN, CROSSBOWMAN],
  g6: WOLF,
  h1: RAVEN,
  h2: PIKEMAN
};

const element1 = React.createElement(WarChestBoardUI, {
  anToTokens: anToTokens1,
  myKey: "hexPanel1"
});
ReactDOM.render(element1, document.getElementById("board1"));

// /////////////////////////////////////////////////////////////////////////////////////////////////
const anToTokens2 = {
  b5: RAVEN,
  d7: WOLF,
  e2: RAVEN,
  e3: SWORDSMAN,
  e6: CAVALRY,
  f4: ARCHER,
  g6: WOLF,
  h1: RAVEN,
  h2: PIKEMAN,
  j3: WOLF
};

const element2 = React.createElement(WarChestBoardUI, {
  anToTokens: anToTokens2,
  myKey: "hexPanel2",
  isTwoPlayer: false
});
ReactDOM.render(element2, document.getElementById("board2"));
