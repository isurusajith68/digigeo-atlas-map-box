"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { areaMapAssetVectorLayerStyleFunctionCluster } from "../assets-clustter-layer/assets-clustter-style";
import { bbox } from "ol/loadingstrategy";
import GeoJSON from "ol/format/GeoJSON";
import { useZustand } from "use-zustand";
import { useLayerAssetsLoading } from "@/store/landing-map-slice";
import { useAssetsPointVisibility } from "@/store/assets-sidebar-btn";
import { useShowAllAssets } from "@/store/global-search";

const AssetsClusterSearchLayer = () => {
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

  // const { showAssets, setShowAssets } = useShowAllAssets();

  const showAssets = useZustand(useShowAllAssets, (state) => state.showAssets);

  useEffect(() => {
    assetLoaderFunc();
  }, []);

  const assetLoaderFunc = useCallback((extent, resolution, projection) => {
    // const url = `${process.env.NEXT_PUBLIC_API_URL}/matlas/search_tbl_sync_asset_xy`;
    // setAssetsLayerLoading("loading");
    // fetch(url, {
    //   method: "GET",
    //   mode: "cors",
    //   cache: "no-store",
    //   credentials: "same-origin",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((json) => {
    //     const data = json.data;
    const newFeatures = showAssets?.map((item) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        crs: {
          type: "name",
          properties: {
            name: "EPSG:3857",
          },
        },
        coordinates: [item.x, item.y],
      },
    }));

    const features = {
      type: "FeatureCollection",
      crs: {
        type: "name",
        properties: {
          name: "EPSG:3857",
        },
      },
      features: newFeatures,
    };
    const geoJsonFormat = new GeoJSON();
    const olFeatures = geoJsonFormat.readFeatures(features);
    assetSourceRef.current.clear();
    assetSourceRef.current.addFeatures(olFeatures);

    setAssetsLayerLoading("loaded");
    // })
    // .catch((error) => {
    //   setAssetsLayerLoading("error");
    // });
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
export default AssetsClusterSearchLayer;
