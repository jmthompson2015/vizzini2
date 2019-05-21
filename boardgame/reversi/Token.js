const Token = {
  PAWN: "pawn",

  properties: {
    pawn: {
      blackChar: "\u2B24",
      blackFen: "P",
      whiteChar: "\u2B24",
      whiteFen: "p",
      key: "pawn"
    }
  }
};

Token.findCharByFenChar = fenChar => {
  const whiteTokens = R.filter(t => t.whiteFen === fenChar, Object.values(Token.properties));

  if (whiteTokens.length > 0) {
    return whiteTokens[0].whiteChar;
  }

  const blackTokens = R.filter(t => t.blackFen === fenChar, Object.values(Token.properties));

  if (blackTokens.length > 0) {
    return blackTokens[0].blackChar;
  }

  return null;
};

Object.freeze(Token);

export default Token;
