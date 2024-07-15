import { X } from "lucide-react";
import Draggable from "react-draggable";

const BBoxInstruction = () => {
  return (
    <Draggable>
      <div className="absolute flex top-32 left-80 z-10 bg-background ring ring-gray-500 shadow-sm text-foreground  rounded-lg  w-[500px] flex-col  min-w-[500px] min-h-[220px] ">
        <div className="flex justify-between w-full border-b p-2 bg-slate-400 read-only rounded-t-lg">
          <div className="flex items-center justify-center">
            <h1 className="font-semibold text-white">
              Boundary Box Instruction
            </h1>
          </div>
          <div
            className="flex items-center justify-center text-white cursor-pointer"
            onClick={() => ""}
          >
            Skip
          </div>
        </div>
        <div></div>
      </div>
    </Draggable>
  );
};
export default BBoxInstruction;
