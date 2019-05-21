import CoordinateCalculator from "../CoordinateCalculator.js";
import GridBoardUI from "../GridBoardUI.js";

import Token from "./Token.js";

const isEven = value => value % 2 === 0;
const isOdd = value => !isEven(value);
const bothEven = (a, b) => isEven(a) && isEven(b);
const bothOdd = (a, b) => isOdd(a) && isOdd(b);

const cellClassFunction = (calculator, an /* , token */) => {
  let answer = "b--yellow ba bw1 pa1";

  const file = calculator.anToFile(an);
  const rank = calculator.anToRank(an);
  answer += bothEven(file, rank) || bothOdd(file, rank) ? " bg-dark-gray" : " bg-red";

  return answer;
};

const size = 60;

const cellFunction = (calculator, an, token) => {
  const src = Token.findImageByFenChar(token);

  if (src) {
    return ReactDOMFactories.img({ src, width: size, height: size });
  }

  return ReactDOMFactories.img({ src: "empty.png", width: size, height: size });
};

class CheckerBoardUI extends React.PureComponent {
  render() {
    const { tokens } = this.props;

    const calculator = new CoordinateCalculator(8, 8);

    return React.createElement(GridBoardUI, {
      calculator,
      cellClassFunction,
      cellFunction,
      tokens,
      tableClass: "b--yellow ba bw1 center tc white"
    });
  }
}

CheckerBoardUI.propTypes = {
  tokens: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default CheckerBoardUI;
