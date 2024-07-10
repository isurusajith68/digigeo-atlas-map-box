"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  areaMapAssetVectorLayerStyleFunction,
  assetTypesColorMappings,
  createTextStyle,
} from "./assets-layer-style";
import { bbox } from "ol/loadingstrategy";
import GeoJSON from "ol/format/GeoJSON";
import { useZustand } from "use-zustand";
import { useLayerAssetsLoading } from "@/store/landing-map-slice";
import { useAssetsLayerVisibility } from "@/store/layer-slice";
import {
  useAssetDepositVisibility,
  useAssetHistoricalMinesVisibility,
  useAssetLabelVisibility,
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
import {
  svgDeposit,
  svgHisMine,
  svgOccurence,
  svgOpMine,
  svgZone,
} from "./assets-svg";
const AssetsLayer = () => {
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

  const assetLabelVisibility = useZustand(
    useAssetLabelVisibility,
    (state) => state.assetLabelVisibility
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
            console.log(features, "features");
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

  const areaMapAssetVectorLayerStyleFunction = (feature, resolution) => {
    const colour = feature.values_.colour;

    const fill = new Fill({
      color: colour,
      opacity: 1,
    });

    const stroke = new Stroke({
      color: "#3399CC",
      width: 1.25,
    });

    let svgScale = 0;
    let radius = 0;

    if (resolution > 1000) {
      svgScale = 0.5;
      radius = 2;
    } else if (resolution > 937.5) {
      svgScale = 0.562;
      radius = 5;
    } else if (resolution > 875) {
      svgScale = 0.625;
      radius = 5;
    } else if (resolution > 750) {
      svgScale = 0.75;
      radius = 5;
    } else if (resolution > 625) {
      svgScale = 0.875;
      radius = 5;
    } else if (resolution > 500) {
      svgScale = 1;
      radius = 5;
    } else if (resolution > 375) {
      svgScale = 1.125;
      radius = 5;
    } else if (resolution > 250) {
      svgScale = 1.25;
      radius = 5;
    } else if (resolution > 125) {
      svgScale = 1.375;
      radius = 5;
    } else {
      svgScale = 1.5;
      radius = 10;
    }
    let image;
    let text;

    if (feature.values_.asset_type == assetTypesColorMappings[1].type) {
      image = new Icon({
        src: "data:image/svg+xml;utf8," + encodeURIComponent(svgZone),
        scale: svgScale,
      });
    } else if (feature.values_.asset_type == assetTypesColorMappings[4].type) {
      image = new Icon({
        src: "data:image/svg+xml;utf8," + encodeURIComponent(svgDeposit),
        scale: svgScale,
      });
    } else if (feature.values_.asset_type == assetTypesColorMappings[8].type) {
      image = new Icon({
        src: "data:image/svg+xml;utf8," + encodeURIComponent(svgOpMine),
        scale: svgScale,
      });
    } else if (feature.values_.asset_type == assetTypesColorMappings[9].type) {
      image = new Icon({
        src: "data:image/svg+xml;utf8," + encodeURIComponent(svgHisMine),
        scale: svgScale,
      });
    } else if (feature.values_.asset_type == assetTypesColorMappings[0].type) {
      image = new Icon({
        src: "data:image/svg+xml;utf8," + encodeURIComponent(svgOccurence),
        scale: svgScale,
      });
    }

    text = createTextStyle(feature, resolution);

    const st = new Style({
      stroke: new Stroke({
        color: "#021691",
        width: 2,
      }),
      image,
      text: assetLabelVisibility ? text : null,
      fill,
    });

    return st;
  };

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
export default AssetsLayer;
