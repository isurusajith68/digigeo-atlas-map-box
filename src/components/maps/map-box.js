import { useSideBarStore } from "@/store/urlParam-slice";
import * as React from "react";
import Map, { Layer, Source } from "react-map-gl";

function Mapbox() {
  const { setIsCollapsed, isCollapsed } = useSideBarStore();

  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.4, 37.8] },
      },
    ],
  };

  const layerStyle = {
    id: "point",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#007cbf",
    },
  };

  
  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
      }}
      style={{
        minHeight: "calc(100dvh - 64px)",
        minWidth: isCollapsed ? "99.9vw" : "calc(100vw - 260px)",
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Source id="my-data" type="geojson" data={geojson}>
        <Layer {...layerStyle} />
      </Source>
    </Map>
  );
}

export default Mapbox;
