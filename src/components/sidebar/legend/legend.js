import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usetoggeleLegend } from "@/store/layer-slice";
import { ChevronsDown, ChevronsRight, Layers3 } from "lucide-react";
import PropertyFeatures from "./property/property-features";
import { Asset } from "next/font/google";
import AssetFeatures from "./asset-features/asset-features";
import ClaimFeatures from "./claim-link-vector/claim-features";

const Legend = () => {
  const { toggleLegendOpen, setToggleLegend } = usetoggeleLegend();

  return (
    <div>
      <div
        className={cn(
          buttonVariants({
            variant: "primary",
            size: "sm",
          }),

          "justify-start w-full cursor-pointer h-8"
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

      <div
        className="pl-2  gap-2 flex flex-col p-2  overflow-auto"
        style={{
          maxHeight: "calc(100vh - 190px)",
        }}
      >
        <PropertyFeatures />
        <AssetFeatures />
        <ClaimFeatures />
        {/* <div className="flex justify-between items-center p-1 gap-3 bg-zinc-200 dark:bg-white dark:text-black rounded-lg">
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
        <div className="flex justify-between items-center p-1  gap-3 bg-zinc-200 dark:bg-white dark:text-black rounded-lg">
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
        <div className="flex justify-between items-center p-1 gap-3 bg-zinc-200 dark:bg-white dark:text-black rounded-lg">
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
        </div> */}
      </div>
    </div>
  );
};
export default Legend;
