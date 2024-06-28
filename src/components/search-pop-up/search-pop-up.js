import { SearchClick } from "@/store/side-bar-slice";
import {
  ArrowDownFromLine,
  PanelTopClose,
  PanelTopCloseIcon,
  X,
} from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ModalPopup } from "../ui-custom/dialog-v2-popup";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import Draggable from "react-draggable";
import { useState } from "react";

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
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  console.log(selectedCheckboxes);
  return (
    <Draggable>
      <div className="absolute flex top-2 left-20 z-10 bg-background text-foreground  rounded-lg p-2 w-[500px] flex-col resize overflow-auto min-w-[500px] min-h-[300px] ">
        <div className="flex justify-between w-full border-b p-2">
          <div className="flex items-center justify-center">
            <h1 className="font-semibold ">Global Search</h1>
          </div>
          <div className="flex items-center justify-center">
            <X
              className="cursor-pointer"
              onClick={() => setIsSearchBtnClick(!isSearchBtnClick)}
            />
          </div>
        </div>
        <div>
          <div className="flex w-full max-w-[450px] items-center space-x-2 p-2 ">
            <Input type="email" placeholder="Search" />
            <Button type="submit">Search</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex-1">
              <Collapsible>
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center gap-10 p-2 border-b justify-between px-5">
                    <h1 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {selectedCheckboxes.length > 0 ? (
                        <div className="flex flex-wrap flex-row">
                          {selectedCheckboxes.map((item, index) => {
                            return (
                              <span className="text-xs" key={index}>
                                {item} /{" "}
                              </span>
                            );
                          })}
                        </div>
                      ) : (
                        "Layers"
                      )}
                    </h1>
                    <ArrowDownFromLine size={16} />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="ml-3">
                    <div className="flex items-center gap-3 mt-3">
                      <Checkbox
                        id="layers"
                        value="Featured layer"
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
                        htmlFor="layers"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Featured layer
                      </label>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      <Checkbox
                        id="layers"
                        value="Sync property layer"
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
                        htmlFor="layers"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Sync property layer
                      </label>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      <Checkbox
                        id="layers"
                        value="Claim link layer"
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
                        htmlFor="layers"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Claim link layer
                      </label>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      <Checkbox
                        id="layers"
                        value="Assets layer"
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
                        htmlFor="layers"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Assets layer
                      </label>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
            <div className="flex-1 ">
              <RadioGroup defaultValue="option-one" className="flex mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-one" id="option-one" />
                  <Label htmlFor="option-one">World</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-two" id="option-two" />
                  <Label htmlFor="option-two">View</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-two" id="option-two" />
                  <Label htmlFor="option-two">B-Box</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
};
export default SearchPopUp;
