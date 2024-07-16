import { Checkbox } from "@/components/ui/checkbox";
import {
  useIsCollapsibleOpen,
  useSelectedCheckboxes,
} from "@/store/global-search";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { ChevronsDown, ChevronsUp } from "lucide-react";
const LayerFilter = () => {
  const { selectedCheckboxes, setSelectedCheckboxes } = useSelectedCheckboxes();
  const { isCollapsibleOpen, setIsCollapsibleOpen } = useIsCollapsibleOpen();
  return (
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
                          {index !== selectedCheckboxes.length - 1 && "/ "}
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
                  selectedCheckboxes.includes("Property Point Layer") &&
                  selectedCheckboxes.includes("Property OutLine Layer") &&
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

          <div className="flex items-center gap-3 mt-3">
            <Checkbox
              id="Property Point Layer"
              value="Property Point Layer"
              checked={selectedCheckboxes.includes("Property Point Layer")}
              onClick={(e) => {
                if (selectedCheckboxes.includes(e.target.value)) {
                  setSelectedCheckboxes(
                    selectedCheckboxes.filter((item) => item !== e.target.value)
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
              checked={selectedCheckboxes.includes("Property OutLine Layer")}
              onClick={(e) => {
                if (selectedCheckboxes.includes(e.target.value)) {
                  setSelectedCheckboxes(
                    selectedCheckboxes.filter((item) => item !== e.target.value)
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
                    selectedCheckboxes.filter((item) => item !== e.target.value)
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
  );
};
export default LayerFilter;
