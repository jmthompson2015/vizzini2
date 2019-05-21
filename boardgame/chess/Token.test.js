import Token from "./Token.js";

QUnit.module("Token");

QUnit.test("findByFenChar", assert => {
  assert.equal(Token.findByFenChar("K").key, "king");
  assert.equal(Token.findByFenChar("Q").key, "queen");
  assert.equal(Token.findByFenChar("R").key, "rook");
  assert.equal(Token.findByFenChar("B").key, "bishop");
  assert.equal(Token.findByFenChar("N").key, "knight");
  assert.equal(Token.findByFenChar("P").key, "pawn");

  assert.equal(Token.findByFenChar("k").key, "king");
  assert.equal(Token.findByFenChar("q").key, "queen");
  assert.equal(Token.findByFenChar("r").key, "rook");
  assert.equal(Token.findByFenChar("b").key, "bishop");
  assert.equal(Token.findByFenChar("n").key, "knight");
  assert.equal(Token.findByFenChar("p").key, "pawn");
});

QUnit.test("findCharByFenChar", assert => {
  assert.equal(Token.findCharByFenChar("K"), "\u2654");
  assert.equal(Token.findCharByFenChar("Q"), "\u2655");
  assert.equal(Token.findCharByFenChar("R"), "\u2656");
  assert.equal(Token.findCharByFenChar("B"), "\u2657");
  assert.equal(Token.findCharByFenChar("N"), "\u2658");
  assert.equal(Token.findCharByFenChar("P"), "\u2659");

  assert.equal(Token.findCharByFenChar("k"), "\u265A");
  assert.equal(Token.findCharByFenChar("q"), "\u265B");
  assert.equal(Token.findCharByFenChar("r"), "\u265C");
  assert.equal(Token.findCharByFenChar("b"), "\u265D");
  assert.equal(Token.findCharByFenChar("n"), "\u265E");
  assert.equal(Token.findCharByFenChar("p"), "\u265F");
});

const TokenTest = {};
export default TokenTest;
