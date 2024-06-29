import { SearchClick } from "@/store/side-bar-slice";
import { ArrowDownFromLine, X } from "lucide-react";

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
  const [selectRadio, setSelectRadio] = useState("world");

  return (
    <Draggable className="resize overflow-auto">
      <div className="absolute flex top-2 left-20 z-10 bg-background ring ring-gray-500 shadow-sm text-foreground  rounded-lg  w-[500px] flex-col  min-w-[500px] min-h-[300px] ">
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
        <div>
          <div className="flex w-full max-w-[450px] items-center space-x-2 p-2 ">
            <Input type="search" placeholder="Search" />
            <Button type="search">Search</Button>
          </div>
          <div className="flex flex-wrap gap-2 p-2">
            <div className="flex-1 ">
              <Collapsible>
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center gap-10 p-2 border rounded-lg justify-between px-5">
                    <h1 className="text-sm font-medium leading-none ">
                      {selectedCheckboxes.length > 0 ? (
                        <div className="flex flex-wrap flex-row">
                          {selectedCheckboxes.length === 4
                            ? "All Layers"
                            : selectedCheckboxes.map((item, index) => (
                                <>
                                  <span className="text-sm">
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
                    <ArrowDownFromLine size={16} />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="ml-3">
                    <div className="flex items-center gap-3 mt-3">
                      <Checkbox
                        id="All layer"
                        value="All layer"
                        checked={selectedCheckboxes.length === 4}
                        onClick={(e) => {
                          if (
                            selectedCheckboxes.includes("Featured layer") &&
                            selectedCheckboxes.includes(
                              "Sync property layer"
                            ) &&
                            selectedCheckboxes.includes("Claim link layer") &&
                            selectedCheckboxes.includes("Assets layer")
                          ) {
                            setSelectedCheckboxes([]);
                          } else {
                            setSelectedCheckboxes([
                              "Featured layer",
                              "Sync property layer",
                              "Claim link layer",
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
                    <div className="flex items-center gap-3 mt-3">
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
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      <Checkbox
                        id="Sync property layer"
                        value="Sync property layer"
                        checked={selectedCheckboxes.includes(
                          "Sync property layer"
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
                        htmlFor="Sync property layer"
                        className="text-sm font-medium leading-none "
                      >
                        Sync property layer
                      </label>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      <Checkbox
                        id="Claim link layer"
                        value="Claim link layer"
                        checked={selectedCheckboxes.includes(
                          "Claim link layer"
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
                        htmlFor="Claim link layer"
                        className="text-sm font-medium leading-none "
                      >
                        Claim link layer
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
          </div>
        </div>
      </div>
    </Draggable>
  );
};
export default SearchPopUp;
