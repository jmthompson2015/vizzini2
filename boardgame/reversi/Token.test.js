import Token from "./Token.js";

QUnit.module("Token");

QUnit.test("findCharByFenChar", assert => {
  assert.equal(Token.findCharByFenChar("P"), "\u2B24");

  assert.equal(Token.findCharByFenChar("p"), "\u2B24");

  assert.equal(Token.findCharByFenChar(), null);
  assert.equal(Token.findCharByFenChar(null), null);
  assert.equal(Token.findCharByFenChar(""), null);
  assert.equal(Token.findCharByFenChar("L"), null);
});

const CoordinateCalculatorTest = {};
export default CoordinateCalculatorTest;
