import CoordinateCalculator from "../CoordinateCalculator.js";
import GridBoardUI from "../GridBoardUI.js";

import Token from "./Token.js";

const cellClassFunction = (calculator, an, token) => {
  let answer = "ba b--black bw1 pa1 v-mid";

  if (token) {
    answer += " f2";
  }

  if (token === "P") {
    answer += " white";
  }

  return answer;
};

const cellFunction = (calculator, an, token) => {
  const ch = Token.findCharByFenChar(token);

  return ch || token || an;
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
