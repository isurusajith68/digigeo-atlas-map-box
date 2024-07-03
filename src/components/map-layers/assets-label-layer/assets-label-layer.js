"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { areaMapAssetVectorLayerStyleFunction } from "./assets-layer-style";
import { bbox } from "ol/loadingstrategy";
import GeoJSON from "ol/format/GeoJSON";
import { useZustand } from "use-zustand";
import { useLayerAssetsLoading } from "@/store/landing-map-slice";
import { useAssetsLayerVisibility } from "@/store/layer-slice";
import {
  useAssetDepositVisibility,
  useAssetHistoricalMinesVisibility,
  useAssetOccurrenceVisibility,
  useAssetOperatingMinesVisibility,
  useAssetZoneVisibility,
} from "@/store/assets-sidebar-btn";
import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
  Icon,
  Text,
} from "ol/style";
const AssetsLabelLayer = () => {
  const assetLayerRef = useRef(null);
  const assetSourceRef = useRef(null);
  const [maxResolutionAssets, setmaxResolutionAssets] = useState(300);

  const setAssetsLayerLoading = useZustand(
    useLayerAssetsLoading,
    (state) => state.setAssetsLayerLoading
  );

  const assetsLayerVisibility = useZustand(
    useAssetsLayerVisibility,
    (state) => state.assetsLayerVisibility
  );

  const assetOperatingMinesVisibility = useZustand(
    useAssetOperatingMinesVisibility,
    (state) => state.assetOperatingMinesVisibility
  );

  const assetDepositVisibility = useZustand(
    useAssetDepositVisibility,
    (state) => state.assetDepositVisibility
  );

  const assetHistoricalMinesVisibility = useZustand(
    useAssetHistoricalMinesVisibility,
    (state) => state.assetHistoricalMinesVisibility
  );

  const assetZoneVisibility = useZustand(
    useAssetZoneVisibility,
    (state) => state.assetZoneVisibility
  );

  const assetOccurrenceVisibility = useZustand(
    useAssetOccurrenceVisibility,
    (state) => state.assetOccurrenceVisibility
  );

  const assetLoaderFunc = useCallback((extent, resolution, projection) => {
    const url =
      `https://atlas.ceyinfo.cloud/matlas/assets_byextent` +
      `/${extent.join("/")}`;
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
    if (assetsLayerVisibility) {
      assetLayerRef.current?.setVisible(true);
    } else {
      assetLayerRef.current?.setVisible(false);
    }
  }, [assetsLayerVisibility]);

  useEffect(() => {
    const fs = assetSourceRef?.current?.getFeatures();

    if (fs) {
      if (assetOperatingMinesVisibility) {
        fs.forEach((f) => {
          if (f.get("asset_type") == "Operating Mine") {
            f.setStyle(null);
          }
        });
      } else {
        fs.forEach((f) => {
          if (f.get("asset_type") == "Operating Mine") {
            f.setStyle(new Style({}));
          }
        });
      }
    }
  }, [assetOperatingMinesVisibility]);

  useEffect(() => {
    const fs = assetSourceRef?.current?.getFeatures();
    if (fs) {
      if (assetDepositVisibility) {
        fs.forEach((f) => {
          if (f.get("asset_type") == "Deposit") {
            f.setStyle(null);
          }
        });
      } else {
        fs.forEach((f) => {
          if (f.get("asset_type") == "Deposit") {
            f.setStyle(new Style({}));
          }
        });
      }
    }
  }, [assetDepositVisibility]);

  useEffect(() => {
    const fs = assetSourceRef?.current?.getFeatures();
    if (fs) {
      if (assetZoneVisibility) {
        fs.forEach((f) => {
          if (f.get("asset_type") == "Zone") {
            f.setStyle(null);
          }
        });
      } else {
        fs.forEach((f) => {
          if (f.get("asset_type") == "Zone") {
            f.setStyle(new Style({}));
          }
        });
      }
    }
  }, [assetZoneVisibility]);

  useEffect(() => {
    const fs = assetSourceRef?.current?.getFeatures();
    if (fs) {
      if (assetHistoricalMinesVisibility) {
        fs.forEach((f) => {
          if (f.get("asset_type") == "Historical Mine") {
            f.setStyle(null);
          }
        });
      } else {
        fs.forEach((f) => {
          if (f.get("asset_type") == "Historical Mine") {
            f.setStyle(new Style({}));
          }
        });
      }
    }
  }, [assetHistoricalMinesVisibility]);

  useEffect(() => {
    const fs = assetSourceRef?.current?.getFeatures();
    if (fs) {
      if (assetOccurrenceVisibility) {
        fs.forEach((f) => {
          if (f.get("asset_type") == "Occurrence") {
            f.setStyle(null);
          }
        });
      } else {
        fs.forEach((f) => {
          if (f.get("asset_type") == "Occurrence") {
            f.setStyle(new Style({}));
          }
        });
      }
    }
  }, [assetOccurrenceVisibility]);
  return (
    <olLayerVector
      ref={assetLayerRef}
      style={areaMapAssetVectorLayerStyleFunction}
      minResolution={0}
      maxResolution={maxResolutionAssets}
    >
      <olSourceVector
        ref={assetSourceRef}
        loader={assetLoaderFunc}
        strategy={bbox}
      ></olSourceVector>
    </olLayerVector>
  );
};
export default AssetsLabelLayer;
