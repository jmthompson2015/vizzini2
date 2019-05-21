import CheckerBoardUI from "./CheckerBoardUI.js";

const tokens1 = {
  a1: "p",
  c1: "p",
  e1: "p",
  g1: "p",

  b2: "p",
  d2: "p",
  f2: "p",
  h2: "p",

  a3: "k",
  c3: "p",
  e3: "p",
  g3: "p",

  b6: "K",
  d6: "P",
  f6: "P",
  h6: "P",

  a7: "P",
  c7: "P",
  e7: "P",
  g7: "P",

  b8: "P",
  d8: "P",
  f8: "P",
  h8: "P"
};

const element1 = React.createElement(CheckerBoardUI, { tokens: tokens1 });
ReactDOM.render(element1, document.getElementById("board"));
