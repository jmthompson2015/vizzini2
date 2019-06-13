/* eslint no-underscore-dangle: ["error", { "allow": ["_isFlat", "_isSquare"] }] */

const DEG_TO_RAD = Math.PI / 180.0;
const COS45 = Math.cos(45.0 * DEG_TO_RAD);
const SQRT3 = Math.sqrt(3.0);

class BoardCalculator {
  constructor(isSquare = true, isFlat = true) {
    this._isSquare = isSquare;
    this._isFlat = isFlat;
  }

  get cornerCount() {
    return this.isSquare ? 4 : 6;
  }

  get isFlat() {
    return this._isFlat;
  }

  get isHexagon() {
    return !this._isSquare;
  }

  get isPointy() {
    return !this._isFlat;
  }

  get isSquare() {
    return this._isSquare;
  }

  cellCorner(center, size, i) {
    const deltaAngle = this.isSquare ? 90.0 : 60.0;
    const factor = this.isSquare ? 0.5 : 1.0;
    let startAngle = 0.0;

    if (this.isSquare && this.isFlat) {
      startAngle = 45.0;
    }

    if (this.isHexagon && this.isPointy) {
      startAngle = 30.0;
    }

    const angle = DEG_TO_RAD * (deltaAngle * i - startAngle);

    return Immutable({
      x: center.x + factor * size * Math.cos(angle),
      y: center.y + factor * size * Math.sin(angle)
    });
  }

  cellDimensions(size) {
    let w;
    let h;

    if (this.isSquare && this.isFlat) {
      w = 2.0 * COS45 * size;
      h = 2.0 * COS45 * size;
    } else if (this.isSquare && this.isPointy) {
      w = 2.0 * size;
      h = 2.0 * size;
    } else if (this.isHexagon && this.isFlat) {
      w = 2.0 * size;
      h = SQRT3 * size;
    } else if (this.isHexagon && this.isPointy) {
      w = SQRT3 * size;
      h = 2 * size;
    }

    return Immutable({ w, h });
  }

  cellToPixel(f, r, size, offset = { x: 0, y: 0 }) {
    let x;
    let y;

    if (this.isSquare && this.isFlat) {
      x = size * COS45 * f;
      y = size * COS45 * r;
    } else if (this.isSquare && this.isPointy) {
      x = (size * f - size * r) / 2.0;
      y = (size * f + size * r) / 2.0;
    } else if (this.isHexagon && this.isFlat) {
      x = size * (1.5 * f);
      y = size * ((SQRT3 / 2) * f + SQRT3 * r);
    } else if (this.isHexagon && this.isPointy) {
      x = size * (SQRT3 * f + (SQRT3 / 2) * r);
      y = size * (1.5 * r);
    }

    return Immutable({ x: x + offset.x, y: y + offset.y });
  }

  computeCorners(center, size) {
    const answer = [];

    for (let i = 0; i < this.cornerCount; i += 1) {
      const corner = this.cellCorner(center, size, i);
      answer.push(corner);
    }

    return answer;
  }
}

BoardCalculator.boundingBox = points => {
  const xx = R.map(R.prop("x"), points);
  const yy = R.map(R.prop("y"), points);
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

BoardCalculator.drawCell = (context0, corners, gridColor, gridLineWidth) => {
  const context = context0;
  context.save();
  context.lineJoin = "miter";
  context.lineWidth = gridLineWidth;
  context.strokeStyle = gridColor;
  BoardCalculator.enterPath(context, corners);
  context.stroke();
  context.restore();
};

BoardCalculator.drawCircularImage = (context, corners, img) => {
  const box = BoardCalculator.boundingBox(corners);
  const diameter = 0.9 * Math.min(box.width, box.height);
  const offsetX = (box.width - diameter) / 2.0;
  const offsetY = (box.height - diameter) / 2.0;
  context.drawImage(img, box.x + offsetX, box.y + offsetY, diameter, diameter);
};

BoardCalculator.drawRectangularImage = (context, corners, img) => {
  const box = BoardCalculator.boundingBox(corners);
  context.drawImage(img, box.x, box.y, box.width, box.height);
};

BoardCalculator.enterPath = (context, points) => {
  context.beginPath();
  context.moveTo(points[0].x, points[0].y);

  for (let i = 1; i < points.length; i += 1) {
    context.lineTo(points[i].x, points[i].y);
  }
  context.closePath();
};

BoardCalculator.fillCell = (context0, corners, background) => {
  const context = context0;
  context.save();
  BoardCalculator.enterPath(context, corners);
  context.fillStyle = background;
  context.fill();
  context.restore();
};

export default BoardCalculator;
