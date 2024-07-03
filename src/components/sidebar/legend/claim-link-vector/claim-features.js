import LayerComponentsWidgets from "@/components/layer-components-widgets/layer-componets-widgets";
import ClaimFeaturesSub from "./claim-features-sub";
import {
  useClaimLabel,
  useClaimLayerToggle,
  useClaimLayerVisibility,
  useClaimOutline,
} from "@/store/claim-sidebar-btn";

const ClaimFeatures = () => {
  const { claimLayerVisibility, setClaimLayerVisibility } =
    useClaimLayerVisibility();

  const { claimLayerToggle, setClaimLayerToggle } = useClaimLayerToggle();
  const { claimLabel, setClaimLabel } = useClaimLabel();
  const { claimOutline, setClaimOutline } = useClaimOutline();
  return (
    <LayerComponentsWidgets
      layerComponentsName={"Claims"}
      visibility={claimLayerVisibility}
      setVisibility={setClaimLayerVisibility}
      toggle={claimLayerToggle}
      setToggle={setClaimLayerToggle}
      layersArray={[
        {
          visibility: claimLabel,
          setVisibility: setClaimLabel,
        },
        {
          visibility: claimOutline,
          setVisibility: setClaimOutline,
        },
      ]}
    >
      <ClaimFeaturesSub />
    </LayerComponentsWidgets>
  );
};
export default ClaimFeatures;
