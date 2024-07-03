import LayersWidgetsWithEye from "@/components/layers-widgets-with-eye/LayersWidgetsWithEye";
import {
  useClaimLabel,
  useClaimLayerVisibility,
  useClaimOutline,
} from "@/store/claim-sidebar-btn";
import { useEffect } from "react";

const ClaimFeaturesSub = () => {
  const { claimLabel, setClaimLabel } = useClaimLabel();
  const { claimOutline, setClaimOutline } = useClaimOutline();
  const { setClaimLayerVisibility } = useClaimLayerVisibility();

  useEffect(() => {
    if (!claimLabel && !claimOutline) {
      setClaimLayerVisibility(false);
    } else {
      setClaimLayerVisibility(true);
    }
  }, [claimLabel, claimOutline, setClaimLayerVisibility]);

  return (
    <div className="pl-4 mt-2">
      <div className="gap-2 flex flex-col">
        <LayersWidgetsWithEye
          visibility={claimLabel}
          setVisibility={setClaimLabel}
        >
          <div
            className={`border px-2 font-semibold text-red-500  rounded-md cursor-pointer`}
          >
            A
          </div>
          <div>
            <span className="text-xs">Claim Labels</span>
          </div>
        </LayersWidgetsWithEye>
        <LayersWidgetsWithEye
          visibility={claimOutline}
          setVisibility={setClaimOutline}
        >
          <div
            className={`border p-1 font-semibold   rounded-md cursor-pointer`}
          >
            <div style={{ background: "#d3d3d3" }} className="p-2 "></div>
          </div>
          <div>
            <span className="text-xs">Property Outlines</span>
          </div>
        </LayersWidgetsWithEye>
      </div>
    </div>
  );
};
export default ClaimFeaturesSub;
