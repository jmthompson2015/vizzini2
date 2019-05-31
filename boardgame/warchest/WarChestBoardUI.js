import CoordinateCalculator from "../CoordinateCalculator.js";
import HexBoardUI from "../HexBoardUI.js";
import HBUtils from "../HexBoardUtilities.js";

import Token from "./Token.js";

const images0 = R.map(R.prop("image"), Token.values());
const images = ["resource/EmptyControlPoint.png"].concat(images0);

const IS_FLAT = true;
const UNUSED = [
  "a1",
  "a2",
  "a3",
  "a4",
  "a5",
  "b1",
  "b2",
  "b3",
  "b4",
  "c1",
  "c2",
  "c3",
  "d1",
  "d2",
  "e1",
  "g7",
  "h6",
  "h7",
  "i5",
  "i6",
  "i7",
  "j4",
  "j5",
  "j6",
  "j7",
  "k3",
  "k4",
  "k5",
  "k6",
  "k7"
];
const HEX_4P = ["a6", "a7", "b5", "b6", "b7", "j1", "j2", "j3", "k1", "k2"];
const CONTROL_POINTS = [
  "a7",
  "b5",
  "c6",
  "d4",
  "d7",
  "e2",
  "e5",
  "g3",
  "g6",
  "h1",
  "h4",
  "i2",
  "j3",
  "k1"
];

const drawTokenFunction = (context0, center, size, an, token, imageMap) => {
  const context = context0;

  if (token) {
    const corners = HBUtils.computeCorners(center, size, IS_FLAT);
    const img = imageMap[token.image];

    if (img) {
      if (token.image.indexOf("Control") >= 0) {
        HBUtils.drawRectangularImage(context, corners, img);
      } else {
        HBUtils.drawCircularImage(context, corners, img);
      }
    }
  } else {
    context.save();
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "Green";
    context.font = "24px serif";
    context.fillText(token || an, center.x, center.y);
    context.restore();
  }
};

const cellColorFunction = an => {
  let answer = "hsl(40,30%,60%)";

  if (HEX_4P.includes(an)) {
    answer = "hsl(40,30%,45%)";
  }

  return answer;
};

const cellImageFunction = an => {
  let answer;

  if (CONTROL_POINTS.includes(an)) {
    answer = "resource/EmptyControlPoint.png";
  }

  return answer;
};

const isCellUsedFunction = an => !UNUSED.includes(an);

class WarChestBoardUI extends React.PureComponent {
  render() {
    const { anToTokens } = this.props;

    const calculator = new CoordinateCalculator(11, 7);

    return React.createElement(HexBoardUI, {
      anToTokens,
      calculator,
      drawTokenFunction,

      backgroundColor: "hsl(40,30%,75%)",
      cellColorFunction,
      cellImageFunction,
      gridColor: "hsl(40,30%,75%)",
      gridLineWidth: 3,
      images,
      isCellUsedFunction
    });
  }
}

WarChestBoardUI.propTypes = {
  anToTokens: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default WarChestBoardUI;
