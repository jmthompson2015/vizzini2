import CellUI from "./CellUI.js";
import CoordinateCalculator from "../CoordinateCalculator.js";
import GridBoardUI from "../GridBoardUI.js";

import Token from "./Token.js";

const cellClassFunction = (calculator, an, token) => {
  const file = calculator.anToFile(an);
  const rank = calculator.anToRank(an);
  let answer = "";

  if (file > 1 && rank < 3) {
    answer = "bl bt bw2";
  } else if (file > 1) {
    answer = "bl bw2";
  } else if (rank < 3) {
    answer = "bt bw2";
  }

  return answer;
};

const cellFunction = (calculator, an, token) =>
  React.createElement(CellUI, { an, backgroundColor: null, token });

class TTTBoardUI extends React.PureComponent {
  render() {
    const { tokens } = this.props;

    const calculator = new CoordinateCalculator(3, 3);

    return React.createElement(GridBoardUI, {
      calculator,
      cellClassFunction,
      cellFunction,
      tokens,
      tableClass: "center tc"
    });
  }
}

TTTBoardUI.propTypes = {
  tokens: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default TTTBoardUI;
