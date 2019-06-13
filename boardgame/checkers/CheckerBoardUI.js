import BoardCalculator from "../BoardCalculator.js";
import BoardUI from "../BoardUI.js";
import CoordinateCalculator from "../CoordinateCalculator.js";

import Token from "./Token.js";

const images = R.map(R.prop("image"), Token.values());

const IS_SQUARE = true;
const IS_FLAT = true;

const isEven = value => value % 2 === 0;
const isOdd = value => !isEven(value);
const bothEven = (a, b) => isEven(a) && isEven(b);
const bothOdd = (a, b) => isOdd(a) && isOdd(b);

const boardCalculator = new BoardCalculator(IS_SQUARE, IS_FLAT);
const calculator = new CoordinateCalculator(8, 8);

const drawTokenFunction = (context, center, size, an, token, imageMap) => {
  if (token) {
    const corners = boardCalculator.computeCorners(center, size);
    const img = imageMap[token.image];

    if (img) {
      BoardCalculator.drawCircularImage(context, corners, img);
    }
  }
};

const cellColorFunction = an => {
  const file = calculator.anToFile(an);
  const rank = calculator.anToRank(an);

  return bothEven(file, rank) || bothOdd(file, rank) ? "hsl(0,0%,20%)" : "Red";
};

class CheckerBoardUI extends React.PureComponent {
  render() {
    const { anToTokens, myKey } = this.props;

    return React.createElement(BoardUI, {
      anToTokens,
      calculator,
      drawTokenFunction,

      backgroundColor: "White",
      cellColorFunction,
      gridColor: "Yellow",
      gridLineWidth: 3,
      images,
      isFlat: IS_FLAT,
      isSquare: IS_SQUARE,
      myKey
    });
  }
}

CheckerBoardUI.propTypes = {
  anToTokens: PropTypes.arrayOf(PropTypes.string).isRequired,

  myKey: PropTypes.string
};

CheckerBoardUI.defaultProps = {
  myKey: "squareBoardCanvas"
};

export default CheckerBoardUI;
