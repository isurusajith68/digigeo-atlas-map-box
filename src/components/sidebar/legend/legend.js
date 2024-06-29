import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  useAssetsLayerVisibility,
  useClaimLinkLayerVisibility,
  useClaimVectorLayerVisibility,
  usetoggeleLegend,
} from "@/store/layer-slice";
import {
  ChevronsDown,
  ChevronsRight,
  Eye,
  EyeOffIcon,
  Layers,
  Layers3,
} from "lucide-react";
import { useEffect, useState } from "react";
import PropertyFeatures from "./property/property-features";

const Legend = () => {
  const { toggleLegendOpen, setToggleLegend } = usetoggeleLegend();

  const { claimVectorLayerVisibility, setClaimVectorLayerVisibility } =
    useClaimVectorLayerVisibility();

  const { claimLinkLayerVisibility, setClaimLinkLayerVisibility } =
    useClaimLinkLayerVisibility();

  const { assetsLayerVisibility, setAssetsLayerVisibility } =
    useAssetsLayerVisibility();

  const [claimVectorLayerToggle, setClaimVectorLayerToggle] = useState(false);
  const [claimLinkLayerToggle, setClaimLinkLayerToggle] = useState(false);
  const [assetsLayerToggle, setAssetsLayerToggle] = useState(false);

  return (
    <div>
      <div
        className={cn(
          buttonVariants({
            variant: "primary",
            size: "sm",
          }),

          "justify-start w-full cursor-pointer"
        )}
        onClick={() => setToggleLegend(!toggleLegendOpen)}
      >
        <Layers3 className="h-6 w-6 mr-6" />
        <span className=" font-bold">Legend</span>
        {toggleLegendOpen ? (
          <ChevronsDown
            onClick={() => setToggleLegend(!toggleLegendOpen)}
            className="h-6 w-6 ml-6 cursor-pointer "
          />
        ) : (
          <ChevronsRight
            onClick={() => setToggleLegend(!toggleLegendOpen)}
            className="h-6 w-6 ml-6 cursor-pointer"
          />
        )}
      </div>

      <div className="pl-2  gap-2 flex flex-col p-2">
        <PropertyFeatures />
        <div className="flex justify-between items-center p-1 gap-3 bg-zinc-200 rounded-lg">
          <div className="flex gap-2 items-center">
            <Layers className="h-4 w-4 " />
            <span className="text-sm"> Claim Link Layer</span>
          </div>
          <div className="flex gap-2 items-center">
            {claimLinkLayerVisibility ? (
              <Eye
                onClick={() =>
                  setClaimLinkLayerVisibility(!claimLinkLayerVisibility)
                }
                className="h-4 w-4 cursor-pointer"
              />
            ) : (
              <EyeOffIcon
                onClick={() =>
                  setClaimLinkLayerVisibility(!claimLinkLayerVisibility)
                }
                className="h-4 w-4 cursor-pointer text-gray-400"
              />
            )}

            {claimLinkLayerToggle ? (
              <ChevronsDown
                onClick={() => setClaimLinkLayerToggle(!claimLinkLayerToggle)}
                className="h-4 w-4 cursor-pointer"
              />
            ) : (
              <ChevronsRight
                onClick={() => setClaimLinkLayerToggle(!claimLinkLayerToggle)}
                className="h-4 w-4 cursor-pointer"
              />
            )}
          </div>
        </div>
        <div className="flex justify-between items-center p-1  gap-3 bg-zinc-200 rounded-lg">
          <div className="flex gap-2 items-center">
            <Layers className="h-4 w-4 " />
            <span className="text-sm"> Assets Layer</span>
          </div>
          <div className="flex gap-2 items-center">
            {assetsLayerVisibility ? (
              <Eye
                onClick={() => setAssetsLayerVisibility(!assetsLayerVisibility)}
                className="h-4 w-4 cursor-pointer"
              />
            ) : (
              <EyeOffIcon
                onClick={() => setAssetsLayerVisibility(!assetsLayerVisibility)}
                className="h-4 w-4 cursor-pointer text-gray-400"
              />
            )}

            {assetsLayerToggle ? (
              <ChevronsDown
                onClick={() => setAssetsLayerToggle(!assetsLayerToggle)}
                className="h-4 w-4 cursor-pointer"
              />
            ) : (
              <ChevronsRight
                onClick={() => setAssetsLayerToggle(!assetsLayerToggle)}
                className="h-4 w-4 cursor-pointer"
              />
            )}
          </div>
        </div>
        <div className="flex justify-between items-center p-1 gap-3 bg-zinc-200 rounded-lg">
          <div className="flex gap-2 items-center">
            <Layers className="h-4 w-4 " />
            <span className="text-sm">Claim Vector Layer</span>
          </div>
          <div className="flex gap-2 items-center">
            {claimVectorLayerVisibility ? (
              <Eye
                className="h-4 w-4 cursor-pointer"
                onClick={() =>
                  setClaimVectorLayerVisibility(!claimVectorLayerVisibility)
                }
              />
            ) : (
              <EyeOffIcon
                onClick={() =>
                  setClaimVectorLayerVisibility(!claimVectorLayerVisibility)
                }
                className="h-4 w-4 cursor-pointer text-gray-400"
              />
            )}

            {claimVectorLayerToggle ? (
              <ChevronsDown
                onClick={() =>
                  setClaimVectorLayerToggle(!claimVectorLayerToggle)
                }
                className="h-4 w-4 cursor-pointer"
              />
            ) : (
              <ChevronsRight
                onClick={() =>
                  setClaimVectorLayerToggle(!claimVectorLayerToggle)
                }
                className="h-4 w-4 cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Legend;
