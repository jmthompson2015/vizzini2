import CoordinateCalculator from "./CoordinateCalculator.js";
import HexBoardUI from "./HexBoardUI.js";

const drawTokenFunction = (context0, center, an, token) => {
  const context = context0;
  context.save();
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = "24px serif";
  context.fillText(token || an, center.x, center.y);
  context.restore();
};

const anToTokens1 = {
  a1: "X",
  d1: "Y",
  b2: "Z",
  c3: "X"
};
const size = 100;
const calculator1 = new CoordinateCalculator(3, 4);

const element1 = React.createElement(HexBoardUI, {
  calculator: calculator1,
  drawTokenFunction,
  anToTokens: anToTokens1,

  myKey: "hexPanel1",
  height: 4 * size,
  width: 3 * size
});
ReactDOM.render(element1, document.getElementById("panel1"));

// /////////////////////////////////////////////////////////////////////////////////////////////////
const anToTokens2 = {
  a1: "X",
  d1: "Y",
  b2: "Z",
  c3: "X"
};
const calculator2 = new CoordinateCalculator(4, 3);

const element2 = React.createElement(HexBoardUI, {
  calculator: calculator2,
  drawTokenFunction,
  anToTokens: anToTokens2,

  backgroundColor: "OliveDrab",
  gridColor: "Maroon",
  gridLineWidth: 5,
  isFlat: false,
  myKey: "hexPanel2",
  height: 3 * size,
  width: 4 * size
});
ReactDOM.render(element2, document.getElementById("panel2"));
