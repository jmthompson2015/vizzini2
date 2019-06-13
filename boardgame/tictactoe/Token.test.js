import Token from "./Token.js";

QUnit.module("Token");

QUnit.test("findByFenChar", assert => {
  assert.equal(Token.findByFenChar("x").key, "x");
  assert.equal(Token.findByFenChar("o").key, "o");
});

const TokenTest = {};
export default TokenTest;
