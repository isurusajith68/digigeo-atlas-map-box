import { Minus, X } from "lucide-react";
import Draggable from "react-draggable";
import ResultTable from "./result-table";
import {
  useClickAssetTab,
  useClickClaimLinkTab,
  useClickPropertyTab,
  useLoadingAssetTable,
  useLoadingClaimLinkTable,
  useLoadingPropertyTable,
  useSearchTablePopUp,
  useSearchText,
} from "@/store/global-search";
import { useEffect, useState } from "react";

const TablePopUp = () => {
  const { searchText } = useSearchText();

  const [syncPropData, setSyncPropData] = useState([]);
  const [assetData, setAssetData] = useState([]);
  const [syncClaimLinkData, setSyncClaimLinkData] = useState([]);
  const { searchTablePopUp, setSearchTablePopUp } = useSearchTablePopUp();

  const { clickPropertyTab } = useClickPropertyTab();
  const { clickAssetTab } = useClickAssetTab();
  const { clickClaimLinkTab } = useClickClaimLinkTab();

  const { setLoadingPropertyTable } = useLoadingPropertyTable();
  const { setLoadingAssetTable } = useLoadingAssetTable();
  const { setLoadingClaimLinkTable } = useLoadingClaimLinkTable();

  useEffect(() => {
    if (searchText.length >= 2) {
      clickPropertyTab ? fetchSearchDetailsSyncPropTable(searchText) : "";
      clickAssetTab ? fetchSearchDetailsAssetsTable(searchText) : "";
      clickClaimLinkTab ? fetchSearchDetailsSyncClaimLinkTable(searchText) : "";
    }
  }, [clickAssetTab, clickClaimLinkTab, clickPropertyTab, searchText]);

  const fetchSearchDetailsSyncPropTable = async (searchText) => {
    try {
      setLoadingPropertyTable(true);
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/searchdetails_tbl_sync_property/${searchText}`
      );

      const data = await res.json();
      setSyncPropData(data.data);
      setLoadingPropertyTable(false);
    } catch (error) {
      console.log(error);
      setLoadingPropertyTable(false);
    }
  };

  const fetchSearchDetailsAssetsTable = async (searchText) => {
    try {
      setLoadingAssetTable(true);
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/searchdetails_tbl_sync_asset/${searchText}`
      );

      const data = await res.json();
      setAssetData(data.data);
      setLoadingAssetTable(false);
    } catch (error) {
      console.log(error);
      setLoadingAssetTable(false);
    }
  };

  const fetchSearchDetailsSyncClaimLinkTable = async (searchText) => {
    try {
      setLoadingClaimLinkTable(true);
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/searchdetails_tbl_sync_claimlink/${searchText}`
      );

      const data = await res.json();
      setSyncClaimLinkData(data.data);
      setLoadingClaimLinkTable(false);
    } catch (error) {
      console.log(error);
      setLoadingClaimLinkTable(false);
    }
  };

  return (
    <Draggable className="resize overflow-auto">
      <div className="absolute flex top-2 left-20 z-10 bg-background ring ring-gray-500 shadow-sm text-foreground  rounded-lg  w-[500px] flex-col  min-w-[1000px] min-h-[320px] ">
        <div className="flex justify-between w-full border-b p-2 bg-slate-400 read-only rounded-t-lg">
          <div className="flex items-center ">
            <h1 className="font-semibold text-white">
              Search Table{" "}
              <span className="text-gray-300 ml-1">({searchText})</span>
            </h1>
          </div>
          <div className="flex items-center justify-center  gap-3">
            <Minus
              className="cursor-pointer text-white h-5 w-5"

              //   onClick={() => setSearchTablePopUp(!searchTablePopUp)}
            />
            <X
              className="cursor-pointer text-white h-5 w-5"
              onClick={() => setSearchTablePopUp(!searchTablePopUp)}
            />
          </div>
        </div>
        <div className="flex w-full  mt-2 ml-10">
          <ResultTable
            syncPropData={syncPropData}
            assetData={assetData}
            syncClaimLinkData={syncClaimLinkData}
          />
        </div>
      </div>
    </Draggable>
  );
};
export default TablePopUp;
