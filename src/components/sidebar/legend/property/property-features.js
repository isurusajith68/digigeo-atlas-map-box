
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


const PropertyFeatures = () => {
  const { syncPropertyLayerVisibility, setSyncPropertyLayerVisibility } =
    useSyncPropertyLayerVisibility();
    

  const [syncPropertyLayerToggle, setSyncPropertyLayerToggle] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center p-1  gap-3 bg-zinc-200 rounded-lg">
        <div className="flex gap-2 items-center">
          <Layers className="h-4 w-4 " />
          <span className="text-sm ">Property</span>
        </div>
        <div className="flex gap-2 items-center">
          {syncPropertyLayerVisibility ? (
            <Eye
              onClick={() =>
                setSyncPropertyLayerVisibility(!syncPropertyLayerVisibility)
              }
              className="h-4 w-4 cursor-pointer"
            />
          ) : (
            <EyeOffIcon
              onClick={() =>
                setSyncPropertyLayerVisibility(!syncPropertyLayerVisibility)
              }
              className="h-4 w-4 cursor-pointer text-gray-400"
            />
          )}
          {syncPropertyLayerToggle ? (
            <ChevronsDown
              onClick={() =>
                setSyncPropertyLayerToggle(!syncPropertyLayerToggle)
              }
              className="h-4 w-4 cursor-pointer"
            />
          ) : (
            <ChevronsRight
              onClick={() =>
                setSyncPropertyLayerToggle(!syncPropertyLayerToggle)
              }
              className="h-4 w-4 cursor-pointer"
            />
          )}
        </div>
      </div>
      {syncPropertyLayerToggle && <PropertyFeaturesSub />}
    </div>
  );
};
export default PropertyFeatures;
