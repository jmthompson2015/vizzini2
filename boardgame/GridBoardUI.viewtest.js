import CoordinateCalculator from "./CoordinateCalculator.js";
import GridBoardUI from "./GridBoardUI.js";

const tokens1 = {
  a1: "X",
  b1: null,
  c1: null,
  a2: null,
  b2: "O",
  c2: null,
  a3: "X",
  b3: null,
  c3: null
};

const calculator1 = new CoordinateCalculator(3, 3);

const element1 = React.createElement(GridBoardUI, {
  calculator: calculator1,
  tokens: tokens1
});
ReactDOM.render(element1, document.getElementById("panel1"));

// /////////////////////////////////////////////////////////////////////////////////////////////////
const tokens2 = {
  a1: "A",
  b2: "B",
  a3: "A"
};

const cellClassFunction2 = (calculator, an, token) => "b--purple ba bw1 f3 pa2";

const calculator2 = new CoordinateCalculator(4, 3);

const element2 = React.createElement(GridBoardUI, {
  calculator: calculator2,
  tokens: tokens2,

  backgroundColor: "OliveDrab",
  cellClassFunction: cellClassFunction2,
  tableClass: "b--purple ba bw1 center tc"
});
ReactDOM.render(element2, document.getElementById("panel2"));
