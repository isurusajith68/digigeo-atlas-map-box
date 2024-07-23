import React from "react";
import { Layer, Source } from "react-map-gl";
import {
  clusterCountLayer,
  clusterCountLayerStyle,
  layerStyle,
  unclusteredPointLayer,
  unclusteredPointLayerStyle,
} from "./sync-prop-layer-style";

const SyncPropLayer = () => {
  const [syncPropertyFeatures, setsyncPropertyFeatures] = React.useState({
    type: "FeatureCollection",
    features: [],
  });

  React.useEffect(() => {
    getSyncPropertiesGeometry();
  }, []);

  const getSyncPropertiesGeometry = React.useCallback(async () => {
    const f = async (limit, offset) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/matlas/all_tbl_sync_property_4326`,
        { cache: "no-store" }
      );
      const d = await res.json();

      // const geojson = {
      //   type: "FeatureCollection",
      //   features: d.data[0].json_build_object.features,
      // };
      // console.log(d.data[0].json_build_object);
      setsyncPropertyFeatures(d.data[0].json_build_object);
    };
    f(10662, 0).catch(console.error);
  }, []);

  return (
    <Source
      id="my-data"
      type="geojson"
      data={syncPropertyFeatures}
      cluster={true}
      clusterMaxZoom={14}
      clusterRadius={50}
    >
      <Layer {...layerStyle} />
      <Layer {...clusterCountLayerStyle} />
      <Layer {...unclusteredPointLayerStyle} />
    </Source>
  );
};
export default SyncPropLayer;
