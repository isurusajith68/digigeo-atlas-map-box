import {
  useShowAllAssets,
  useShowAllPropertiesOutlines,
  useShowAllPropertiesPoints,
} from "@/store/global-search";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const ResultTable = () => {
  const { showAssets } = useShowAllAssets();
  const { showPropertiesPoints } = useShowAllPropertiesPoints();
  const { showPropertiesOutlines } = useShowAllPropertiesOutlines();
console.log(showPropertiesOutlines, "showPropertiesOutlines")
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="gap-20">
        <TabsTrigger value="pp">Property Points</TabsTrigger>
        <TabsTrigger value="a">Assets</TabsTrigger>
        <TabsTrigger value="po">Property Outline</TabsTrigger>
      </TabsList>
      <TabsContent value="pp" className="h-[200px] overflow-auto">
        {showPropertiesPoints?.map((property) => (
          <div key={property.id} className="odd:bg-slate-500">
            {property.prop_name}
          </div>
        ))}
      </TabsContent>
      <TabsContent value="a" className="h-[200px] overflow-auto">
        {showAssets?.map((asset) => (
          <div key={asset.id} className="odd:bg-slate-500">
            {asset.asset_name}
          </div>
        ))}
      </TabsContent>
      <TabsContent value="po" className="h-[200px] overflow-auto">
        {" "}
        {showPropertiesOutlines?.[0].json_build_object.features.map((po) => (
          <div key={po.id} className="odd:bg-slate-500">
            {po.properties.prop_name}
          </div>
        ))}
      </TabsContent>
    </Tabs>
  );
};
export default ResultTable;
