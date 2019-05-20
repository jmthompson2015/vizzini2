import ChessBoardUI from "./ChessBoardUI.js";

const tokens1 = {
  a1: "R",
  b1: "N",
  c1: "B",
  d1: "Q",
  e1: "K",
  f1: "B",
  g1: "N",
  h1: "R",
  a2: "P",
  b2: "P",
  c2: "P",
  d2: "P",
  e2: "P",
  f2: "P",
  g2: "P",
  h2: "P",
  a7: "p",
  b7: "p",
  c7: "p",
  d7: "p",
  e7: "p",
  f7: "p",
  g7: "p",
  h7: "p",
  a8: "r",
  b8: "n",
  c8: "b",
  d8: "q",
  e8: "k",
  f8: "b",
  g8: "n",
  h8: "r"
};

const element1 = React.createElement(ChessBoardUI, { tokens: tokens1 });
ReactDOM.render(element1, document.getElementById("board"));