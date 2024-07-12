import {
  useClickAssetTab,
  useClickClaimLinkTab,
  useClickPropertyTab,
  useShowAllAssets,
  useShowAllPropertiesOutlines,
  useShowAllPropertiesPoints,
} from "@/store/global-search";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import SyncPropTable from "./table/sync-prop-table";
import AssetsTable from "./table/assets-table";
import SyncClaimLinkTable from "./table/sync-claim-link-table";
const ResultTable = ({ syncPropData, assetData, syncClaimLinkData }) => {
  const { setClickPropertyTab } = useClickPropertyTab();
  const { setClickAssetTab } = useClickAssetTab();
  const { setClickClaimLinkTab } = useClickClaimLinkTab();

  return (
    <Tabs defaultValue="pp">
      <TabsList className="gap-20">
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
      </TabsList>
      <TabsContent value="pp" className="h-[400px]  w-[950px]">
        <div>
          <SyncPropTable data={syncPropData} />
        </div>
      </TabsContent>
      <TabsContent value="a" className="h-[400px]  w-[950px]">
        <div>
          <AssetsTable data={assetData} />
        </div>
      </TabsContent>
      <TabsContent value="po" className="h-[400px]  w-[950px]">
        {" "}
        <div>
          <SyncClaimLinkTable data={syncClaimLinkData} />
        </div>
      </TabsContent>
    </Tabs>
  );
};
export default ResultTable;
