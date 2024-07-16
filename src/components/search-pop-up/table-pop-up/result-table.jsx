import {
  useClickAssetTab,
  useClickClaimLinkTab,
  useClickPropertyTab,
  useMinimizeSearchTablePopUp,
  useSelectedCheckboxes,
  useShowAllAssets,
  useShowAllPropertiesOutlines,
  useShowAllPropertiesPoints,
} from "@/store/global-search";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import SyncPropTable from "./table/sync-prop-table";
import AssetsTable from "./table/assets-table";
import SyncClaimLinkTable from "./table/sync-claim-link-table";
import { useEffect } from "react";
const ResultTable = ({ syncPropData, assetData, syncClaimLinkData }) => {
  const { setClickPropertyTab } = useClickPropertyTab();
  const { setClickAssetTab } = useClickAssetTab();
  const { setClickClaimLinkTab } = useClickClaimLinkTab();
  const { selectedCheckboxes } = useSelectedCheckboxes();
  const { minimizeSearchTablePopUp } = useMinimizeSearchTablePopUp();
  useEffect(() => {
    selectedCheckboxes.includes("Property Point Layer")
      ? setClickPropertyTab(true)
      : selectedCheckboxes.includes("Assets layer")
      ? setClickAssetTab(true)
      : selectedCheckboxes.includes("Property OutLine Layer")
      ? setClickClaimLinkTab(true)
      : "";
  }, [selectedCheckboxes]);

  return (
    <Tabs
      defaultValue={
        selectedCheckboxes.includes("Property Point Layer")
          ? "pp"
          : selectedCheckboxes.includes("Assets layer")
          ? "a"
          : selectedCheckboxes.includes("Property OutLine Layer")
          ? "po"
          : ""
      }
    >
      <TabsList className="gap-20">
        {selectedCheckboxes.includes("Property Point Layer") && (
          <TabsTrigger
            value="pp"
            onClick={() => {
              setClickPropertyTab(true);
              setClickAssetTab(false);
              setClickClaimLinkTab(false);
            }}
          >
            Property Points
          </TabsTrigger>
        )}
        {selectedCheckboxes.includes("Assets layer") && (
          <TabsTrigger
            value="a"
            onClick={() => {
              setClickPropertyTab(false);
              setClickAssetTab(true);
              setClickClaimLinkTab(false);
            }}
          >
            Assets
          </TabsTrigger>
        )}
        {selectedCheckboxes.includes("Property OutLine Layer") && (
          <TabsTrigger
            value="po"
            onClick={() => {
              setClickPropertyTab(false);
              setClickAssetTab(false);
              setClickClaimLinkTab(true);
            }}
          >
            Property Outline
          </TabsTrigger>
        )}
      </TabsList>
      <TabsContent value="pp" className="h-[340px]  w-[950px]   ">
        <div>
          <SyncPropTable data={syncPropData} />
        </div>
      </TabsContent>
      <TabsContent value="a" className="h-[340px]  w-[950px]   ">
        <div>
          <AssetsTable data={assetData} />
        </div>
      </TabsContent>
      <TabsContent value="po" className="h-[340px]  w-[950px]   ">
        {" "}
        <div>
          <SyncClaimLinkTable data={syncClaimLinkData} />
        </div>
      </TabsContent>
    </Tabs>
  );
};
export default ResultTable;
