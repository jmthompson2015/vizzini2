import Constants from "../model/Constants.js";

import CellUI from "./CellUI.js";

const element0 = React.createElement(CellUI, {
    index: 0,
    token: "O",
    backgroundColor: "green",
    constants: Constants
});
ReactDOM.render(element0, document.getElementById("panel0"));

const element1 = React.createElement(CellUI, {
    index: 1,
    token: "X",
    backgroundColor: "green",
    constants: Constants
});
ReactDOM.render(element1, document.getElementById("panel1"));

const element2 = React.createElement(CellUI, {
    index: 2,
    token: null,
    backgroundColor: "green",
    constants: Constants
});
ReactDOM.render(element1, document.getElementById("panel2"));
