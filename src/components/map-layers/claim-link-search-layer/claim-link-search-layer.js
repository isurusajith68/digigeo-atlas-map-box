import { useCallback, useEffect, useRef, useState } from "react";
import { bbox } from "ol/loadingstrategy";
import GeoJSON from "ol/format/GeoJSON";
import { map_tbl_sync_claimlink_VectorLayerStyleFunction } from "../claim-link-vector-layer/claim-link-style";
import { useLayerVectorClaimLinkLoading } from "@/store/landing-map-slice";
import { useZustand } from "use-zustand";
import { useClaimLinkLayerVisibility } from "@/store/layer-slice";
import { usePropertyOutlinesVisibility } from "@/store/property-sidebar-btn";
import { useShowAllPropertiesOutlines } from "@/store/global-search";

const ClaimLinkSearchLayer = () => {
  const claimLinkVectorLayerRef = useRef(null);
  const claimLinkSourceRef = useRef(null);
  const [maxResolutionSyncOutlines, setmaxResolutionSyncOutlines] =
    useState(300);

  useEffect(() => {
    claimLinkVectorLayerRef.current?.setOpacity(0.2);
    claimLinkVectorLayerRef.current?.setStyle(
      map_tbl_sync_claimlink_VectorLayerStyleFunction
    );
  }, [claimLinkVectorLayerRef.current]);

  const setVectorClaimLinkLoading = useZustand(
    useLayerVectorClaimLinkLoading,
    (state) => state.setVectorClaimLinkLoading
  );

  const propertyOutlinesVisibility = useZustand(
    usePropertyOutlinesVisibility,
    (state) => state.propertyOutlinesVisibility
  );

  const showPropertiesOutlines = useZustand(
    useShowAllPropertiesOutlines,
    (state) => state.showPropertiesOutlines
  );
  // console.log(showPropertiesOutlines, "showPropertiesOutlines");

  useEffect(() => {
    syncClaimLinkLoaderFunc(showPropertiesOutlines);
  }, [showPropertiesOutlines]);

  useEffect(() => {
    syncClaimLinkLoaderFunc(showPropertiesOutlines);
  }, [showPropertiesOutlines]);
  // console.log(showPropertiesOutlines, "showPropertiesOutlines");

  const syncClaimLinkLoaderFunc = useCallback(
    (showPropertiesOutlines) => {
      // const url =
      //   `${process.env.NEXT_PUBLIC_API_URL}/matlas/syncclaimlink_byextent` +
      //   `/${join("/")}`;
      // setVectorClaimLinkLoading("loading");
      // fetch(url, {
      //   method: "GET", // *GET, POST, PUT, DELETE, etc.
      //   mode: "cors", // no-cors, *cors, same-origin
      //   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      //   credentials: "same-origin", // include, *same-origin, omit
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // })
      // .then((response) => response.json())
      // .then((json) => {
      //   if (json.data) {
      if (showPropertiesOutlines?.[0].json_build_object.features) {
        const features = new GeoJSON().readFeatures(
          showPropertiesOutlines[0].json_build_object
        );
        claimLinkSourceRef.current.clear();
        claimLinkSourceRef.current.addFeatures(features);
      }
      // console.log(
      //   showPropertiesOutlines[0].json_build_object.features,
      //   "showPropertiesOutlines"
      // );
      //console.log("hit claims3")

      //console.log("bbsync uni tbl01_claims   features count", features.count);
      // }
      // }
      setVectorClaimLinkLoading("loaded");
      // })
      // .catch((error) => {
      //   console.error("Error:", error);
      //   setVectorClaimLinkLoading("error");
      // });
    },
    [showPropertiesOutlines]
  );

  //claim link layer visibility
  useEffect(() => {
    if (propertyOutlinesVisibility) {
      claimLinkVectorLayerRef.current.setVisible(true);
    } else {
      claimLinkVectorLayerRef.current.setVisible(false);
    }
  }, [propertyOutlinesVisibility]);

  return (
    <olLayerVector
      ref={claimLinkVectorLayerRef}
      // minResolution={0}
      // maxResolution={maxResolutionSyncOutlines}
    >
      <olSourceVector
        ref={claimLinkSourceRef}
        // strategy={bbox}
        // loader={syncClaimLinkLoaderFunc}
        // style={areaMap_tbl_sync_claimlink_VectorLayerStyleFunction}
      ></olSourceVector>
    </olLayerVector>
  );
};
export default ClaimLinkSearchLayer;
