import CoordinateCalculator from "./CoordinateCalculator.js";
import BoardUI from "./BoardUI.js";

const drawTokenFunction = (context0, center, an, token) => {
  const context = context0;
  context.save();
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = "24px serif";
  context.fillText(token || an, center.x, center.y);
  context.restore();
};

// /////////////////////////////////////////////////////////////////////////////////////////////////
const anToTokens1 = {
  a1: "X",
  d1: "Y",
  b2: "Z",
  c3: "X"
};
const size = 100;
const calculator1 = new CoordinateCalculator(3, 4);

const element1 = React.createElement(BoardUI, {
  anToTokens: anToTokens1,
  calculator: calculator1,
  drawTokenFunction,

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

const element2 = React.createElement(BoardUI, {
  anToTokens: anToTokens2,
  calculator: calculator2,
  drawTokenFunction,

  backgroundColor: "OliveDrab",
  gridColor: "Maroon",
  gridLineWidth: 5,
  myKey: "hexPanel2",
  height: 3 * size,
  isFlat: false,
  width: 4 * size
});
ReactDOM.render(element2, document.getElementById("panel2"));

// /////////////////////////////////////////////////////////////////////////////////////////////////
const anToTokens3 = {
  a1: "X",
  d1: "Y",
  b2: "Z",
  c3: "X"
};
const calculator3 = new CoordinateCalculator(3, 4);

const element3 = React.createElement(BoardUI, {
  anToTokens: anToTokens3,
  calculator: calculator3,
  drawTokenFunction,

  myKey: "hexPanel3",
  height: 4 * size,
  isSquare: false,
  width: 3 * size
});
ReactDOM.render(element3, document.getElementById("panel3"));

// /////////////////////////////////////////////////////////////////////////////////////////////////
const anToTokens4 = {
  a1: "X",
  d1: "Y",
  b2: "Z",
  c3: "X"
};
const calculator4 = new CoordinateCalculator(4, 3);

const element4 = React.createElement(BoardUI, {
  anToTokens: anToTokens4,
  calculator: calculator4,
  drawTokenFunction,

  backgroundColor: "OliveDrab",
  gridColor: "Maroon",
  gridLineWidth: 5,
  isFlat: false,
  isSquare: false,
  myKey: "hexPanel4",
  height: 3 * size,
  width: 4 * size
});
ReactDOM.render(element4, document.getElementById("panel4"));
