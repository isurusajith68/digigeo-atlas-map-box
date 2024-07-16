import {
  useGlobalSearchCompanyId,
  useSearchInput,
  useSearchText,
  useSelectedCheckboxes,
} from "@/store/global-search";
import { LoaderCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const AutoCompleteSearchTable = () => {
  const { selectedCheckboxes } = useSelectedCheckboxes();
  const { setSearchText } = useSearchText();
  const { searchInput } = useSearchInput();
  const { setGlobalSearchCompanyId } = useGlobalSearchCompanyId();

  const [propertyPointList, setPropertyPointList] = useState([]);
  const [propertyOutLineList, setPropertyOutLineList] = useState([]);
  const [assetsList, setAssetsList] = useState([]);

  const [propertyPointSearchLoading, setPropertyPointSearchLoading] =
    useState(true);
  const [propertyOutLineSearchLoading, setPropertyOutLineSearchLoading] =
    useState(false);
  const [assetsSearchLoading, setAssetsSearchLoading] = useState(true);

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

  return (
    <div className="absolute mt-0  z-20 w-full divide-y rounded-b-lg border-x-2 border-b-2  bg-background shadow-2xl ">
      <div className="flex">
        {selectedCheckboxes.includes("Property Point Layer") && (
          <div className="relative flex-1 border-r">
            <div className="sticky  border-b">
              <h1 className="text-sm font-medium p-2 ">Property Point</h1>
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
                        setIsSearchBtnClick(false);
                        console.log(p.prop_name);
                      }}
                    >
                      <span className="text-xs">{p.prop_name}</span>
                    </button>
                  ))}
                </>
              )}
              {!propertyPointList.length && !propertyPointSearchLoading && (
                <p className="p-3 text-xs text-red-400">No results found.</p>
              )}
            </div>
          </div>
        )}
        {selectedCheckboxes.includes("Property OutLine Layer") && (
          <div className="relative flex-1 border-r">
            <div className="sticky border-b">
              <h1 className="text-sm font-medium p-2 ">Property OutLine</h1>
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
                        setIsSearchBtnClick(false);
                        console.log(p.prop_name);
                      }}
                    >
                      <span className="text-xs">{p.prop_name}</span>
                    </button>
                  ))}
                </>
              )}
              {!propertyOutLineList.length && !propertyOutLineSearchLoading && (
                <p className="p-3 text-xs text-red-400">No results found.</p>
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
                        setIsSearchBtnClick(false);
                        console.log(a.asset_name);
                      }}
                    >
                      <span className="text-xs">{a.asset_name}</span>
                    </button>
                  ))}
                </>
              )}
              {!assetsList.length && !assetsSearchLoading && (
                <p className="p-3 text-xs text-red-400">No results found.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default AutoCompleteSearchTable;
