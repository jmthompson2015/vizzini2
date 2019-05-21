import ReversiBoardUI from "./ReversiBoardUI.js";

const tokens1 = {
  d4: "p",
  e4: "P",
  d5: "P",
  e5: "p"
};

const element1 = React.createElement(ReversiBoardUI, { tokens: tokens1 });
ReactDOM.render(element1, document.getElementById("board"));
