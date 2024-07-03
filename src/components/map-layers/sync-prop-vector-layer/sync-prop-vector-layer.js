import { useCallback, useEffect, useRef, useState } from "react";
import { commodityMap_tbl_syncProperty_commodity_VectorLayerStyleFunction } from "./sync-prop-vector-style";
import GeoJSON from "ol/format/GeoJSON";
import { useZustand } from "use-zustand";
import { useLayerSyncPropLoading } from "@/store/landing-map-slice";
import { useSyncPropertyLayerVisibility } from "@/store/layer-slice";
import {
  usePropertyLabelVisibility,
  usePropertyPointsVisibility,
} from "@/store/property-sidebar-btn";

import {
  Circle,
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
  Icon,
  Text,
} from "ol/style";
const SyncPropVectorLayer = () => {
  const allSyncPropVectorLayerRef = useRef(null);
  const allSyncPropSourceRef = useRef(null);

  const [distance, setDistance] = useState(40);
  const [minDistance, setMinDistance] = useState(20);
  const [syncPropertyFeatures, setsyncPropertyFeatures] = useState();

  useEffect(() => {
    getSyncPropertiesGeometry();
  }, []);

  const setSyncPropLoading = useZustand(
    useLayerSyncPropLoading,
    (state) => state.setSyncPropLoading
  );

  const propertyPointsVisibility = useZustand(
    usePropertyPointsVisibility,
    (state) => state.propertyPointsVisibility
  );

  const propertyLabelVisibility = useZustand(
    usePropertyLabelVisibility,
    (state) => state.propertyLabelVisibility
  )

  const getSyncPropertiesGeometry = useCallback(async () => {
    const f = async (limit, offset) => {
      setSyncPropLoading("loading");
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/all_tbl_sync_property`,
        { cache: "no-store" }
      );
      const d = await res.json();

      const gj = {
        type: "FeatureCollection",
        crs: {
          type: "name",
          properties: {
            name: "EPSG:3857",
          },
        },
        features: d.data[0].json_build_object.features,
      };
      setsyncPropertyFeatures(gj);
      setSyncPropLoading("loaded");
    };
    f(10662, 0).catch(console.error);
  }, []);

  useEffect(() => {
    if (syncPropertyFeatures?.features) {
      const e = new GeoJSON().readFeatures(syncPropertyFeatures);

      allSyncPropSourceRef?.current?.addFeatures(e);
    }
  }, [syncPropertyFeatures]);

  //sync property vector layer visibility
  useEffect(() => {
    if (propertyPointsVisibility) {
      allSyncPropVectorLayerRef.current.setVisible(true);
    } else {
      allSyncPropVectorLayerRef.current.setVisible(false);
    }
  }, [propertyPointsVisibility]);

  const commodityMap_tbl_syncProperty_commodity_VectorLayerStyleFunction = (
    feature,
    resolution,
  ) => {
    const colour = "#e8b52a";

    let fill = new Fill({
      color: colour,
      opacity: 1,
    });

    const stroke = new Stroke({
      color: "#8B4513",
      width: 1.25,
    });

    let image;
    let text;

    image = new Circle({
      radius: 9,
      fill: new Fill({ color: colour }),
    });

    let textObj;
    const size = feature.get("features").length;
    if (size == 1 && resolution < 5000) {
      const propName = feature.get("features")[0].get("prop_name");
      textObj = new Text({
        font: "bold 16px serif",
        text: propertyLabelVisibility ? propName : "",
        offsetX: 2,
        offsetY: -19,
      });
    } else {
      textObj = new Text({
        text: size.toString(),
        fill: new Fill({
          color: "#fff",
        }),
      });
    }

    const style = new Style({
      image,
      text: textObj,
      fill,
    });

    return style;
  };

  return (
    <olLayerVector
      ref={allSyncPropVectorLayerRef}
      style={commodityMap_tbl_syncProperty_commodity_VectorLayerStyleFunction}
    >
      <olSourceCluster distance={distance} minDistance={minDistance}>
        <olSourceVector ref={allSyncPropSourceRef}>
          {/* <PointsAtCoordinates coordinates={coordinates} /> */}
        </olSourceVector>
      </olSourceCluster>
    </olLayerVector>
  );
};
export default SyncPropVectorLayer;
