export const layerStyle = {
  id: "clusters",
  type: "circle",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
      "step",
      ["get", "point_count"],
      "#f8d90f",
      100,
      "#00addc",
      750,
      "#f28cb1",
    ],
    "circle-radius": ["step", ["get", "point_count"], 15, 100, 20, 750, 30],
  },
};

export const clusterCountLayerStyle = {
  id: "cluster-count",
  type: "symbol",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 12,
  },
};

export const unclusteredPointLayerStyle = {
  id: "unclustered-point",
  type: "circle",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": "#f8d90f",
    "circle-radius": 6,
    "circle-stroke-width": 2,
    "circle-stroke-color": "#fff",
  },
};
