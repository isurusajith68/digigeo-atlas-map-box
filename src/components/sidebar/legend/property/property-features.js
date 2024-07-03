import {
  ChevronsDown,
  ChevronsRight,
  Eye,
  EyeOffIcon,
  Layers,
} from "lucide-react";
import { useState } from "react";
import PropertyFeaturesSub from "./property-features-sub";
import { useSyncPropertyLayerVisibility } from "@/store/layer-slice";
import {
  usePropertyLabelVisibility,
  usePropertyOutlinesVisibility,
  usePropertyPointsVisibility,
} from "@/store/property-sidebar-btn";
import LayerComponentsWidgets from "@/components/layer-components-widgets/layer-componets-widgets";

const PropertyFeatures = () => {
  const { syncPropertyLayerVisibility, setSyncPropertyLayerVisibility } =
    useSyncPropertyLayerVisibility();

  const [syncPropertyLayerToggle, setSyncPropertyLayerToggle] = useState(true);

  const { propertyLabelVisibility, setPropertyLabelVisibility } =
    usePropertyLabelVisibility();
  const { propertyPointsVisibility, setPropertyPointsVisibility } =
    usePropertyPointsVisibility();
  const { propertyOutlinesVisibility, setPropertyOutlinesVisibility } =
    usePropertyOutlinesVisibility();

  return (
    <LayerComponentsWidgets
      layerComponentsName={"Property"}
      visibility={syncPropertyLayerVisibility}
      setVisibility={setSyncPropertyLayerVisibility}
      toggle={syncPropertyLayerToggle}
      setToggle={setSyncPropertyLayerToggle}
      layersArray={[
        {
          visibility: propertyLabelVisibility,
          setVisibility: setPropertyLabelVisibility,
        },
        {
          visibility: propertyPointsVisibility,
          setVisibility: setPropertyPointsVisibility,
        },
        {
          visibility: propertyOutlinesVisibility,
          setVisibility: setPropertyOutlinesVisibility,
        },
      ]}
    >
      <PropertyFeaturesSub />
    </LayerComponentsWidgets>
  );
};
export default PropertyFeatures;
