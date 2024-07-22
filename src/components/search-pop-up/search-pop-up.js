import { useSearchClick } from "@/store/side-bar-slice";
import { LoaderCircle, Maximize, Minus, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Draggable from "react-draggable";
import { useCallback, useEffect, useState } from "react";
import {
  useBoundaryBoxDrawEnd,
  useGlobalSearchCompanyId,
  useIsCollapsibleOpen,
  useMinimizeSearchTablePopUp,
  useSearchInput,
  useSearchPopupMinimize,
  useSearchTablePopUp,
  useSearchText,
  useSelectedCheckboxes,
  useSelectedRadio,
  useShowAllAssets,
  useShowAllPropertiesOutlines,
  useShowAllPropertiesPoints,
  useShowBoundingBox,
} from "@/store/global-search";

import LayerFilter from "./search-filters/layer-filter";
import ViewFilter from "./search-filters/view-filter";
import AutoCompleteSearchTable from "./auto-complete-search-table/auto-complete-search-table";
import MinimizeSearchPopup from "../minimize-popups/minimize-search-popup";

const SearchPopUp = () => {
  const [hasFocus, setHasFocus] = useState(true);

  const [resultTable, setResultTable] = useState(false);

  const { searchInput, setSearchInput } = useSearchInput();
  const { setIsSearchBtnClick } = useSearchClick();
  const { selectedCheckboxes } = useSelectedCheckboxes();
  const { setIsCollapsibleOpen } = useIsCollapsibleOpen();
  const { setShowAssets } = useShowAllAssets();
  const { setSearchTablePopUp } = useSearchTablePopUp();
  const { setShowPropertiesPoints } = useShowAllPropertiesPoints();
  const { setShowPropertiesOutlines } = useShowAllPropertiesOutlines();
  const { boundaryBoxDrawEnd, setBoundaryBoxDrawEnd } = useBoundaryBoxDrawEnd();
  const { setSelectRadio } = useSelectedRadio();
  const { setShowBoundingBox } = useShowBoundingBox();

  const { searchPopupMinimize, setSearchPopupMinimize } =
    useSearchPopupMinimize();
  const { setMinimizeSearchTablePopUp } = useMinimizeSearchTablePopUp();

  useEffect(() => {
    setIsCollapsibleOpen(false);
  }, [hasFocus]);

  const showAll = async () => {
    if (searchInput.length >= 2) {
      setResultTable(true);
      selectedCheckboxes.includes("Property Point Layer")
        ? showPropertyPoint()
        : null;
      selectedCheckboxes.includes("Property OutLine Layer")
        ? showPropertyOutLine()
        : null;
      selectedCheckboxes.includes("Assets layer") ? showAssets() : null;
    } else {
      alert("Please enter at least 2 characters");
    }
  };

  const showPropertyPoint = useCallback(async () => {
    setShowPropertiesPoints(null);
    const res = await fetch(
      `https://atlas.ceyinfo.cloud/matlas/search_tbl_sync_property_xy/${searchInput}`
    );
    const data = await res.json();
    setShowPropertiesPoints(data.data);
    // console.log(data.data, "data");
  }, [searchInput]);

  const showPropertyOutLine = useCallback(async () => {
    setShowPropertiesOutlines(null);
    const res = await fetch(
      `https://atlas.ceyinfo.cloud/matlas/search_tbl_sync_claimlink_xy/${searchInput}`
    );
    const data = await res.json();
    setShowPropertiesOutlines(data.data);
    // console.log(showPropertiesPoints);
  }, [searchInput]);

  const showAssets = useCallback(async () => {
    setShowAssets(null);
    const res = await fetch(
      `https://atlas.ceyinfo.cloud/matlas/search_tbl_sync_asset_xy/${searchInput}`
    );
    const data = await res.json();
    setShowAssets(data.data);
  }, [searchInput]);

  const showTablePopUp = () => {
    setSearchTablePopUp(true);
    setMinimizeSearchTablePopUp(false);
    setSearchPopupMinimize(true);
    // setIsSearchBtnClick(false);
  };

  const handleMouseDown = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      {searchPopupMinimize ? (
        <MinimizeSearchPopup />
      ) : (
        <Draggable className="resize overflow-auto">
          <div
            className={`absolute flex top-32 left-40 z-10 bg-background ring ring-gray-500 shadow-sm text-foreground  rounded-lg  w-[500px] flex-col  min-w-[700px] min-h-[320px] `}
          >
            <div className="flex justify-between w-full border-b p-2 bg-slate-400 read-only rounded-t-lg">
              <div className="flex items-center justify-center">
                <h1 className="font-semibold text-white">Global Search</h1>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Minus
                  className="cursor-pointer text-white h-5 w-5"
                  onClick={() => setSearchPopupMinimize(true)}
                />
                <X
                  className="cursor-pointer text-white h-5 w-5"
                  onClick={() => setIsSearchBtnClick(false)}
                />
              </div>
            </div>
            <div onMouseDown={handleMouseDown} className="w-full flex flex-col">
              <div className="flex p-4 gap-2 w-full">
                <div className="relative  w-full">
                  <Input
                    type="search"
                    placeholder="Search"
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                    }}
                    value={searchInput}
                    onFocus={() => setHasFocus(true)}
                    onBlur={() => setHasFocus(false)}
                    className="w-full ring-2 ring-gray-500 rounded-lg bg-background shadow-xl text-foreground px-3 py-2 focus:outline-none "
                  />
                  <>
                    {searchInput.length >= 2 && hasFocus && (
                      <AutoCompleteSearchTable />
                    )}
                  </>
                </div>
                <Button onClick={() => showAll()}>Show</Button>
              </div>
              <div className="flex flex-wrap gap-2 p-2">
                <div className="flex-1 ">
                  <LayerFilter />
                </div>
                <div className="flex-1 ">
                  <ViewFilter />
                </div>
                <div className="">
                  {boundaryBoxDrawEnd && (
                    <Button
                      onClick={() => {
                        setBoundaryBoxDrawEnd(false);
                        setSelectRadio("world");
                        setShowBoundingBox(false);
                        // setSearchTablePopUp(false);
                      }}
                    >
                      Clear B-Box
                    </Button>
                  )}
                </div>
                <div className="">
                  {resultTable && (
                    <Button
                      onClick={() => showTablePopUp()}
                      className="bg-red-500 text-white  ml-4 mr-4"
                    >
                      View Table
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Draggable>
      )}
    </>
  );
};
export default SearchPopUp;
