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
} from "../assets-layer/assets-svg";

const getText = function (feature, resolution) {
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

const createTextStyle = function (feature, resolution) {
  return new Text({
    font: "bold 14px serif",
    text: getText(feature, resolution),

    offsetX: 0,
    offsetY: +25,
  });
};

const assetTypesColorMappings = [
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

export const areaMapAssetVectorLayerStyleFunctionCluster = (
  feature,
  resolution
) => {
  // const colour = feature.values_.colour;
  const colour = "#0052ac";

  const fill = new Fill({
    color: colour,
    opacity: 1,
  });

  const stroke = new Stroke({
    color: "#3399CC",
    width: 1.25,
  });

  let svgScale = 0.5;
  let radius = 2;


  let image;
  let text;

  let textObj;
  const size = feature.get("features").length;
  if (size == 1 && resolution < 5000) {
    const propName = feature.get("features")[0].get("asset_name");
    textObj = new Text({
      //       // textAlign: align == "" ? undefined : align,
      //       // textBaseline: baseline,
      font: "bold 16px serif",
      text: propName,
      // fill: new Fill({ color: fillColor }),
      // stroke: new Stroke({ color: outlineColor, width: outlineWidth }),
      offsetX: 2,
      offsetY: -19,
      // placement: placement,
      // maxAngle: maxAngle,
      // overflow: overflow,
      // rotation: rotation,
    });
  } else {
    textObj = new Text({
      text: size.toString(),

      fill: new Fill({
        color: "#fff",
      }),
    });
  }

  

  // text = createTextStyle(feature, resolution);
  image = new CircleStyle({
    radius: 9,
    fill: new Fill({ color: colour }),
    // stroke: new Stroke({ color: "#8B4513", width: 3 }),
  });
  const st = new Style({
    // stroke: new Stroke({
    //   color: "#021691",
    //   width: 2,
    // }),
    image,
    text: textObj,
    // fill,
  });

  return st;
};
