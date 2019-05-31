/* eslint no-console: ["error", { allow: ["log"] }] */

// see https://www.redblobgames.com/grids/hexagons/
import HBUtils from "./HexBoardUtilities.js";

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

// /////////////////////////////////////////////////////////////////////////////////////////////////
class HexBoardUI extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { size: 1.0, offset: HBUtils.createPoint(), imageMap: {} };
  }

  componentDidMount() {
    this.loadImages();
    this.computeSize();
    this.paint();
  }

  componentDidUpdate() {
    this.paint();
  }

  computeCenter(size, offset, f, r) {
    const { isFlat } = this.props;

    const hex = HBUtils.createHex({ q: f, r });
    const dim = isFlat ? HBUtils.flatHexDimensions(size) : HBUtils.pointyHexDimensions(size);
    const myOffset = HBUtils.createPoint({
      x: dim.w / 2.0 + offset.x,
      y: dim.h / 2.0 + offset.y
    });

    return isFlat
      ? HBUtils.flatHexToPixel(hex, size, myOffset)
      : HBUtils.pointyHexToPixel(hex, size, myOffset);
  }

  computeSize() {
    const { calculator, gridLineWidth, height, isFlat, isCellUsedFunction, width } = this.props;

    const size0 = 1.0;
    const offset0 = HBUtils.createPoint();
    let minX = Number.POSITIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;

    for (let r = 1; r <= calculator.rankCount; r += 1) {
      for (let f = 1; f <= calculator.fileCount; f += 1) {
        const an = calculator.fileRankToAN(f, r);

        if (isCellUsedFunction(an)) {
          const center = this.computeCenter(size0, offset0, f - 1, r - 1);

          for (let i = 0; i < 6; i += 1) {
            const corner = isFlat
              ? HBUtils.flatHexCorner(center, size0, i)
              : HBUtils.pointyHexCorner(center, size0, i);
            minX = Math.min(corner.x, minX);
            minY = Math.min(corner.y, minY);
            maxX = Math.max(corner.x, maxX);
            maxY = Math.max(corner.y, maxY);
          }
        }
      }
    }

    const width0 = maxX - minX;
    const height0 = maxY - minY;
    const sizeW = (width - gridLineWidth) / width0;
    const sizeH = (height - gridLineWidth) / height0;
    const size = Math.min(sizeW, sizeH);

    const margin = {
      w: (width - size * width0) / 2.0,
      h: (height - size * height0) / 2.0
    };
    const offset = HBUtils.createPoint({
      x: margin.w - size * minX,
      y: margin.h - size * minY
    });

    this.setState({ size, offset });
  }

  drawCells(context) {
    const {
      calculator,
      gridColor,
      gridLineWidth,
      cellColorFunction,
      cellImageFunction,
      isFlat,
      isCellUsedFunction
    } = this.props;
    const { imageMap, offset, size } = this.state;

    for (let r = 1; r <= calculator.rankCount; r += 1) {
      for (let f = 1; f <= calculator.fileCount; f += 1) {
        const an = calculator.fileRankToAN(f, r);

        if (isCellUsedFunction(an)) {
          const center = this.computeCenter(size, offset, f - 1, r - 1);
          const corners = HBUtils.computeCorners(center, size, isFlat);

          // Layer 0: Cell background color
          const background = cellColorFunction(an);

          if (background) {
            HBUtils.fillHex(context, corners, background);
          }

          // Layer 1: Cell background image
          const image = cellImageFunction(an);

          if (image) {
            const img = imageMap[image];

            if (img) {
              HBUtils.drawRectangularImage(context, corners, img);
            }
          }

          // Layer 2: Cell outline
          HBUtils.drawHex(context, corners, gridColor, gridLineWidth);
        }
      }
    }
  }

  drawTokens(context) {
    const { calculator, drawTokenFunction, isCellUsedFunction, anToTokens } = this.props;
    const { imageMap, offset, size } = this.state;
    context.save();

    for (let r = 1; r <= calculator.rankCount; r += 1) {
      for (let f = 1; f <= calculator.fileCount; f += 1) {
        const an = calculator.fileRankToAN(f, r);

        if (isCellUsedFunction(an)) {
          const token = anToTokens[an];
          const center = this.computeCenter(size, offset, f - 1, r - 1);
          drawTokenFunction(context, center, size, an, token, imageMap);
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
  anToTokens: PropTypes.shape().isRequired,
  calculator: PropTypes.shape().isRequired,
  drawTokenFunction: PropTypes.func.isRequired,

  backgroundColor: PropTypes.string,
  cellColorFunction: PropTypes.func,
  cellImageFunction: PropTypes.func,
  gridColor: PropTypes.string,
  gridLineWidth: PropTypes.number,
  height: PropTypes.number,
  images: PropTypes.arrayOf(),
  isCellUsedFunction: PropTypes.func,
  isFlat: PropTypes.bool,
  myKey: PropTypes.string,
  width: PropTypes.number
};

HexBoardUI.defaultProps = {
  backgroundColor: "Gainsboro",
  cellColorFunction: () => undefined,
  cellImageFunction: () => undefined,
  gridColor: "Black",
  gridLineWidth: 1,
  height: 480,
  images: [],
  isCellUsedFunction: () => true,
  isFlat: true,
  myKey: "hexBoardCanvas",
  width: 640
};

export default HexBoardUI;
