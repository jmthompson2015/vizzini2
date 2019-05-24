// see https://www.redblobgames.com/grids/hexagons/
// Cube coordinates constraint: x + y + z = 0

const HexBoardUtilities = {};

const DEG_TO_RAD = Math.PI / 180.0;

HexBoardUtilities.createCube = ({ x = 0, y = 0, z = 0 } = {}) => Immutable({ x, y, z });

HexBoardUtilities.createDimension = ({ w = 0, h = 0 } = {}) => Immutable({ w, h });

HexBoardUtilities.createHex = ({ q = 0, r = 0 } = {}) => Immutable({ q, r });

HexBoardUtilities.createPoint = ({ x = 0, y = 0 } = {}) =>
  Immutable({ x: Math.round(x), y: Math.round(y) });

const axialDirections = [
  HexBoardUtilities.createHex({ q: +1, r: 0 }),
  HexBoardUtilities.createHex({ q: +1, r: -1 }),
  HexBoardUtilities.createHex({ q: 0, r: -1 }),
  HexBoardUtilities.createHex({ q: -1, r: 0 }),
  HexBoardUtilities.createHex({ q: -1, r: +1 }),
  HexBoardUtilities.createHex({ q: 0, r: +1 })
];

const cubeDiagonals = [
  HexBoardUtilities.createCube({ x: +2, y: -1, z: -1 }),
  HexBoardUtilities.createCube({ x: +1, y: +1, z: -2 }),
  HexBoardUtilities.createCube({ x: -1, y: +2, z: -1 }),
  HexBoardUtilities.createCube({ x: -2, y: +1, z: +1 }),
  HexBoardUtilities.createCube({ x: -1, y: -1, z: +2 }),
  HexBoardUtilities.createCube({ x: +1, y: -2, z: +1 })
];

const cubeDirections = [
  HexBoardUtilities.createCube({ x: +1, y: -1, z: 0 }),
  HexBoardUtilities.createCube({ x: +1, y: 0, z: -1 }),
  HexBoardUtilities.createCube({ x: 0, y: +1, z: -1 }),
  HexBoardUtilities.createCube({ x: -1, y: +1, z: 0 }),
  HexBoardUtilities.createCube({ x: -1, y: 0, z: +1 }),
  HexBoardUtilities.createCube({ x: 0, y: -1, z: +1 })
];

const cubeAdd = (a, b) =>
  HexBoardUtilities.createCube({ x: a.x + b.x, y: a.y + b.y, z: a.z + b.z });

// Linear interpolation for hexes.
const cubeInterpolate = (a, b, t) =>
  HexBoardUtilities.createCube({
    x: interpolate(a.x, b.x, t),
    y: interpolate(a.y, b.y, t),
    z: interpolate(a.z, b.z, t)
  });

const cubeRound = cube => {
  let rx = Math.round(cube.x);
  let ry = Math.round(cube.y);
  let rz = Math.round(cube.z);

  const x_diff = Math.abs(rx - cube.x);
  const y_diff = Math.abs(ry - cube.y);
  const z_diff = Math.abs(rz - cube.z);

  if (x_diff > y_diff && x_diff > z_diff) {
    rx = -ry - rz;
  } else if (y_diff > z_diff) {
    ry = -rx - rz;
  } else {
    rz = -rx - ry;
  }

  return HexBoardUtilities.createCube({ x: rx, y: ry, z: rz });
};

const hexRound = hex => HexBoardUtilities.cubeToAxial(cubeRound(axialToCube(hex)));

// Linear interpolation for floats.
const interpolate = (a, b, t) => a + (b - a) * t;

// /////////////////////////////////////////////////////////////////////////////////////////////////
HexBoardUtilities.axialToCube = hex => {
  const x = hex.q;
  const z = hex.r;
  const y = -x - z;
  return HexBoardUtilities.createCube({ x, y, z });
};

HexBoardUtilities.cubeDiagonalNeighbor = (cube, direction) =>
  cubeAdd(cube, cubeDiagonals[direction]);

HexBoardUtilities.cubeDirection = direction => cubeDirections[direction];

HexBoardUtilities.cubeDistance = (a, b) =>
  (Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z)) / 2;

