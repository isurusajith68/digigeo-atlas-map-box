import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usetoggeleLegend } from "@/store/layer-slice";
import { ChevronsDown, ChevronsRight, Layers3 } from "lucide-react";
import PropertyFeatures from "./property/property-features";
import { Asset } from "next/font/google";
import AssetFeatures from "./asset-features/asset-features";
import ClaimFeatures from "./claim-link-vector/claim-features";
import { useEffect } from "react";
import { useAssetToggle } from "@/store/assets-sidebar-btn";

const Legend = () => {
  const { toggleLegendOpen, setToggleLegend } = usetoggeleLegend();
  const { setAssetToggle } = useAssetToggle();
  useEffect(() => {
    if (toggleLegendOpen) {
      setAssetToggle(true);
    } else {
      setAssetToggle(false);
    }
  }, [toggleLegendOpen]);

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
          maxHeight: "calc(100dvh - 190px)",
        }}
      >
        <PropertyFeatures />
        <AssetFeatures />
        <ClaimFeatures />
      </div>
    </div>
  );
};
export default Legend;
