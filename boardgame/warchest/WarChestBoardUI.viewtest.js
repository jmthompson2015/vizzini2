import Token from "./Token.js";
import WarChestBoardUI from "./WarChestBoardUI.js";

const RAVEN = Token.properties[Token.RAVEN];
const WOLF = Token.properties[Token.WOLF];
const ARCHER = Token.properties[Token.ARCHER];
const CAVALRY = Token.properties[Token.CAVALRY];
const PIKEMAN = Token.properties[Token.PIKEMAN];
const SWORDSMAN = Token.properties[Token.SWORDSMAN];

const anToTokens = {
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

const element = React.createElement(WarChestBoardUI, { anToTokens });
ReactDOM.render(element, document.getElementById("board"));
