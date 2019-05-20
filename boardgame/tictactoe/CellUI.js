import Token from "./Token.js";

const drawO = (context, width, height, color) => {
  const x = Math.round(width / 2.0);
  const y = Math.round(height / 2.0);
  const radius = Math.floor((0.7 * Math.min(width, height)) / 2.0);
  const startAngle = 0;
  const endAngle = 2.0 * Math.PI;

  context.save();
  context.lineWidth = 10;
  context.strokeStyle = color;

  context.beginPath();
  context.arc(x, y, radius, startAngle, endAngle);
  context.stroke();
  context.restore();
};

const drawX = (context, width, height, color) => {
  const x0 = Math.ceil(0.1 * width);
  const y0 = Math.ceil(0.1 * height);
  const x1 = Math.floor(0.9 * width);
  const y1 = Math.floor(0.9 * height);

  context.save();
  context.lineWidth = 10;
  context.strokeStyle = color;

  context.beginPath();
  context.moveTo(x0, y0);
  context.lineTo(x1, y1);
  context.moveTo(x1, y0);
  context.lineTo(x0, y1);
  context.stroke();
  context.restore();
};

class CellUI extends React.PureComponent {
  componentDidMount() {
    this.paint();
  }

  componentDidUpdate() {
    this.paint();
  }

  paint() {
    const { an, constants, height, oColor, token, width, xColor } = this.props;
    const canvas = document.getElementById(`cellUICanvas${an}`);
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, width, height);

    switch (token) {
      case Token.X:
        drawX(context, width, height, xColor);
        break;
      case Token.O:
        drawO(context, width, height, oColor);
        break;
    }
  }

  render() {
    const { an, backgroundColor, height, width } = this.props;

    return ReactDOMFactories.canvas({
      id: `cellUICanvas${an}`,
      key: `cellUICanvas${an}`,
      style: { backgroundColor },
      width,
      height
    });
  }
}

CellUI.propTypes = {
  an: PropTypes.number.isRequired,

  backgroundColor: PropTypes.string,
  height: PropTypes.number,
  oColor: PropTypes.string,
  token: PropTypes.string,
  width: PropTypes.number,
  xColor: PropTypes.string
};

CellUI.defaultProps = {
  backgroundColor: "White",
  height: 60,
  oColor: "Blue",
  token: null,
  width: 60,
  xColor: "Red"
};

export default CellUI;