HexBoardUtilities.cubeLinedraw = (a, b) => {
  const N = HexBoardUtilities.cubeDistance(a, b);
  const results = [];
  for (let i = 0; i <= N; i += 1) {
    results.push(HexBoardUtilities.cubeRound(cubeInterpolate(a, b, (1.0 / N) * i)));
  }
  return results;
};

HexBoardUtilities.cubeNeighbor = (cube, direction) =>
  cubeAdd(cube, HexBoardUtilities.cubeDirection(direction));

HexBoardUtilities.cubeToAxial = cube => {
  const q = cube.x;
  const r = cube.z;
  return HexBoardUtilities.createHex({ q, r });
};

HexBoardUtilities.flatHexCorner = (center, size, i) => {
  const angle_deg = 60 * i;
  const angle_rad = DEG_TO_RAD * angle_deg;
  return HexBoardUtilities.createPoint({
    x: center.x + size * Math.cos(angle_rad),
    y: center.y + size * Math.sin(angle_rad)
  });
};

HexBoardUtilities.flatHexDimensions = size =>
  HexBoardUtilities.createDimension({ w: 2.0 * size, h: Math.sqrt(3.0) * size });

HexBoardUtilities.flatHexSpacing = size => {
  const dim = HexBoardUtilities.flatHexDimensions(size);
  return HexBoardUtilities.createDimension({ w: 0.75 * dim.w, h: dim.h });
};

HexBoardUtilities.flatHexToPixel = (hex, size, offset = { x: 0, y: 0 }) => {
  const x = size * ((3 / 2) * hex.q);
  const y = size * ((Math.sqrt(3) / 2) * hex.q + Math.sqrt(3) * hex.r);
  return HexBoardUtilities.createPoint({ x: x + offset.x, y: y + offset.y });
};

HexBoardUtilities.hexDiagonalNeighbor = (hex, direction) => {
  const cube = HexBoardUtilities.axialToCube(hex);
  const neighbor = HexBoardUtilities.cubeDiagonalNeighbor(cube, direction);
  return HexBoardUtilities.cubeToAxial(neighbor);
};

HexBoardUtilities.hexDirection = direction => axialDirections[direction];

HexBoardUtilities.hexDistance = (a, b) => {
  const ac = HexBoardUtilities.axialToCube(a);
  const bc = HexBoardUtilities.axialToCube(b);
  return HexBoardUtilities.cubeDistance(ac, bc);
};

HexBoardUtilities.hexNeighbor = (hex, direction) => {
  const cube = HexBoardUtilities.axialToCube(hex);
  const neighbor = HexBoardUtilities.cubeNeighbor(cube, direction);
  return HexBoardUtilities.cubeToAxial(neighbor);
};

HexBoardUtilities.pixelToPointyHex = (point, size) => {
  const q = ((Math.sqrt(3) / 3) * point.x - (1 / 3) * point.y) / size;
  const r = ((2 / 3) * point.y) / size;
  return hexRound(HexBoardUtilities.createHex({ q, r }));
};

HexBoardUtilities.pixelToFlatHex = (point, size) => {
  const q = ((2 / 3) * point.x) / size;
  const r = ((-1 / 3) * point.x + (Math.sqrt(3) / 3) * point.y) / size;
  return hexRound(HexBoardUtilities.createHex({ q, r }));
};

HexBoardUtilities.pointyHexCorner = (center, size, i) => {
  const angle_deg = 60 * i - 30;
  const angle_rad = DEG_TO_RAD * angle_deg;
  return HexBoardUtilities.createPoint({
    x: center.x + size * Math.cos(angle_rad),
    y: center.y + size * Math.sin(angle_rad)
  });
};

HexBoardUtilities.pointyHexDimensions = size =>
  HexBoardUtilities.createDimension({ w: Math.sqrt(3.0) * size, h: 2 * size });

HexBoardUtilities.pointyHexSpacing = size => {
  const dim = HexBoardUtilities.pointyHexDimensions(size);
  return HexBoardUtilities.createDimension({ w: dim.w, h: 0.75 * dim.h });
};

HexBoardUtilities.pointyHexToPixel = (hex, size, offset = { x: 0, y: 0 }) => {
  const x = size * (Math.sqrt(3) * hex.q + (Math.sqrt(3) / 2) * hex.r);
  const y = size * ((3 / 2) * hex.r);
  return HexBoardUtilities.createPoint({ x: x + offset.x, y: y + offset.y });
};

export default HexBoardUtilities;
