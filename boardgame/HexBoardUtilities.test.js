import HBUtils from "./HexBoardUtilities.js";

QUnit.module("HexBoardUtilities");

const FILE_COUNT = 4;
const RANK_COUNT = 3;

const round4 = value => Math.round(value * 10000.0) / 10000.0;

QUnit.test("axialToCube()", assert => {
  // Setup.
  const q = 1;
  const r = -3;
  const hex = HBUtils.createHex({ q, r });

  // Run.
  const result = HBUtils.axialToCube(hex);

  // Verify.
  assert.ok(result);
  assert.equal(result.x, q);
  assert.equal(result.y, 2);
  assert.equal(result.z, r);
});

QUnit.test("createCube() empty", assert => {
  // Setup.

  // Run.
  const result = HBUtils.createCube();

  // Verify.
  assert.ok(result);
  assert.equal(result.x, 0);
  assert.equal(result.y, 0);
  assert.equal(result.z, 0);
});

QUnit.test("createCube()", assert => {
  // Setup.
  const x = 1;
  const y = 2;
  const z = -x - y;

  // Run.
  const result = HBUtils.createCube({ x, y, z });

  // Verify.
  assert.ok(result);
  assert.equal(result.x, x);
  assert.equal(result.y, y);
  assert.equal(result.z, z);
});

QUnit.test("createHex() empty", assert => {
  // Setup.

  // Run.
  const result = HBUtils.createHex();

  // Verify.
  assert.ok(result);
  assert.equal(result.q, 0);
  assert.equal(result.r, 0);
});

QUnit.test("createHex()", assert => {
  // Setup.
  const q = 1;
  const r = 2;

  // Run.
  const result = HBUtils.createHex({ q, r });

  // Verify.
  assert.ok(result);
  assert.equal(result.q, q);
  assert.equal(result.r, r);
});

QUnit.test("createPoint() empty", assert => {
  // Setup.

  // Run.
  const result = HBUtils.createPoint();

  // Verify.
  assert.ok(result);
  assert.equal(result.x, 0);
  assert.equal(result.y, 0);
});

QUnit.test("createPoint()", assert => {
  // Setup.
  const x = 1;
  const y = 2;

  // Run.
  const result = HBUtils.createPoint({ x, y });

  // Verify.
  assert.ok(result);
  assert.equal(result.x, x);
  assert.equal(result.y, y);
});

QUnit.test("cubeDiagonalNeighbor() 0", assert => {
  // Setup.
  const x = 1;
  const y = 2;
  const z = -x - y;
  const cube = HBUtils.createCube({ x, y, z });
  const direction = 0;

  // Run.
  const result = HBUtils.cubeDiagonalNeighbor(cube, direction);

  // Verify.
  assert.ok(result);
  assert.equal(result.x, x + 2);
  assert.equal(result.y, y - 1);
  assert.equal(result.z, z - 1);
});

QUnit.test("cubeDistance()", assert => {
  // Setup.
  const a = HBUtils.createCube({ x: 1, y: 2, z: -3 });
  const b = HBUtils.createCube({ x: 3, y: 2, z: -3 });

  // Run.
  const result = HBUtils.cubeDistance(a, b);

  // Verify.
  assert.ok(result);
  assert.equal(result, 1);
});

QUnit.test("cubeNeighbor() 0", assert => {
  // Setup.
  const x = 1;
  const y = 2;
  const z = -x - y;
  const cube = HBUtils.createCube({ x, y, z });
  const direction = 0;

  // Run.
  const result = HBUtils.cubeNeighbor(cube, direction);

  // Verify.
  assert.ok(result);
  assert.equal(result.x, x + 1);
  assert.equal(result.y, y - 1);
  assert.equal(result.z, z - 0);
});

QUnit.test("cubeToAxial()", assert => {
  // Setup.
  const x = 1;
  const y = 2;
  const z = -x - y;
  const cube = HBUtils.createCube({ x, y, z });

  // Run.
  const result = HBUtils.cubeToAxial(cube);

  // Verify.
  assert.ok(result);
  assert.equal(result.q, x);
  assert.equal(result.r, z);
});

QUnit.test("flatHexCorner() 0", assert => {
  // Setup.
  const center = HBUtils.createPoint({ x: 5, y: 5 });
  const size = 10;

  // Run.
  const result = HBUtils.flatHexCorner(center, size, 0);

  // Verify.
  assert.ok(result);
  assert.equal(result.x, 15);
  assert.equal(result.y, 5);
});

QUnit.test("flatHexCorner() 1", assert => {
  // Setup.
  const center = HBUtils.createPoint({ x: 5, y: 5 });
  const size = 10;

  // Run.
  const result = HBUtils.flatHexCorner(center, size, 1);

  // Verify.
  assert.ok(result);
  assert.equal(result.x, 10);
  assert.equal(result.y, 14);
});

QUnit.test("flatHexCorner() 2", assert => {
  // Setup.
  const center = HBUtils.createPoint({ x: 5, y: 5 });
  const size = 10;

  // Run.
  const result = HBUtils.flatHexCorner(center, size, 2);

  // Verify.
  assert.ok(result);
  assert.equal(result.x, 0);
  assert.equal(result.y, 14);
});

QUnit.test("flatHexCorner() 3", assert => {
  // Setup.
  const center = HBUtils.createPoint({ x: 5, y: 5 });
  const size = 10;

  // Run.
  const result = HBUtils.flatHexCorner(center, size, 3);

  // Verify.
  assert.ok(result);
  assert.equal(result.x, -5);
  assert.equal(result.y, 5);
});

