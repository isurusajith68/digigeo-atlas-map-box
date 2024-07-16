import { useSearchPopupMinimize, useSelectedRadio, useShowBoundingBox } from "@/store/global-search";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useSearchClick } from "@/store/side-bar-slice";

const ViewFilter = () => {
  const { setSelectRadio } = useSelectedRadio();
  const { setShowBoundingBox } = useShowBoundingBox();
  const { setIsSearchBtnClick } = useSearchClick();
  const { setSearchPopupMinimize } = useSearchPopupMinimize();
  return (
    <RadioGroup
      defaultValue="world"
      className="flex mt-2"
      onValueChange={(value) => {
        setSelectRadio(value);
        if (value === "b-box") {
          setShowBoundingBox(true);
          setSearchPopupMinimize(true);
        }
      }}
      value={useSelectedRadio((state) => state.selectRadio)}
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
  );
};
export default ViewFilter;
