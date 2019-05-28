import CoordinateCalculator from "../CoordinateCalculator.js";
import HexBoardUI from "../HexBoardUI.js";

const images = [
  "resource/Empty_Control_Point.png",
  "resource/Raven_Control_Marker.png",
  "resource/Wolf_Control_Marker.png"
];

const drawTokenFunction = (context0, center, size, an, token) => {
  const context = context0;

  if (typeof token === "string" && token.endsWith("png")) {
    const mySizeX = 0.9 * size;
    const mySizeY = 0.8 * size;
    const img = new Image();
    img.addEventListener("load", () =>
      context.drawImage(img, center.x - mySizeX, center.y - mySizeY, 2.0 * mySizeX, 2.0 * mySizeY)
    );
    img.src = token;
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

const hexBackgroundColor = an => {
  let answer = "hsl(40,30%,60%)";

  if (["a6", "a7", "b5", "b6", "b7", "j1", "j2", "j3", "k1", "k2"].includes(an)) {
    answer = "hsl(40,30%,45%)";
  }

  return answer;
};

const hexBackgroundImage = an => {
  let answer;

  if (
    ["a7", "b5", "c6", "d4", "d7", "e2", "e5", "g3", "g6", "h1", "h4", "i2", "j3", "k1"].includes(
      an
    )
  ) {
    answer = "resource/Empty_Control_Point.png";
  }

  return answer;
};

const isHexUsed = an => {
  return ![
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
  ].includes(an);
};

class WarChestBoardUI extends React.PureComponent {
  render() {
    const { tokens } = this.props;

    const calculator = new CoordinateCalculator(11, 7);

    return React.createElement(HexBoardUI, {
      backgroundColor: "hsl(40,30%,75%)",
      calculator,
      drawTokenFunction,
      gridColor: "hsl(40,30%,75%)",
      gridLineWidth: 3,
      hexBackgroundColor,
      hexBackgroundImage,
      images,
      isHexUsed,
      tokens
    });
  }
}

WarChestBoardUI.propTypes = {
  tokens: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default WarChestBoardUI;
