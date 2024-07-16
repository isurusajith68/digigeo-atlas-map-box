import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";

const styles = {
  Polygon: new Style({
    stroke: new Stroke({
      color: "blue",
      lineDash: [4],
      width: 3,
    }),
    fill: new Fill({
      color: "rgba(0, 0, 255, 0.1)",
    }),
  }),
  MultiPolygon: new Style({
    stroke: new Stroke({
      color: "yellow",
      width: 1,
    }),
    fill: new Fill({
      color: "rgba(255, 255, 0, 0.1)",
    }),
  }),
};

export const styleFunction = (feature) => {
  return styles[feature.getGeometry().getType()];
};
