const Token = {
  KING: "king",
  QUEEN: "queen",
  ROOK: "rook",
  BISHOP: "bishop",
  KNIGHT: "knight",
  PAWN: "pawn",

  properties: {
    king: {
      blackChar: "\u265A",
      blackFen: "k",
      whiteChar: "\u265A",
      whiteFen: "K",
      key: "king"
    },
    queen: {
      blackChar: "\u265B",
      blackFen: "q",
      whiteChar: "\u265B",
      whiteFen: "Q",
      key: "queen"
    },
    rook: {
      blackChar: "\u265C",
      blackFen: "r",
      whiteChar: "\u265C",
      whiteFen: "R",
      key: "rook"
    },
    bishop: {
      blackChar: "\u265D",
      blackFen: "b",
      whiteChar: "\u265D",
      whiteFen: "B",
      key: "bishop"
    },
    knight: {
      blackChar: "\u265E",
      blackFen: "n",
      whiteChar: "\u265E",
      whiteFen: "N",
      key: "knight"
    },
    pawn: {
      blackChar: "\u265F",
      blackFen: "p",
      whiteChar: "\u265F",
      whiteFen: "P",
      key: "pawn"
    }
  }
};

Token.findByFenChar = fenChar => {
  const whiteTokens = R.filter(t => t.whiteFen === fenChar, Object.values(Token.properties));

  if (whiteTokens.length > 0) {
    return whiteTokens[0];
  }

  const blackTokens = R.filter(t => t.blackFen === fenChar, Object.values(Token.properties));

  if (blackTokens.length > 0) {
    return blackTokens[0];
  }

  return null;
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
