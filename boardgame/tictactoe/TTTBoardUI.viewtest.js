import Token from "./Token.js";
import TTTBoardUI from "./TTTBoardUI.js";

const tokens = {
  a1: Token.X,
  b1: null,
  c1: null,
  a2: null,
  b2: Token.O,
  c2: null,
  a3: Token.X,
  b3: null,
  c3: null
};

const element = React.createElement(TTTBoardUI, { tokens });
ReactDOM.render(element, document.getElementById("board"));
