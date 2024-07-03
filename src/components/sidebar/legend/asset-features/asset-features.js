import LayerComponentsWidgets from "@/components/layer-components-widgets/layer-componets-widgets";
import {
  useAssetLabelVisibility,
  useAssetLayerToggle,
  useAssetLayerVisibility,
  useAssetsPointVisibility,
  useAssetVisibility,
} from "@/store/assets-sidebar-btn";
import AssetsFeaturesSub from "./assets-features-sub";

const AssetFeatures = () => {
  const { assetLayerVisibility, setAssetLayerVisibility } =
    useAssetLayerVisibility();
  const { assetLabelVisibility, setAssetLabelVisibility } =
    useAssetLabelVisibility();
  const { assetVisibility, setAssetVisibility } = useAssetVisibility();
  const { assetLayerToggle, setAssetLayerToggle } = useAssetLayerToggle();
  const { assetsPointVisibility, setAssetsPointVisibility } =
    useAssetsPointVisibility();
  return (
    <LayerComponentsWidgets
      layerComponentsName={"Asset"}
      visibility={assetLayerVisibility}
      setVisibility={setAssetLayerVisibility}
      toggle={assetLayerToggle}
      setToggle={setAssetLayerToggle}
      layersArray={[
        {
          visibility: assetLabelVisibility,
          setVisibility: setAssetLabelVisibility,
        },
        {
          visibility: assetsPointVisibility,
          setVisibility: setAssetsPointVisibility,
        },

        // {
        //   visibility: assetVisibility,
        //   setVisibility: setAssetVisibility,
        // },
      ]}
    >
      <AssetsFeaturesSub />
    </LayerComponentsWidgets>
  );
};
export default AssetFeatures;
