import CoordinateCalculator from "../CoordinateCalculator.js";
import GridBoardUI from "../GridBoardUI.js";

import Token from "./Token.js";

const isEven = value => value % 2 === 0;
const isOdd = value => !isEven(value);
const bothEven = (a, b) => isEven(a) && isEven(b);
const bothOdd = (a, b) => isOdd(a) && isOdd(b);

const cellClassFunction = (calculator, an, token) => {
  const file = calculator.anToFile(an);
  const rank = calculator.anToRank(an);
  let answer = "ba bw1 pa1";

  if (token) {
    answer += " f2";
  }

  if (bothEven(file, rank) || bothOdd(file, rank)) {
    answer += " bg-green";
  }

  return answer;
};

const cellFunction = (calculator, an, token) => {
  const ch = Token.findCharByFenChar(token);

  return ch || token || an;
};

class ChessBoardUI extends React.PureComponent {
  render() {
    const { tokens } = this.props;

    const calculator = new CoordinateCalculator(8, 8);

    return React.createElement(GridBoardUI, {
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
