import {
  useSearchPopupMinimize,
  useSearchTablePopUp,
} from "@/store/global-search";
import { useSearchClick } from "@/store/side-bar-slice";
import { Maximize, X } from "lucide-react";
import Draggable from "react-draggable";

const MinimizeSearchPopup = () => {
  const { setSearchPopupMinimize } = useSearchPopupMinimize();
  const { setIsSearchBtnClick } = useSearchClick();
  const { setSearchTablePopUp } = useSearchTablePopUp();
  return (
    <Draggable className="resize overflow-auto" axis="none">
      <div
        className={`absolute flex top-3 left-20 z-10 bg-background ring ring-gray-500 shadow-sm text-foreground  rounded-lg  w-[180px] flex-col  min-w-[180px] min-h-[70px] minimized`}
      >
        <div className="flex justify-between w-full border-b p-2 bg-slate-400 read-only rounded-t-lg">
          <div className="flex items-center ">
            <h1 className="font-semibold text-white text-xs">Global Search</h1>
          </div>
          <div className="flex items-center justify-center  gap-3">
            <Maximize
              className="cursor-pointer text-white h-5 w-5"
              onClick={() => setSearchPopupMinimize(false)}
            />
            <X
              className="cursor-pointer text-white h-5 w-5"
              onClick={() => {
                setIsSearchBtnClick(false), setSearchTablePopUp(false);
              }}
            />
          </div>
        </div>
        <div className="flex w-full  mt-2 ml-10"></div>
      </div>
    </Draggable>
  );
};
export default MinimizeSearchPopup;