QUnit.test("flatHexCorner() 4", assert => {
  // Setup.
  const center = HBUtils.createPoint({ x: 5, y: 5 });
  const size = 10;

  // Run.
  const result = HBUtils.flatHexCorner(center, size, 4);

  // Verify.
  assert.ok(result);
  assert.equal(result.x, 0);
  assert.equal(result.y, -4);
});

QUnit.test("flatHexCorner() 5", assert => {
  // Setup.
  const center = HBUtils.createPoint({ x: 5, y: 5 });
  const size = 10;

  // Run.
  const result = HBUtils.flatHexCorner(center, size, 5);

  // Verify.
  assert.ok(result);
  assert.equal(result.x, 10);
  assert.equal(result.y, -4);
});

QUnit.test("flatHexDimensions()", assert => {
  // Setup.
  const size = 10;

  // Run.
  const result = HBUtils.flatHexDimensions(size);

  // Verify.
  assert.ok(result);
  assert.equal(result.w, 20);
  assert.equal(round4(result.h), 17.3205);
});

QUnit.test("flatHexSpacing()", assert => {
  // Setup.
  const size = 10;

  // Run.
  const result = HBUtils.flatHexSpacing(size);

  // Verify.
  assert.ok(result);
  assert.equal(result.w, 15);
  assert.equal(round4(result.h), 17.3205);
});

QUnit.test("flatHexToPixel()", assert => {
  // Setup.
  const q = 1;
  const r = 2;
  const hex = HBUtils.createHex({ q, r });
  const size = 10;

  // Run.
  const result = HBUtils.flatHexToPixel(hex, size);

  // Verify.
  assert.ok(result);
  assert.equal(result.x, 15);
  assert.equal(result.y, 43);
});

QUnit.test("hexDiagonalNeighbor() 0", assert => {
  // Setup.
  const q = 1;
  const r = 2;
  const hex = HBUtils.createHex({ q, r });
  const direction = 0;

  // Run.
  const result = HBUtils.hexDiagonalNeighbor(hex, direction);

  // Verify.
  assert.ok(result);
  assert.equal(result.q, q + 2);
  assert.equal(result.r, r - 1);
});

QUnit.test("hexNeighbor() 0", assert => {
  // Setup.
  const q = 1;
  const r = 2;
  const hex = HBUtils.createHex({ q, r });
  const direction = 0;

  // Run.
  const result = HBUtils.hexNeighbor(hex, direction);

  // Verify.
  assert.ok(result);
  assert.equal(result.q, q + 1);
  assert.equal(result.r, r - 0);
});

QUnit.test("pointyHexCorner() 0", assert => {
  // Setup.
  const center = HBUtils.createPoint({ x: 5, y: 5 });
  const size = 10;

  // Run.
  const result = HBUtils.pointyHexCorner(center, size, 0);

  // Verify.
  assert.ok(result);
  assert.equal(result.x, 14);
  assert.equal(result.y, 0);
});

QUnit.test("pointyHexCorner() 1", assert => {
  // Setup.
  const center = HBUtils.createPoint({ x: 5, y: 5 });
  const size = 10;

  // Run.
  const result = HBUtils.pointyHexCorner(center, size, 1);

  // Verify.
  assert.ok(result);
  assert.equal(result.x, 14);
  assert.equal(result.y, 10);
});

QUnit.test("pointyHexCorner() 2", assert => {
  // Setup.
  const center = HBUtils.createPoint({ x: 5, y: 5 });
  const size = 10;

  // Run.
  const result = HBUtils.pointyHexCorner(center, size, 2);

  // Verify.
  assert.ok(result);
  assert.equal(result.x, 5);
  assert.equal(result.y, 15);
});

QUnit.test("pointyHexCorner() 3", assert => {
  // Setup.
  const center = HBUtils.createPoint({ x: 5, y: 5 });
  const size = 10;

  // Run.
  const result = HBUtils.pointyHexCorner(center, size, 3);

  // Verify.
  assert.ok(result);
  assert.equal(result.x, -4);
  assert.equal(result.y, 10);
});

QUnit.test("pointyHexCorner() 4", assert => {
  // Setup.
  const center = HBUtils.createPoint({ x: 5, y: 5 });
  const size = 10;

  // Run.
  const result = HBUtils.pointyHexCorner(center, size, 4);

  // Verify.
  assert.ok(result);
  assert.equal(result.x, -4);
  assert.equal(result.y, 0);
});

QUnit.test("pointyHexCorner() 5", assert => {
  // Setup.
  const center = HBUtils.createPoint({ x: 5, y: 5 });
  const size = 10;

  // Run.
  const result = HBUtils.pointyHexCorner(center, size, 5);

  // Verify.
  assert.ok(result);
  assert.equal(result.x, 5);
  assert.equal(result.y, -5);
});

QUnit.test("pointyHexDimensions()", assert => {
  // Setup.
  const size = 10;

  // Run.
  const result = HBUtils.pointyHexDimensions(size);

  // Verify.
  assert.ok(result);
  assert.equal(round4(result.w), 17.3205);
  assert.equal(result.h, 20);
});

QUnit.test("pointyHexSpacing()", assert => {
  // Setup.
  const size = 10;

  // Run.
  const result = HBUtils.pointyHexSpacing(size);

  // Verify.
  assert.ok(result);
  assert.equal(round4(result.w), 17.3205);
  assert.equal(result.h, 15);
});

QUnit.test("pointyHexToPixel()", assert => {
  // Setup.
  const q = 1;
  const r = 2;
  const hex = HBUtils.createHex({ q, r });
  const size = 10;

  // Run.
  const result = HBUtils.pointyHexToPixel(hex, size);

  // Verify.
  assert.ok(result);
  assert.equal(result.x, 35);
  assert.equal(result.y, 30);
});

const HexBoardUtilitiesTest = {};
export default HexBoardUtilitiesTest;
