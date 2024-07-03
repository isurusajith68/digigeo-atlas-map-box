"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { areaMapAssetVectorLayerStyleFunctionCluster } from "./assets-clustter-style";
import { bbox } from "ol/loadingstrategy";
import GeoJSON from "ol/format/GeoJSON";
import { useZustand } from "use-zustand";
import { useLayerAssetsLoading } from "@/store/landing-map-slice";
import { useAssetsPointVisibility } from "@/store/assets-sidebar-btn";

const AssetsClusterLayer = () => {
  const assetLayerRef = useRef(null);
  const assetSourceRef = useRef(null);
  const [maxResolutionAssets, setmaxResolutionAssets] = useState(300);
  const [distance, setDistance] = useState(40);
  const [minDistance, setMinDistance] = useState(20);
  const setAssetsLayerLoading = useZustand(
    useLayerAssetsLoading,
    (state) => state.setAssetsLayerLoading
  );

  const assetsPointVisibility = useZustand(
    useAssetsPointVisibility,
    (state) => state.assetsPointVisibility
  );

  useEffect(() => {
    assetLoaderFunc();
  }, []);

  const assetLoaderFunc = useCallback((extent, resolution, projection) => {
    const url = `https://atlas.ceyinfo.cloud/matlas/assets_by_no_extent`;
    setAssetsLayerLoading("loading");
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

            assetSourceRef.current.clear();
            assetSourceRef.current.addFeatures(features);
          }
        }
        setAssetsLayerLoading("loaded");
      })
      .catch((error) => {
        setAssetsLayerLoading("error");
      });
  }, []);

  useEffect(() => {
    if (assetsPointVisibility) {
      assetLayerRef.current.setVisible(true);
    } else {
      assetLayerRef.current.setVisible(false);
    }
  }, [assetsPointVisibility]);

  return (
    <olLayerVector
      ref={assetLayerRef}
      // style={areaMapAssetVectorLayerStyleFunction}
      style={areaMapAssetVectorLayerStyleFunctionCluster}
      minResolution={300}
      //   maxResolution={maxResolutionAssets}
    >
      <olSourceCluster distance={distance} minDistance={minDistance}>
        <olSourceVector ref={assetSourceRef}></olSourceVector>
      </olSourceCluster>
    </olLayerVector>
  );
};
export default AssetsClusterLayer;
