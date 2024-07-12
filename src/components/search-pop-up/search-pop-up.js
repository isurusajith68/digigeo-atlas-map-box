import { SearchClick } from "@/store/side-bar-slice";
import {
  ArrowDownFromLine,
  ChevronDown,
  ChevronsDown,
  ChevronsUp,
  LoaderCircle,
  X,
} from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import Draggable from "react-draggable";
import { useCallback, useEffect, useState } from "react";
import {
  useGlobalSearchCompanyId,
  useSearchTablePopUp,
  useSearchText,
  useShowAllAssets,
  useShowAllPropertiesOutlines,
  useShowAllPropertiesPoints,
} from "@/store/global-search";
import ResultTable from "./table-pop-up/result-table";
import TablePopUp from "./table-pop-up/table-pop-up";

// const SearchPopUp = () => {

//   const setDialogState = () => { };

//   return (
//     <ModalPopup setDialogState={setDialogState} title="test d">
//       <span className="text-2xl">Global Search</span>
//     </ModalPopup>
//   );

// }
const SearchPopUp = () => {
  const { isSearchBtnClick, setIsSearchBtnClick } = SearchClick();
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([
    "Property Point Layer",
    "Property OutLine Layer",
    "Assets layer",
  ]);
  const [selectRadio, setSelectRadio] = useState("world");
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);
  const [propertyPointList, setPropertyPointList] = useState([]);
  const [propertyOutLineList, setPropertyOutLineList] = useState([]);
  const [assetsList, setAssetsList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [hasFocus, setHasFocus] = useState(true);
  const [assetsSearchLoading, setAssetsSearchLoading] = useState(true);
  const [resultTable, setResultTable] = useState(false);
  const [propertyPointSearchLoading, setPropertyPointSearchLoading] =
    useState(true);
  const [propertyOutLineSearchLoading, setPropertyOutLineSearchLoading] =
    useState(false);
  const { globalSearchCompanyId, setGlobalSearchCompanyId } =
    useGlobalSearchCompanyId();
  const { setShowAssets } = useShowAllAssets();

  const { searchTablePopUp, setSearchTablePopUp } = useSearchTablePopUp();

  // console.log();
  const { showPropertiesPoints, setShowPropertiesPoints } =
    useShowAllPropertiesPoints();
  // console.log(showPropertiesPoints,"showPropertiesPoints");
  const { setShowPropertiesOutlines } = useShowAllPropertiesOutlines();

  const { searchText, setSearchText } = useSearchText();
  console.log(searchText, "searchText");
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchInput.length >= 2) {
        setSearchText(searchInput);
        selectedCheckboxes.includes("Property Point Layer")
          ? fetchPropertyPointLayer()
          : null;
        selectedCheckboxes.includes("Property OutLine Layer")
          ? fetchPropertyOutLineLayer()
          : null;
        selectedCheckboxes.includes("Assets layer") ? fetchAssetsLayer() : null;
      } else {
        setPropertyPointList([]);
        setPropertyOutLineList([]);
        setAssetsList([]);
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput, selectedCheckboxes]);

  const fetchPropertyPointLayer = useCallback(() => {
    setPropertyPointSearchLoading(true);
    fetch(
      `https://atlas.ceyinfo.cloud/matlas/propertypointnamesearch/${searchInput}`
    )
      .then((res) => res.json())
      .then((p) => {
        setPropertyPointList(p.data);
        setPropertyPointSearchLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setPropertyPointSearchLoading(false);
      });
  }, [searchInput]);

  const fetchPropertyOutLineLayer = useCallback(() => {
    setPropertyOutLineSearchLoading(true);
    fetch(
      `https://atlas.ceyinfo.cloud/matlas/propertyoutlinenamesearch/${searchInput}`
    )
      .then((res) => res.json())
      .then((a) => {
        setPropertyOutLineList(a.data);
        setPropertyOutLineSearchLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setPropertyOutLineSearchLoading(false);
      });
  }, [searchInput]);

  const fetchAssetsLayer = useCallback(() => {
    setAssetsSearchLoading(true);
    fetch(`https://atlas.ceyinfo.cloud/matlas/assetnamesearch/${searchInput}`)
      .then((res) => res.json())
      .then((a) => {
        setAssetsList(a.data);
        setAssetsSearchLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setAssetsSearchLoading(false);
      });
  }, [searchInput]);

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
    setSearchTablePopUp(!searchTablePopUp);
    setIsSearchBtnClick(!isSearchBtnClick);
  };

  return (
    <Draggable className="resize overflow-auto">
      <div className="absolute flex top-2 left-20 z-10 bg-background ring ring-gray-500 shadow-sm text-foreground  rounded-lg  w-[500px] flex-col  min-w-[700px] min-h-[320px] ">
        <div className="flex justify-between w-full border-b p-2 bg-slate-400 read-only rounded-t-lg">
          <div className="flex items-center justify-center">
            <h1 className="font-semibold text-white">Global Search</h1>
          </div>
          <div className="flex items-center justify-center">
            <X
              className="cursor-pointer text-white"
              onClick={() => setIsSearchBtnClick(!isSearchBtnClick)}
            />
          </div>
        </div>
        <div className="w-full flex flex-col">
          <div className="flex p-4 gap-2 w-full">
            <div className="relative  w-full">
              <Input
                type="search"
                placeholder="Search"
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  // setSearchText(e.target.value);
                  // setPropertyOutLineList([]);
                  // setPropertyPointList([]);
                  // setAssetsList([]);
                }}
                onFocus={() => setHasFocus(true)}
                onBlur={() => setHasFocus(false)}
                className="w-full ring-2 ring-gray-500 rounded-lg bg-background shadow-xl text-foreground px-3 py-2 focus:outline-none "
              />
              <>
                {searchInput.length >= 2 && hasFocus && (
                  <div className="absolute mt-0  z-20 w-full divide-y rounded-b-lg border-x-2 border-b-2  bg-background shadow-2xl ">
                    <div className="flex">
                      {selectedCheckboxes.includes("Property Point Layer") && (
                        <div className="relative flex-1 border-r">
                          <div className="sticky  border-b">
                            <h1 className="text-sm font-medium p-2 ">
                              Property Point
                            </h1>
                          </div>
                          <div className="overflow-auto max-h-[150px]">
                            {propertyPointSearchLoading ? (
                              <div className="flex items-center justify-center p-3">
                                <LoaderCircle className="animate-spin" />
                              </div>
                            ) : (
                              <>
                                {propertyPointList.map((p) => (
                                  <button
                                    key={p.prop_name}
                                    className="block w-full p-2 text-start cursor-pointer hover:bg-slate-600"
                                    onMouseDown={() => {
                                      setGlobalSearchCompanyId(p.prop_name);
                                      setIsSearchBtnClick(!isSearchBtnClick);
                                      console.log(p.prop_name);
                                    }}
                                  >
                                    <span className="text-xs">
                                      {p.prop_name}
                                    </span>
                                  </button>
                                ))}
                              </>
                            )}
                            {!propertyPointList.length &&
                              !propertyPointSearchLoading && (
                                <p className="p-3 text-xs text-red-400">
                                  No results found.
                                </p>
                              )}
                          </div>
                        </div>
                      )}
                      {selectedCheckboxes.includes(
                        "Property OutLine Layer"
                      ) && (
                        <div className="relative flex-1 border-r">
                          <div className="sticky border-b">
                            <h1 className="text-sm font-medium p-2 ">
                              Property OutLine
                            </h1>
                          </div>
                          <div className="overflow-auto max-h-[150px]">
                            {propertyOutLineSearchLoading ? (
                              <div className="flex items-center justify-center p-3">
                                <LoaderCircle className="animate-spin" />
                              </div>
                            ) : (
                              <>
                                {propertyOutLineList.map((p) => (
                                  <button
                                    key={p.prop_name}
                                    className="block w-full p-2 text-start cursor-pointer hover:bg-slate-600"
                                    onMouseDown={() => {
                                      setGlobalSearchCompanyId(p.prop_name);
                                      setIsSearchBtnClick(!isSearchBtnClick);
                                      console.log(p.prop_name);
                                    }}
                                  >
                                    <span className="text-xs">
                                      {p.prop_name}
                                    </span>
                                  </button>
                                ))}
                              </>
                            )}
                            {!propertyOutLineList.length &&
                              !propertyOutLineSearchLoading && (
                                <p className="p-3 text-xs text-red-400">
                                  No results found.
                                </p>
                              )}
                          </div>
                        </div>
                      )}
                      {selectedCheckboxes.includes("Assets layer") && (
                        <div className="relative flex-1">
                          <div className="sticky border-b">
                            <h1 className="text-sm font-medium p-2 ">Assets</h1>
                          </div>
                          <div className="overflow-auto max-h-[150px]">
                            {assetsSearchLoading ? (
                              <div className="flex items-center justify-center p-3">
                                <LoaderCircle className="animate-spin" />
                              </div>
                            ) : (
                              <>
                                {" "}
                                {assetsList.map((a) => (
                                  <button
                                    key={a.asset_name}
                                    className="block w-full p-2 text-start cursor-pointer hover:bg-slate-600"
                                    onMouseDown={() => {
                                      setGlobalSearchCompanyId(a.asset_name);
                                      setIsSearchBtnClick(!isSearchBtnClick);
                                      console.log(a.asset_name);
                                    }}
                                  >
                                    <span className="text-xs">
                                      {a.asset_name}
                                    </span>
                                  </button>
                                ))}
                              </>
                            )}
                            {!assetsList.length && !assetsSearchLoading && (
                              <p className="p-3 text-xs text-red-400">
                                No results found.
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            </div>
            <Button onClick={() => showAll()}>Show</Button>
          </div>
          <div className="flex flex-wrap gap-2 p-2">
            <div className="flex-1 ">
              <Collapsible
                open={isCollapsibleOpen}
                onOpenChange={() => setIsCollapsibleOpen(!isCollapsibleOpen)}
              >
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center gap-10 p-2 border rounded-lg justify-between px-5">
                    <h1 className="text-sm font-medium leading-none ">
                      {selectedCheckboxes.length > 0 ? (
                        <div className="flex flex-wrap flex-row">
                          {selectedCheckboxes.length === 3
                            ? "All Layers"
                            : selectedCheckboxes.map((item, index) => (
                                <>
                                  <span className="text-xs">
                                    {item}
                                    {index !== selectedCheckboxes.length - 1 &&
                                      "/ "}
                                  </span>
                                </>
                              ))}
                        </div>
                      ) : (
                        "Layers"
                      )}
                    </h1>
                    {isCollapsibleOpen ? (
                      <ChevronsUp
                        onClick={() => {
                          setIsCollapsibleOpen(!isCollapsibleOpen);
                        }}
                        className="shadow-lg"
                      />
                    ) : (
                      <ChevronsDown
                        onClick={() => {
                          setIsCollapsibleOpen(!isCollapsibleOpen);
                        }}
                      />
                    )}
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="ml-3">
                    <div className="flex items-center gap-3 mt-3">
                      <Checkbox
                        id="All layer"
                        value="All layer"
                        checked={selectedCheckboxes.length === 3}
                        onClick={(e) => {
                          if (
                            selectedCheckboxes.includes(
                              "Property Point Layer"
                            ) &&
                            selectedCheckboxes.includes(
                              "Property OutLine Layer"
                            ) &&
                            selectedCheckboxes.includes("Assets layer")
                          ) {
                            setSelectedCheckboxes([]);
                          } else {
                            setSelectedCheckboxes([
                              "Property Point Layer",
                              "Property OutLine Layer",
                              "Assets layer",
                            ]);
                          }
                        }}
                      />
                      <label
                        htmlFor=" All layer"
                        className="text-sm font-medium leading-none "
                      >
                        Select All layer
                      </label>
                    </div>
                    {/* <div className="flex items-center gap-3 mt-3">
                      <Checkbox
                        id="Featured layer"
                        value="Featured layer"
                        checked={selectedCheckboxes.includes("Featured layer")}
                        onClick={(e) => {
                          if (selectedCheckboxes.includes(e.target.value)) {
                            setSelectedCheckboxes(
                              selectedCheckboxes.filter(
                                (item) => item !== e.target.value
                              )
                            );
                          } else {
                            setSelectedCheckboxes([
                              ...selectedCheckboxes,
                              e.target.value,
                            ]);
                          }
                        }}
                      />
                      <label
                        htmlFor=" Featured layer"
                        className="text-sm font-medium leading-none "
                      >
                        Featured layer
                      </label>
                    </div> */}
                    <div className="flex items-center gap-3 mt-3">
                      <Checkbox
                        id="Property Point Layer"
                        value="Property Point Layer"
                        checked={selectedCheckboxes.includes(
                          "Property Point Layer"
                        )}
                        onClick={(e) => {
                          if (selectedCheckboxes.includes(e.target.value)) {
                            setSelectedCheckboxes(
                              selectedCheckboxes.filter(
                                (item) => item !== e.target.value
                              )
                            );
                          } else {
                            setSelectedCheckboxes([
                              ...selectedCheckboxes,
                              e.target.value,
                            ]);
                          }
                        }}
                      />
                      <label
                        htmlFor="Property Point Layer"
                        className="text-sm font-medium leading-none "
                      >
                        Property Point Layer
                      </label>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      <Checkbox
                        id="Property OutLine Layer"
                        value="Property OutLine Layer"
                        checked={selectedCheckboxes.includes(
                          "Property OutLine Layer"
                        )}
                        onClick={(e) => {
                          if (selectedCheckboxes.includes(e.target.value)) {
                            setSelectedCheckboxes(
                              selectedCheckboxes.filter(
                                (item) => item !== e.target.value
                              )
                            );
                          } else {
                            setSelectedCheckboxes([
                              ...selectedCheckboxes,
                              e.target.value,
                            ]);
                          }
                        }}
                      />
                      <label
                        htmlFor="Property OutLine Layer"
                        className="text-sm font-medium leading-none "
                      >
                        Property OutLine Layer
                      </label>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      <Checkbox
                        id="Assets layer"
                        value="Assets layer"
                        checked={selectedCheckboxes.includes("Assets layer")}
                        onClick={(e) => {
                          if (selectedCheckboxes.includes(e.target.value)) {
                            setSelectedCheckboxes(
                              selectedCheckboxes.filter(
                                (item) => item !== e.target.value
                              )
                            );
                          } else {
                            setSelectedCheckboxes([
                              ...selectedCheckboxes,
                              e.target.value,
                            ]);
                          }
                        }}
                      />
                      <label
                        htmlFor="Assets layer"
                        className="text-sm font-medium leading-none "
                      >
                        Assets layer
                      </label>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
            <div className="flex-1 ">
              <RadioGroup
                defaultValue="world"
                className="flex mt-2"
                onValueChange={(value) => setSelectRadio(value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="world" id="world" />
                  <Label htmlFor="world">World</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="view" id="view" />
                  <Label htmlFor="view">View</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="b-box" id="b-box" />
                  <Label htmlFor="b-box">B-Box</Label>
                </div>
              </RadioGroup>
            </div>
            {resultTable && (
              <Button onClick={() => showTablePopUp()} className="bg-red-500">
                View Table
              </Button>
            )}
          </div>
        </div>
      </div>
    </Draggable>
  );
};
export default SearchPopUp;
