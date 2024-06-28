import React, { useCallback, useEffect, useState } from "react";
import { Layer, Source } from "react-map-gl";

const layerStyles = {
  Deposit: {
    id: "deposit",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#bf7c00",
    },
  },
  Occurrence: {
    id: "occurrence",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#ff00ff",
    },
  },
  Zone: {
    id: "zone",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#007cbf",
    },
  },
  "Operating Mine": {
    id: "operating-mine",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#00ff00",
    },
  },
  "Historical Mine": {
    id: "historical-mine",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#7cbf00",
    },
  },
  Mill: {
    id: "mill",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#bf007c",
    },
  },
  Refinery: {
    id: "refinery",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#ff7f50",
    },
  },
  Plant: {
    id: "plant",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#32cd32",
    },
  },
  Tailings: {
    id: "tailings",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#800080",
    },
  },
  Smelter: {
    id: "smelter",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#ffa500",
    },
  },
};

const AssetsLayerMapBox = () => {
  const [assets, setAssets] = useState({
    type: "FeatureCollection",
    features: [],
  });

  useEffect(() => {
    assetLoaderFunc();
  }, []);

  const assetLoaderFunc = useCallback(() => {
    const url = `https://atlas.ceyinfo.cloud/matlas/assets_byextent_4326`;

    fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Typ e": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.data) {
          if (json.data[0].json_build_object.features) {
            setAssets(json.data[0].json_build_object);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const groupedAssets = assets.features.reduce((acc, feature) => {
    const assetType = feature.properties.asset_type;

    if (!acc[assetType]) {
      acc[assetType] = [];
    }
    acc[assetType].push(feature);
    return acc;
  }, {});

  console.log(groupedAssets);
  const assetTypes = new Set(
    assets.features.map((feature) => feature.properties.asset_type)
  );
  console.log("Unique Asset Types:", Array.from(assetTypes));

  return (
    <>
      {Object.keys(groupedAssets).map((assetType) => (
        <Source
          key={assetType}
          id={`asset-${assetType}`}
          type="geojson"
          data={{
            type: "FeatureCollection",
            features: groupedAssets[assetType],
          }}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...(layerStyles[assetType] || layerStyles["Zone"])} />
        </Source>
      ))}
    </>
  );
};

export default AssetsLayerMapBox;
