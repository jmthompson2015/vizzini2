const Token = {
  ARCHER: "archer",
  BERSERKER: "berserker",
  CAVALRY: "cavalry",
  CROSSBOWMAN: "crossbowman",
  ENSIGN: "ensign",
  FOOTMAN: "footman",
  KNIGHT: "knight",
  LANCER: "lancer",
  LIGHT_CAVALRY: "lightCavalry",
  MARSHALL: "marshall",
  MERCENARY: "mercenary",
  PIKEMAN: "pikeman",
  ROYAL_GUARD: "royalGuard",
  SCOUT: "scout",
  SWORDSMAN: "swordsman",
  WARRIOR_PRIEST: "warriorPriest",
  RAVEN: "raven",
  WOLF: "wolf",

  properties: {
    archer: {
      name: "Archer",
      image: "resource/Archer.png",
      key: "archer"
    },
    berserker: {
      name: "Berserker",
      image: "resource/Berserker.png",
      key: "berserker"
    },
    cavalry: {
      name: "Cavalry",
      image: "resource/Cavalry.png",
      key: "cavalry"
    },
    crossbowman: {
      name: "Crossbowman",
      image: "resource/Crossbowman.png",
      key: "crossbowman"
    },
    ensign: {
      name: "Ensign",
      image: "resource/Ensign.png",
      key: "ensign"
    },
    footman: {
      name: "Footman",
      image: "resource/Footman.png",
      key: "footman"
    },
    knight: {
      name: "Knight",
      image: "resource/Knight.png",
      key: "knight"
    },
    lancer: {
      name: "Lancer",
      image: "resource/Lancer.png",
      key: "lancer"
    },
    lightCavalry: {
      name: "Light Cavalry",
      image: "resource/LightCavalry.png",
      key: "lightCavalry"
    },
    marshall: {
      name: "Marshall",
      image: "resource/Marshall.png",
      key: "marshall"
    },
    mercenary: {
      name: "Mercenary",
      image: "resource/Mercenary.png",
      key: "mercenary"
    },
    pikeman: {
      name: "Pikeman",
      image: "resource/Pikeman.png",
      key: "pikeman"
    },
    royalGuard: {
      name: "Royal Guard",
      image: "resource/RoyalGuard.png",
      key: "royalGuard"
    },
    scout: {
      name: "Scout",
      image: "resource/Scout.png",
      key: "scout"
    },
    swordsman: {
      name: "Swordsman",
      image: "resource/Swordsman.png",
      key: "swordsman"
    },
    warriorPriest: {
      name: "Warrior Priest",
      image: "resource/WarriorPriest.png",
      key: "warriorPriest"
    },
    raven: {
      name: "Raven Control Marker",
      image: "resource/RavenControlMarker.png",
      key: "raven"
    },
    wolf: {
      name: "Wolf Control Marker",
      image: "resource/WolfControlMarker.png",
      key: "wolf"
    }
  }
};

Token.keys = () => Object.keys(Token.properties);

Token.values = () => Object.values(Token.properties);

Object.freeze(Token);

export default Token;
