import AssetsWidgets from "@/components/assets-widgets/assets-widgets";
import {
  useAssetDepositVisibility,
  useAssetHistoricalMinesVisibility,
  useAssetOccurrenceVisibility,
  useAssetOperatingMinesVisibility,
  useAssetZoneVisibility,
} from "@/store/assets-sidebar-btn";

const AssetToggleSub = () => {
  const { assetOperatingMinesVisibility, setAssetOperatingMinesVisibility } =
    useAssetOperatingMinesVisibility();

  const { assetHistoricalMinesVisibility, setAssetHistoricalMinesVisibility } =
    useAssetHistoricalMinesVisibility();

  const { assetDepositVisibility, setAssetDepositVisibility } =
    useAssetDepositVisibility();

  const { assetZoneVisibility, setAssetZoneVisibility } =
    useAssetZoneVisibility();

  const { assetOccurrenceVisibility, setAssetOccurrenceVisibility } =
    useAssetOccurrenceVisibility();

  return (
    <div className="flex gap-1 flex-col">
      <AssetsWidgets
        assetsType="Operating Mines"
        icon="./asset-opmine.svg"
        visibility={assetOperatingMinesVisibility}
        setVisibility={setAssetOperatingMinesVisibility}
      />
      <AssetsWidgets
        assetsType="Historical Mines"
        icon={"./asset-historical.svg"}
        visibility={assetHistoricalMinesVisibility}
        setVisibility={setAssetHistoricalMinesVisibility}
      />
      <AssetsWidgets
        assetsType="Deposit"
        icon={"./asset-deposit.svg"}
        visibility={assetDepositVisibility}
        setVisibility={setAssetDepositVisibility}
      />
      <AssetsWidgets
        assetsType="Zone"
        icon={"./asset-zone.svg"}
        visibility={assetZoneVisibility}
        setVisibility={setAssetZoneVisibility}
      />
      <AssetsWidgets
        assetsType="Occurrence"
        icon={"./asset-occurrence.svg"}
        visibility={assetOccurrenceVisibility}
        setVisibility={setAssetOccurrenceVisibility}
      />
    </div>
  );
};
export default AssetToggleSub;
