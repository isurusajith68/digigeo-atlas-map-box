import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
  Icon,
  Text,
} from "ol/style";
import {
  svgDeposit,
  svgHisMine,
  svgOccurence,
  svgOpMine,
  svgZone,
} from "./assets-svg";

export const getText = function (feature, resolution) {
  // const type = dom.text.value;
  const maxResolution = 1000;
  let text = feature.get("asset_name");
  //console.log(text);
  if (text == undefined) {
    //console.log("asset_name is und");
    text = feature.get("howner_ref");
    //console.log("owner ref hot p", text);
  }
  if (resolution > maxResolution) {
    text = "";
  }
  // else if (type == "hide") {

  //   text = "";
  // } else if (type == "shorten") {
  //   text = text.trunc(12);
  // } else if (
  //   type == "wrap" &&
  //   (!dom.placement || dom.placement.value != "line")
  // ) {
  //   text = stringDivider(text, 16, "\n");
  // }

  return text;
};

export const createTextStyle = function (feature, resolution) {
  return new Text({
    font: "bold 14px serif",
    text: getText(feature, resolution),

    offsetX: 0,
    offsetY: +25,
  });
};

export const assetTypesColorMappings = [
  { type: "Occurrence", color: "blue", src: "" },
  { type: "Zone", color: "red", src: "svgicons/zone_black.svg" },
  { type: "Refinery", color: "grey", src: "" },
  { type: "Mill", color: "cyan", src: "" },
  { type: "Deposit", color: "pink", src: "svgicons/deposit_black.svg" },
  { type: "Smelter", color: "orange", src: "" },
  { type: "Plant", color: "darkmagenta", src: "" },
  { type: "Tailings", color: "brown", src: "" },
  {
    type: "Operating Mine",
    color: "black",
    src: "svgicons/producing_black.svg",
  },
  {
    type: "Historical Mine",
    color: "green",
    src: "svgicons/past_producer_black.svg",
  },
];
