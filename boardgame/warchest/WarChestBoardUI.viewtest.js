import WarChestBoardUI from "./WarChestBoardUI.js";

const tokens = {
  b5: "resource/Raven_Control_Marker.png",
  d7: "resource/Wolf_Control_Marker.png",
  e2: "resource/Raven_Control_Marker.png",
  g6: "resource/Wolf_Control_Marker.png",
  h1: "resource/Raven_Control_Marker.png",
  j3: "resource/Wolf_Control_Marker.png"
};

const element = React.createElement(WarChestBoardUI, { tokens });
ReactDOM.render(element, document.getElementById("board"));
