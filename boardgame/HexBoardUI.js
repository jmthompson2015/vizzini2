/* eslint no-console: ["error", { allow: ["log"] }] */

// see https://www.redblobgames.com/grids/hexagons/
import HBUtils from "./HexBoardUtilities.js";

const DEG_TO_RAD = Math.PI / 180.0;
const COS30 = Math.cos(30.0 * DEG_TO_RAD);
const COS60 = Math.cos(60.0 * DEG_TO_RAD);

const boundingBox = corners => {
  const xx = R.map(c => c.x, corners);
  const yy = R.map(c => c.y, corners);
  const minX = Math.min(...xx);
  const minY = Math.min(...yy);
  const maxX = Math.max(...xx);
  const maxY = Math.max(...yy);

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
};

const computeCorners = (center, size, isFlat) => {
  const answer = [];

  for (let i = 0; i < 6; i += 1) {
    const corner = isFlat
      ? HBUtils.flatHexCorner(center, size, i)
      : HBUtils.pointyHexCorner(center, size, i);
    answer.push(corner);
  }

  return answer;
};

const enterPath = (context, corners) => {
  context.beginPath();
  context.moveTo(corners[0].x, corners[0].y);

  for (let i = 1; i < 6; i += 1) {
    context.lineTo(corners[i].x, corners[i].y);
  }
  context.closePath();
};

const loadImage = src =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => {
      console.log(`Loaded image: ${src} ${img.width}x${img.height}`);
      resolve(img);
    });
    img.addEventListener("error", err => reject(err));
    img.src = src;
  });

const drawHex = (context0, corners, gridColor, gridLineWidth) => {
  const context = context0;
  context.save();
  context.lineJoin = "miter";
  context.lineWidth = gridLineWidth;
  context.strokeStyle = gridColor;
  enterPath(context, corners);
  context.stroke();
  context.restore();
};

const drawImage = (context, corners, img) => {
  const box = boundingBox(corners);
  context.drawImage(img, box.x, box.y, box.width, box.height);
};

const fillHex = (context0, corners, background) => {
  const context = context0;
  context.save();
  enterPath(context, corners);
  context.fillStyle = background;
  context.fill();
  context.restore();
};

// /////////////////////////////////////////////////////////////////////////////////////////////////
class HexBoardUI extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { imageMap: {} };
  }

  componentDidMount() {
    this.loadImages();
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

  drawCells(context) {
    const {
      calculator,
      gridColor,
      gridLineWidth,
      hexBackgroundColor,
      hexBackgroundImage,
      isFlat,
      isHexUsed
    } = this.props;
    const { imageMap } = this.state;
    const size = this.computeSize();

    for (let r = 1; r <= calculator.rankCount; r += 1) {
      for (let f = 1; f <= calculator.fileCount; f += 1) {
        const an = calculator.fileRankToAN(f, r);

        if (isHexUsed(an)) {
          const center = this.computeCenter(f - 1, r - 1);
          const corners = computeCorners(center, size, isFlat);

          // Layer 0: Cell background color
          const background = hexBackgroundColor(an);

          if (background) {
            fillHex(context, corners, background);
          }

          // Layer 1: Cell background image
          const image = hexBackgroundImage(an);

          if (image) {
            const img = imageMap[image];

            if (img) {
              drawImage(context, corners, img);
            }
          }

          // Layer 2: Cell outline
          drawHex(context, corners, gridColor, gridLineWidth);
        }
      }
    }
  }

  drawTokens(context) {
    const { calculator, drawTokenFunction, isHexUsed, tokens } = this.props;

    const size = this.computeSize();
    context.save();

    for (let r = 1; r <= calculator.rankCount; r += 1) {
      for (let f = 1; f <= calculator.fileCount; f += 1) {
        const an = calculator.fileRankToAN(f, r);

        if (isHexUsed(an)) {
          const token = tokens[an];
          const center = this.computeCenter(f - 1, r - 1);
          drawTokenFunction(context, center, size, an, token);
        }
      }
    }

    context.restore();
  }

  loadImages() {
    const { images } = this.props;

    for (let i = 0; i < images.length; i += 1) {
      loadImage(images[i]).then(img => {
        const { imageMap: oldImageMap } = this.state;
        this.setState({ imageMap: R.assoc(images[i], img, oldImageMap) });
      });
    }
  }

  paint() {
    const { height, myKey, width } = this.props;

    const canvas = document.getElementById(myKey);
    const context = canvas.getContext("2d");

    // Layer 0: Board background color
    context.clearRect(0, 0, width, height);

    // Layer 1: Cells
    this.drawCells(context);

    // Layer 2: Tokens
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
  hexBackgroundColor: PropTypes.func,
  hexBackgroundImage: PropTypes.func,
  images: PropTypes.arrayOf(),
  isFlat: PropTypes.bool,
  isHexUsed: PropTypes.func,
  myKey: PropTypes.string,
  width: PropTypes.number
};

HexBoardUI.defaultProps = {
  backgroundColor: "Gainsboro",
  gridColor: "Black",
  gridLineWidth: 1,
  hexBackgroundColor: () => undefined,
  hexBackgroundImage: () => undefined,
  images: [],
  isFlat: true,
  isHexUsed: () => true,
  myKey: "hexBoardCanvas",
  width: 640,
  height: 480
};

export default HexBoardUI;
