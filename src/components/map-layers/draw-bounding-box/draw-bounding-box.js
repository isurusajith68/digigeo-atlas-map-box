"use client";
import "ol/ol.css";
import { useEffect, useState } from "react";
import { createBox } from "ol/interaction/Draw";

import { useZustand } from "use-zustand";
import { useSearchClick } from "@/store/side-bar-slice";

import GeoJSON from "ol/format/GeoJSON";
import { useBoundingBox } from "@/store/extent-sclice";
import { styleFunction } from "./draw-bounding-box-style";
import {
  useBoundaryBoxDrawEnd,
  useSearchPopupMinimize,
} from "@/store/global-search";

const DrawBoundingBox = () => {
  const [vectorSource, setVectorSource] = useState();
  const [geojsonObject, setGeojsonObject] = useState(null);

  const setBoundingBox = useZustand(
    useBoundingBox,
    (state) => state.setBoundingBox
  );

  // const setIsSearchBtnClick = useZustand(
  //   useSearchClick,
  //   (state) => state.setIsSearchBtnClick
  // );

  const boundingBox = useZustand(useBoundingBox, (state) => state.boundingBox);

  const setBoundaryBoxDrawEnd = useZustand(
    useBoundaryBoxDrawEnd,
    (state) => state.setBoundaryBoxDrawEnd
  );

  const boundaryBoxDrawEnd = useZustand(
    useBoundaryBoxDrawEnd,
    (state) => state.boundaryBoxDrawEnd
  );

  const setSearchPopupMinimize = useZustand(
    useSearchPopupMinimize,
    (state) => state.setSearchPopupMinimize
  );
  useEffect(() => {
    if (boundingBox.length > 0) {
      setGeojsonObject({
        type: "FeatureCollection",
        crs: {
          type: "name",
          properties: {
            name: "EPSG:3857",
          },
        },
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [boundingBox[0], boundingBox[1]],
                  [boundingBox[0], boundingBox[3]],
                  [boundingBox[2], boundingBox[3]],
                  [boundingBox[2], boundingBox[1]],
                  [boundingBox[0], boundingBox[1]],
                ],
              ],
            },
          },
        ],
      });
    }
  }, [boundingBox]);

  return (
    <>
      {boundaryBoxDrawEnd ? (
        <olLayerVector style={styleFunction}>
          <olSourceVector features={new GeoJSON().readFeatures(geojsonObject)}>
            <olFeature>
              <olGeomCircle radius={1e6} />
            </olFeature>
          </olSourceVector>
        </olLayerVector>
      ) : (
        <>
          <olLayerVector>
            <olSourceVector ref={setVectorSource} />
          </olLayerVector>
          {vectorSource ? (
            <olInteractionDraw
              args={{
                source: vectorSource,
                type: "Circle",
                geometryFunction: createBox(),
              }}
              onDrawend={(e) => {
                setBoundingBox(e.feature.getGeometry().extent_);
                console.log("e", e.feature.getGeometry().extent_);
                setSearchPopupMinimize(false);
                setBoundaryBoxDrawEnd(true);
              }}
            />
          ) : null}
        </>
      )}
    </>
  );
};

export default DrawBoundingBox;
