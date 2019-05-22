import CoordinateCalculator from "../CoordinateCalculator.js";
import GridBoardUI from "../GridBoardUI.js";

import Token from "./Token.js";

const NBSP = "\u00A0";
const NBSP4 = `${NBSP}${NBSP}${NBSP}${NBSP}`;

const cellClassFunction = (/* calculator, an, token */) => "ba b--black bw1 f2 pa1 tc v-mid";

const cellFunction = (calculator, an, token) => {
  const ch = Token.findCharByFenChar(token);

  return ch || token || NBSP4;
};

class ReversiBoardUI extends React.PureComponent {
  render() {
    const { tokens } = this.props;

    const calculator = new CoordinateCalculator(8, 8);

    return React.createElement(GridBoardUI, {
      backgroundColor: "Green",
      calculator,
      cellClassFunction,
      cellFunction,
      tokens
    });
  }
}

ReversiBoardUI.propTypes = {
  tokens: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ReversiBoardUI;
