import { useSideBarStore } from "@/store/urlParam-slice";
import * as React from "react";
import Map, { useMap } from "react-map-gl";
import SyncPropLayer from "../map-box-layer/sync-prop-layer/sync-prop-layer";
import AssetsLayer from "../map-layers/assets-layer/assets-layer";
import AssetsLayerMapBox from "../map-box-layer/assets-layer/assets-layer-map-box";

function Mapbox() {
  const { isCollapsed } = useSideBarStore();

  return (
    <div
      style={{
        position: "absolute",
      }}
    >
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 2,
        }}
        minZoom={2}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        style={{
          minHeight: "calc(100dvh - 64px)",
          minWidth: isCollapsed ? "99.9vw" : "calc(100vw - 260px)",
        }}
      >
        <SyncPropLayer />
        {/* <AssetsLayerMapBox /> */}
      </Map>
    </div>
  );
}

export default Mapbox;

//  const geojson = {
//    type: "Feature",
//    properties: {
//      title: "Colorado",
//    },
//    geometry: {
//      type: "Polygon",
//      coordinates: [
//        [
//          [-108.977199, 40.975108],
//          [-102.105019, 40.995138],
//          [-102.078486, 37.017605],
//          [-109.083333, 37.017605],
//          [-108.977199, 40.975108],
//        ],
//        [
//          [-125.977199, 40.975108],
//          [-125.105019, 35.995138],
//          [-125.078486, 26.017605],
//          [-125.083333, 26.017605],
//          [-125.977199, 40.975108],
//        ],
//      ],
//    },
//  };

// onLoad={(event) => {
//   const map = event.target;
//   map.loadImage(
//     "https://docs.mapbox.com/mapbox-gl-js/assets/colorado_flag.png",
//     (err, image) => {
//       if (err) throw err;
//       if (!map.hasImage("pattern")) map.addImage("pattern", image);
//       map.addLayer({
//         id: "pattern-layer",
//         type: "fill",
//         source: "my-data",
//         layout: {},
//         paint: {
//           "fill-pattern": "pattern",
//         },
//       });
//     }
//   );
// }}
