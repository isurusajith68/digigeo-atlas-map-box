import LayersWidgetsWithEye from "@/components/layers-widgets-with-eye/LayersWidgetsWithEye";
import { useSyncPropertyLayerVisibility } from "@/store/layer-slice";
import {
  usePropertyLabelVisibility,
  usePropertyOutlinesVisibility,
  usePropertyPointsVisibility,
} from "@/store/property-sidebar-btn";
import { use, useEffect, useState } from "react";

const PropertyFeaturesSub = () => {
  const [propertyLabelColor, setPropertyLabelColor] = useState("red");
  const [propertyPointColor, setPropertyPointColor] = useState("yellow");
  const [propertyOutlineColor, setPropertyOutlineColor] = useState("gray");

  const { setSyncPropertyLayerVisibility } = useSyncPropertyLayerVisibility();

  const { propertyLabelVisibility, setPropertyLabelVisibility } =
    usePropertyLabelVisibility();
  const { propertyPointsVisibility, setPropertyPointsVisibility } =
    usePropertyPointsVisibility();
  const { propertyOutlinesVisibility, setPropertyOutlinesVisibility } =
    usePropertyOutlinesVisibility();

  useEffect(() => {
    if (
      !propertyLabelVisibility &&
      !propertyPointsVisibility &&
      !propertyOutlinesVisibility
    ) {
      setSyncPropertyLayerVisibility(false);
    } else {
      setSyncPropertyLayerVisibility(true);
    }
  }, [
    propertyLabelVisibility,
    propertyPointsVisibility,
    propertyOutlinesVisibility,
  ]);

  return (
    <div className="pl-4 mt-2">
      <div className="gap-2 flex flex-col">
        <LayersWidgetsWithEye
          visibility={propertyLabelVisibility}
          setVisibility={setPropertyLabelVisibility}
        >
          <div
            className={`border px-2 font-semibold text-${propertyLabelColor}-500  rounded-md cursor-pointer`}
          >
            A
          </div>
          <div>
            <span className="text-xs">Property Labels</span>
          </div>
        </LayersWidgetsWithEye>

        <LayersWidgetsWithEye
          visibility={propertyPointsVisibility}
          setVisibility={setPropertyPointsVisibility}
        >
          <div
            className={`border p-1 font-semibold   rounded-md cursor-pointer`}
          >
            <div
              style={{ background: propertyPointColor }}
              className="p-2 rounded-full"
            ></div>
          </div>
          <div>
            <span className="text-xs">Property Points</span>
          </div>
        </LayersWidgetsWithEye>

        <LayersWidgetsWithEye
          visibility={propertyOutlinesVisibility}
          setVisibility={setPropertyOutlinesVisibility}
        >
          <div
            className={`border p-1 font-semibold   rounded-md cursor-pointer`}
          >
            <div
              style={{ background: propertyOutlineColor }}
              className="p-2 "
            ></div>
          </div>
          <div>
            <span className="text-xs">Property Outlines</span>
          </div>
        </LayersWidgetsWithEye>
      </div>
    </div>
  );
};
export default PropertyFeaturesSub;
