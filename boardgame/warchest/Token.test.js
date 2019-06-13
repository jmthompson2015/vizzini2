import Token from "./Token.js";

QUnit.module("Token");

QUnit.test("Token properties Archer", assert => {
  const tokenKey = Token.ARCHER;
  const properties = Token.properties[tokenKey];
  assert.equal(properties.name, "Archer");
  assert.equal(properties.image, "resource/Archer.png");
  assert.equal(properties.key, "archer");
});

QUnit.test("keys and values", assert => {
  // Run.
  const result = Token.keys();
  const ownPropertyNames = Object.getOwnPropertyNames(Token);

  // Verify.
  ownPropertyNames.forEach(key => {
    const key2 = Token[key];

    if (key !== "properties" && typeof key2 === "string") {
      assert.ok(Token.properties[key2], `Missing value for key = ${key}`);
    }
  });

  result.forEach(value => {
    const p = ownPropertyNames.filter(key => Token[key] === value);
    assert.equal(p.length, 1, `Missing key for value = ${value}`);
  });
});

QUnit.test("Token.keys()", assert => {
  // Run.
  const result = Token.keys();

  // Verify.
  assert.ok(result);
  const length = 18;
  assert.equal(result.length, length);
  assert.equal(result[0], Token.ARCHER);
  assert.equal(result[length - 1], Token.WOLF);
});

const TokenTest = {};
export default TokenTest;
