import BoardUI from "../BoardUI.js";
import CoordinateCalculator from "../CoordinateCalculator.js";

const IS_SQUARE = true;
const IS_FLAT = true;

const calculator = new CoordinateCalculator(8, 8);

const drawTokenFunction = (context0, center, size, an, token) => {
  const context = context0;
  context.save();

  let ch = an;
  context.textAlign = "center";
  context.textBaseline = "middle";

  if (token) {
    ch = token.char;
    context.font = "48px serif";
    const offset = 5;
    context.strokeText(ch, center.x, center.y + offset);
  } else {
    context.fillStyle = "Black";
    context.font = "16px serif";
    context.fillText(ch, center.x, center.y);
  }
  context.restore();
};

const cellColorFunction = () => "Green";

class ReversiBoardUI extends React.PureComponent {
  render() {
    const { anToTokens, myKey } = this.props;

    return React.createElement(BoardUI, {
      anToTokens,
      calculator,
      drawTokenFunction,

      backgroundColor: "White",
      cellColorFunction,
      gridLineWidth: 3,
      isFlat: IS_FLAT,
      isSquare: IS_SQUARE,
      myKey
    });
  }
}

ReversiBoardUI.propTypes = {
  anToTokens: PropTypes.arrayOf(PropTypes.string).isRequired,

  myKey: PropTypes.string
};

ReversiBoardUI.defaultProps = {
  myKey: "squareBoardCanvas"
};

export default ReversiBoardUI;
