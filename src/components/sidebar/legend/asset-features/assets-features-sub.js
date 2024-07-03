import LayersWidgetsWithEye from "@/components/layers-widgets-with-eye/LayersWidgetsWithEye";
import LayersWidgetsWithToggle from "@/components/layers-widgets-with-toggle/layers-widgets-with-toggle";
import {
  useAssetDepositVisibility,
  useAssetHistoricalMinesVisibility,
  useAssetLabelVisibility,
  useAssetLayerVisibility,
  useAssetOccurrenceVisibility,
  useAssetOperatingMinesVisibility,
  useAssetsPointVisibility,
  useAssetToggle,
  useAssetVisibility,
  useAssetZoneVisibility,
} from "@/store/assets-sidebar-btn";
import { Component } from "lucide-react";
import { useEffect, useState } from "react";

const AssetsFeaturesSub = () => {
  const [assetsLabelColor, setAssetsLabelColor] = useState("red");
  const { assetLabelVisibility, setAssetLabelVisibility } =
    useAssetLabelVisibility();

  const { assetToggle, setAssetToggle } = useAssetToggle();
  const { assetVisibility, setAssetVisibility } = useAssetVisibility();

  const { assetOperatingMinesVisibility, setAssetOperatingMinesVisibility } =
    useAssetOperatingMinesVisibility();

  const { assetHistoricalMinesVisibility, setAssetHistoricalMinesVisibility } =
    useAssetHistoricalMinesVisibility();

  const { assetDepositVisibility, setAssetDepositVisibility } =
    useAssetDepositVisibility();

  const { assetZoneVisibility, setAssetZoneVisibility } =
    useAssetZoneVisibility();

  const { assetOccurrenceVisibility, setAssetOccurrenceVisibility } =
    useAssetOccurrenceVisibility();

  const { assetLayerVisibility, setAssetLayerVisibility } =
    useAssetLayerVisibility();

  const { assetsPointVisibility, setAssetsPointVisibility } =
    useAssetsPointVisibility();

  useEffect(() => {
    if (
      !assetDepositVisibility &&
      !assetHistoricalMinesVisibility &&
      !assetOperatingMinesVisibility &&
      !assetZoneVisibility &&
      !assetOccurrenceVisibility
    ) {
      setAssetVisibility(false);
    } else {
      setAssetVisibility(true);
    }
  }, [
    assetDepositVisibility,
    assetHistoricalMinesVisibility,
    assetOccurrenceVisibility,
    assetOperatingMinesVisibility,
    assetZoneVisibility,
    setAssetVisibility,
  ]);

  // useEffect(() => {
  //   if (assetLabelVisibility) {
  //     setAssetOperatingMinesVisibility(true);
  //     setAssetHistoricalMinesVisibility(true);
  //     setAssetDepositVisibility(true);
  //     setAssetZoneVisibility(true);
  //     setAssetOccurrenceVisibility(true);
  //   } else {
  //     setAssetOperatingMinesVisibility(false);
  //     setAssetHistoricalMinesVisibility(false);
  //     setAssetDepositVisibility(false);
  //     setAssetZoneVisibility(false);
  //     setAssetOccurrenceVisibility(false);
  //   }
  // }, [assetVisibility]);

  return (
    <div className="pl-4 mt-2">
      <div className="gap-2 flex flex-col">
        <LayersWidgetsWithEye
          visibility={assetLabelVisibility}
          setVisibility={setAssetLabelVisibility}
        >
          <div
            className={`border px-2 font-semibold text-${assetsLabelColor}-500  rounded-md cursor-pointer`}
          >
            A
          </div>
          <div>
            <span className="text-xs">Assets Labels</span>
          </div>
        </LayersWidgetsWithEye>
        <LayersWidgetsWithEye
          visibility={assetsPointVisibility}
          setVisibility={setAssetsPointVisibility}
        >
          <div
            className={`border p-1 font-semibold   rounded-md cursor-pointer`}
          >
            <div
              style={{ background: "#0052ac" }}
              className="p-2 rounded-full"
            ></div>
          </div>
          <div>
            <span className="text-xs">Assets Points</span>
          </div>
        </LayersWidgetsWithEye>
        <LayersWidgetsWithToggle
          visibility={assetVisibility}
          setVisibility={setAssetVisibility}
          toggle={assetToggle}
          setToggle={setAssetToggle}
          assetsArray={[
            setAssetOperatingMinesVisibility,
            setAssetHistoricalMinesVisibility,
            setAssetDepositVisibility,
            setAssetZoneVisibility,
            setAssetOccurrenceVisibility,
          ]}
        >
          <div
            className={`border p-1 font-semibold   rounded-md cursor-pointer`}
          >
            <Component size={16} />
          </div>
          <div>
            <span className="text-xs">Assets Type</span>
          </div>
        </LayersWidgetsWithToggle>
      </div>
    </div>
  );
};
export default AssetsFeaturesSub;
