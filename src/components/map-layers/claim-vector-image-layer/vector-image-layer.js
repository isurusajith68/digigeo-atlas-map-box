"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { METERS_PER_UNIT } from "ol/proj/Units";
import { useZustand } from "use-zustand";
import { bbox } from "ol/loadingstrategy";
import { styleFunctionClaim } from "./vector-layer-style";
import { useMapScale } from "@/store/urlParam-slice";
import GeoJSON from "ol/format/GeoJSON";
import { useLayerVectorImageLoading } from "@/store/landing-map-slice";
import { useClaimVectorLayerVisibility } from "@/store/layer-slice";
import {
  useClaimLabel,
  useClaimLayerVisibility,
  useClaimOutline,
} from "@/store/claim-sidebar-btn";
import { Fill, Stroke, Style, Text } from "ol/style";

const VectorImageLayer = () => {
  const claimVectorImgLayerRef = useRef(null);
  const claimVectorImgSourceRef = useRef(null);

  const DOTS_PER_INCH = 72;
  const INCHES_PER_METRE = 39.37;

  const [mapUnits, setmapUnits] = useState("m");

  function inchesPreUnit(unit) {
    return METERS_PER_UNIT[unit] * INCHES_PER_METRE;
  }
  const getMapResolution = (scale, unit) => {
    return scale / (inchesPreUnit(unit) * DOTS_PER_INCH);
  };

  const setVectorLayerImageLoading = useZustand(
    useLayerVectorImageLoading,
    (state) => state.setVectorLayerImageLoading
  );

  const claimLayerVisibility = useZustand(
    useClaimLayerVisibility,
    (state) => state.claimLayerVisibility
  );

  const claimLabel = useZustand(useClaimLabel, (state) => state.claimLabel);

  const claimOutline = useZustand(
    useClaimOutline,
    (state) => state.claimOutline
  );

  const scale = useZustand(useMapScale, (state) => state.scale);
  const claimLoaderFunc = useCallback((extent, resolution, projection) => {
    setVectorLayerImageLoading("loading");

    const url =
      `https://atlas.ceyinfo.cloud/matlas/view_tbl01_claims_bb` +
      `/${extent.join("/")}`;
    fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "no-store",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.data) {
          if (json.data[0].json_build_object.features) {
            const features = new GeoJSON().readFeatures(
              json.data[0].json_build_object
            );
            claimVectorImgSourceRef.current.addFeatures(features);
          }
        }
        setVectorLayerImageLoading("loaded");
      })
      .catch((error) => {
        console.error("Error:", error);
        setVectorLayerImageLoading("error");
      });
  }, []);

  //claim vector image layer visibility
  useEffect(() => {
    if (claimLayerVisibility) {
      claimVectorImgLayerRef.current.setVisible(true);
    } else {
      claimVectorImgLayerRef.current.setVisible(false);
    }
  }, [claimLayerVisibility]);

  const styleFunctionClaim = (feature, resolution) => {
    const colour = "#D3D3D3";

    let fill = new Fill({
      color: colour,
      opacity: 1,
    });

    let textObj;

    const claimno = feature.get("claimno");

    textObj = new Text({
      font: "10px serif",
      text: claimno,

      offsetX: 2,
      offsetY: -13,
    });

    const style = new Style({
      stroke: claimOutline
        ? new Stroke({
            color: "#707070",
            width: 1,
          })
        : null,

      text: claimLabel ? textObj : null,
      fill: claimOutline ? fill : null,
    });

    return style;
  };

  return (
    <olLayerVectorImage
      ref={claimVectorImgLayerRef}
      style={styleFunctionClaim}
      minResolution={0}
      maxResolution={
        getMapResolution(scale?.claimscale ?? 350000, mapUnits) ?? 150
      }
    >
      <olSourceVector
        ref={claimVectorImgSourceRef}
        strategy={bbox}
        loader={claimLoaderFunc}
      ></olSourceVector>
    </olLayerVectorImage>
  );
};
export default VectorImageLayer;
