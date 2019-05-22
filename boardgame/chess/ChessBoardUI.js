import CoordinateCalculator from "../CoordinateCalculator.js";
import GridBoardUI from "../GridBoardUI.js";

import Token from "./Token.js";

const NBSP = "\u00A0";

const isEven = value => value % 2 === 0;
const isOdd = value => !isEven(value);
const isUpperCase = value => value && value.toUpperCase() === value;
const bothEven = (a, b) => isEven(a) && isEven(b);
const bothOdd = (a, b) => isOdd(a) && isOdd(b);

const cellClassFunction = (calculator, an, token) => {
  let answer = "ba b--black bw1 f2 pa1";

  if (isUpperCase(token)) {
    answer += " white";
  }

  const file = calculator.anToFile(an);
  const rank = calculator.anToRank(an);

  if (bothEven(file, rank) || bothOdd(file, rank)) {
    answer += " bg-green";
  }

  return answer;
};

const cellFunction = (calculator, an, token) => {
  const ch = Token.findCharByFenChar(token);

  return ch || token || NBSP;
};

class ChessBoardUI extends React.PureComponent {
  render() {
    const { tokens } = this.props;

    const calculator = new CoordinateCalculator(8, 8);

    return React.createElement(GridBoardUI, {
      backgroundColor: "LightGray",
      calculator,
      cellClassFunction,
      cellFunction,
      tokens
    });
  }
}

ChessBoardUI.propTypes = {
  tokens: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ChessBoardUI;
