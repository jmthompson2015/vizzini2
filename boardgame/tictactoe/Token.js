const Token = {
  X: "x",
  O: "o",

  properties: {
    x: {
      fen: "x",
      key: "x"
    },
    o: {
      fen: "o",
      key: "o"
    }
  }
};

Token.keys = () => Object.keys(Token.properties);

Token.values = () => Object.values(Token.properties);

Token.findByFenChar = fenChar => {
  const tokens = R.filter(t => t.fen === fenChar, Token.values());

  if (tokens.length > 0) {
    return tokens[0];
  }

  return null;
};

export default Token;
