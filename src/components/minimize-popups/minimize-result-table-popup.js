import {
  useMinimizeSearchTablePopUp,
  useSearchPopupMinimize,
  useSearchTablePopUp,
  useSearchText,
} from "@/store/global-search";
import { Maximize, X } from "lucide-react";
import Draggable from "react-draggable";

const MinimizeTablePopup = () => {
  const { setMinimizeSearchTablePopUp } = useMinimizeSearchTablePopUp();
  const { searchTablePopUp, setSearchTablePopUp } = useSearchTablePopUp();
  const { searchText } = useSearchText();
  const { searchPopupMinimize } = useSearchPopupMinimize();
  return (
    <Draggable className="resize overflow-auto" axis="none">
      <div
        className={`absolute flex top-3 left-[300px] z-10 bg-background ring ring-gray-500 shadow-sm text-foreground rounded-lg 
          w-[200px] flex-col min-w-[200px] min-h-[70px] transition-all duration-300 ease-in-out transform ${
            searchPopupMinimize ? "left-[300px]" : "left-[80px]"
          }`}
      >
        <div className="flex justify-between w-full border-b p-2 bg-slate-400 read-only rounded-t-lg">
          <div className="flex items-center ">
            <h1 className="font-semibold text-white text-xs">
              Search Table{" "}
              <span className="text-gray-300 ml-1">({searchText})</span>
            </h1>
          </div>
          <div className="flex items-center justify-center  gap-3">
            <Maximize
              className="cursor-pointer text-white h-5 w-5"
              onClick={() => setMinimizeSearchTablePopUp(false)}
            />
            <X
              className="cursor-pointer text-white h-5 w-5"
              onClick={() => setSearchTablePopUp(!searchTablePopUp)}
            />
          </div>
        </div>
        <div className="flex w-full  mt-2 ml-10"></div>
      </div>
    </Draggable>
  );
};
export default MinimizeTablePopup;
