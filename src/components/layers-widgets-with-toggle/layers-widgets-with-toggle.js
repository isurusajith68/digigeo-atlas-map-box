import { ChevronsDown, ChevronsRight, Eye, EyeOffIcon } from "lucide-react";
import AssetToggleSub from "../sidebar/legend/asset-features/asset-toggle-sub";
import { useEffect } from "react";

const LayersWidgetsWithToggle = ({
  children,
  visibility,
  setVisibility,
  toggle,
  setToggle,
  assetsArray,
}) => {

 

  return (
    <>
      <div className="flex  gap-3 w-full">
        <div className="flex gap-2 items-center justify-around  w-full pr-1">
          {children}
          <div className="flex-1 flex justify-end items-center gap-2 ">
            <div className=" gap-2">
              {visibility ? (
                <Eye
                  onClick={() => {
                    setVisibility(!visibility);
                    assetsArray.forEach((asset) => {
                      asset(false);
                    });
                  }}
                  className="h-4 w-4 cursor-pointer"
                />
              ) : (
                <EyeOffIcon
                  onClick={() => {
                    setVisibility(!visibility);
                    assetsArray.forEach((asset) => {
                      asset(true);
                    });
                  }}
                  className="h-4 w-4 cursor-pointer text-gray-400"
                />
              )}
            </div>
            <div>
              {toggle ? (
                <ChevronsDown
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                  className="h-4 w-4 cursor-pointer"
                />
              ) : (
                <ChevronsRight
                  onClick={() => setToggle(!toggle)}
                  className="h-4 w-4 cursor-pointer"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {toggle && (
        <div className="pl-4">
          <AssetToggleSub />
        </div>
      )}
    </>
  );
};
export default LayersWidgetsWithToggle;
