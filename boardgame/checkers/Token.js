const Token = {
  KING: "king",
  PAWN: "pawn",

  properties: {
    king: {
      blackFen: "K",
      blackImage: "king-black.png",
      whiteFen: "k",
      whiteImage: "king-white.png",
      key: "king"
    },
    pawn: {
      blackFen: "P",
      blackImage: "pawn-black.png",
      whiteFen: "p",
      whiteImage: "pawn-white.png",
      key: "pawn"
    }
  }
};

Token.findImageByFenChar = fenChar => {
  const whiteTokens = R.filter(t => t.whiteFen === fenChar, Object.values(Token.properties));

  if (whiteTokens.length > 0) {
    return whiteTokens[0].whiteImage;
  }

  const blackTokens = R.filter(t => t.blackFen === fenChar, Object.values(Token.properties));

  if (blackTokens.length > 0) {
    return blackTokens[0].blackImage;
  }

  return null;
};

Object.freeze(Token);

export default Token;
