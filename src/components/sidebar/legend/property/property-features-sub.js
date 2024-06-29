import { useSyncPropertyLayerVisibility } from "@/store/layer-slice";
import {
  usePropertyLabelVisibility,
  usePropertyOutlinesVisibility,
  usePropertyPointsVisibility,
} from "@/store/property-sidebar-btn";
import { Eye, EyeOffIcon } from "lucide-react";
import { use, useEffect, useState } from "react";

const PropertyFeaturesSub = () => {
  const [propertyLabelColor, setPropertyLabelColor] = useState("red");
  const [propertyPointColor, setPropertyPointColor] = useState("yellow");
  const [propertyOutlineColor, setPropertyOutlineColor] = useState("blue");

  const { propertyLabelVisibility, setPropertyLabelVisibility } =
    usePropertyLabelVisibility();

  const { propertyPointsVisibility, setPropertyPointsVisibility } =
    usePropertyPointsVisibility();

  const { propertyOutlinesVisibility, setPropertyOutlinesVisibility } =
    usePropertyOutlinesVisibility();

  const { syncPropertyLayerVisibility, setSyncPropertyLayerVisibility } =
    useSyncPropertyLayerVisibility();

  useEffect(() => {
    if (syncPropertyLayerVisibility) {
      setPropertyLabelVisibility(true);
      setPropertyPointsVisibility(true);
      setPropertyOutlinesVisibility(true);
    } else {
      setPropertyLabelVisibility(false);
      setPropertyPointsVisibility(false);
      setPropertyOutlinesVisibility(false);
    }

    return () => {};
  }, [syncPropertyLayerVisibility]);

  useEffect(() => {
    if (
      !propertyLabelVisibility &&
      !propertyOutlinesVisibility &&
      !propertyPointsVisibility
    ) {
      setSyncPropertyLayerVisibility(false);
    }

  //   if (
  //     propertyLabelVisibility ||
  //     propertyOutlinesVisibility ||
  //     propertyPointsVisibility
  //   ) {
  //     if (propertyLabelVisibility) {
  //       setPropertyPointsVisibility(false);
  //       setPropertyOutlinesVisibility(false);
  //     }

  //     if (propertyOutlinesVisibility) {
  //       setPropertyLabelVisibility(false);
  //       setPropertyPointsVisibility(false);
  //     }

  //     if (propertyPointsVisibility) {
  //       setPropertyLabelVisibility(false);
  //       setPropertyOutlinesVisibility(false);
  //     }
  //   }
  }, [
    propertyLabelVisibility,
    propertyOutlinesVisibility,
    propertyPointsVisibility,
  ]);

  return (
    <div className="pl-4 mt-2">
      <div className="gap-2 flex flex-col">
        <div className="flex justify-between items-center  gap-3 ">
          <div className="flex gap-2 items-center justify-around  w-full pr-6">
            <div
              className={`border px-2 font-semibold text-${propertyLabelColor}-500  rounded-md cursor-pointer`}
            >
              A
            </div>
            <div>
              <span className="text-xs">Property Labels</span>
            </div>
            <div>
              {propertyLabelVisibility ? (
                <Eye
                  onClick={() =>
                    setPropertyLabelVisibility(!propertyLabelVisibility)
                  }
                  className="h-4 w-4 cursor-pointer"
                />
              ) : (
                <EyeOffIcon
                  onClick={() =>
                    setPropertyLabelVisibility(!propertyLabelVisibility)
                  }
                  className="h-4 w-4 cursor-pointer text-gray-400"
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center  gap-3 ">
          <div className="flex gap-2 items-center justify-around  w-full pr-6">
            <div
              className={`border p-1 font-semibold text-${propertyLabelColor}-500  rounded-md cursor-pointer`}
            >
              <div
                className={
                  propertyPointColor === "black" ||
                  propertyPointColor === "white"
                    ? `bg-${propertyPointColor} p-2 rounded-full`
                    : `bg-${propertyPointColor}-500 p-2 rounded-full`
                }
              ></div>
            </div>
            <div>
              <span className="text-xs">Property points</span>
            </div>
            <div>
              {propertyPointsVisibility ? (
                <Eye
                  onClick={() =>
                    setPropertyPointsVisibility(!propertyPointsVisibility)
                  }
                  className="h-4 w-4 cursor-pointer"
                />
              ) : (
                <EyeOffIcon
                  onClick={() =>
                    setPropertyPointsVisibility(!propertyPointsVisibility)
                  }
                  className="h-4 w-4 cursor-pointer text-gray-400"
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center  gap-3 ">
          <div className="flex gap-2 items-center justify-around  w-full pr-6">
            <div
              className={`border p-1 font-semibold  rounded-md cursor-pointer`}
            >
              <div
                className={
                  propertyOutlineColor === "black" ||
                  propertyOutlineColor === "white"
                    ? `bg-${propertyOutlineColor} p-2 `
                    : `bg-${propertyOutlineColor}-500 p-2 `
                }
              ></div>
            </div>
            <div>
              <span className="text-xs">Property outlines</span>
            </div>
            <div>
              {propertyOutlinesVisibility ? (
                <Eye
                  onClick={() =>
                    setPropertyOutlinesVisibility(!propertyOutlinesVisibility)
                  }
                  className="h-4 w-4 cursor-pointer"
                />
              ) : (
                <EyeOffIcon
                  onClick={() =>
                    setPropertyOutlinesVisibility(!propertyOutlinesVisibility)
                  }
                  className="h-4 w-4 cursor-pointer text-gray-400"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PropertyFeaturesSub;
