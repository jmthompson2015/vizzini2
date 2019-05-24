// see https://www.redblobgames.com/grids/hexagons/
import HBUtils from "./HexBoardUtilities.js";

const DEG_TO_RAD = Math.PI / 180.0;
const COS30 = Math.cos(30.0 * DEG_TO_RAD);
const COS60 = Math.cos(60.0 * DEG_TO_RAD);

class HexBoardUI extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.paint();
  }

  componentDidUpdate() {
    this.paint();
  }

  computeCenter(f, r) {
    const { gridLineWidth, isFlat } = this.props;

    const size = this.computeSize();
    const hex = HBUtils.createHex({ q: f, r });
    const dim = isFlat ? HBUtils.flatHexDimensions(size) : HBUtils.pointyHexDimensions(size);
    const offset = HBUtils.createPoint({
      x: (gridLineWidth + dim.w) / 2.0,
      y: (gridLineWidth + dim.h) / 2.0
    });

    return isFlat
      ? HBUtils.flatHexToPixel(hex, size, offset)
      : HBUtils.pointyHexToPixel(hex, size, offset);
  }

  computeSize() {
    const { calculator, gridLineWidth, height, isFlat, width } = this.props;

    const dim0 = HBUtils.flatHexDimensions(1.0);
    const width0 = calculator.fileCount * dim0.h;
    const height0 = calculator.rankCount * dim0.h;

    let width1;
    let height1;

    if (isFlat) {
      width1 = COS30 * (calculator.rankCount - 1) * dim0.h;
      height1 = COS60 * (calculator.fileCount - 1) * dim0.h;
    } else {
      width1 = COS60 * (calculator.rankCount - 1) * dim0.h;
      height1 = COS30 * (calculator.fileCount - 1) * dim0.h;
    }

    const width2 = gridLineWidth / (2.0 * calculator.fileCount);
    const height2 = gridLineWidth / (2.0 * calculator.rankCount);

    const sizeW = width / (width0 + width1) - width2;
    const sizeH = height / (height0 + height1) - height2;

    return Math.max(sizeW, sizeH);
  }

  drawHex(context, center, size) {
    const { isFlat } = this.props;

    context.beginPath();

    for (let i = 0; i < 6; i += 1) {
      const corner = isFlat
        ? HBUtils.flatHexCorner(center, size, i)
        : HBUtils.pointyHexCorner(center, size, i);
      context.lineTo(corner.x, corner.y);
    }

    context.closePath();
    context.stroke();
  }

  drawGridlines(context) {
    const { calculator, gridColor, gridLineWidth } = this.props;

    const size = this.computeSize();

    context.save();
    context.lineJoin = "miter";
    context.lineWidth = gridLineWidth;
    context.strokeStyle = gridColor;

    for (let r = 1; r <= calculator.rankCount; r += 1) {
      for (let f = 1; f <= calculator.fileCount; f += 1) {
        const center = this.computeCenter(f - 1, r - 1);
        this.drawHex(context, center, size);
      }
    }

    context.restore();
  }

  drawTokens(context) {
    const { calculator, drawTokenFunction, height, tokens, width } = this.props;

    context.save();

    for (let r = 1; r <= calculator.rankCount; r += 1) {
      for (let f = 1; f <= calculator.fileCount; f += 1) {
        const an = calculator.fileRankToAN(f, r);
        const token = tokens[an];
        const center = this.computeCenter(f - 1, r - 1);
        drawTokenFunction(context, center, an, token);
      }
    }

    context.restore();
  }

  paint() {
    const { height, isFlat, myKey, width } = this.props;

    const canvas = document.getElementById(myKey);
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, width, height);

    this.drawGridlines(context);
    this.drawTokens(context);
  }

  render() {
    const { backgroundColor, height, myKey, width } = this.props;

    return ReactDOMFactories.canvas({
      id: myKey,
      key: myKey,
      style: { backgroundColor },
      width,
      height
    });
  }
}

HexBoardUI.propTypes = {
  calculator: PropTypes.shape().isRequired,
  drawTokenFunction: PropTypes.func.isRequired,
  tokens: PropTypes.shape().isRequired,

  backgroundColor: PropTypes.string,
  gridColor: PropTypes.string,
  gridLineWidth: PropTypes.number,
  height: PropTypes.number,
  isFlat: PropTypes.bool,
  myKey: PropTypes.string,
  width: PropTypes.number
};

HexBoardUI.defaultProps = {
  backgroundColor: "Gainsboro",
  gridColor: "Black",
  gridLineWidth: 1,
  isFlat: true,
  myKey: "hexBoardCanvas",
  width: 640,
  height: 480
};

export default HexBoardUI;
