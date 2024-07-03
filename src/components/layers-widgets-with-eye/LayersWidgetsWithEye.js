import { Eye, EyeOffIcon } from "lucide-react";

const LayersWidgetsWithEye = ({ children, visibility, setVisibility }) => {
  return (
    <div className="flex  gap-3 w-full">
      <div className="flex gap-2 items-center justify-around  w-full pr-2">
        {children}
        <div className="flex-1 flex justify-end items-center">
          <div className=" gap-2">
            {visibility ? (
              <Eye
                onClick={() => {
                  setVisibility(!visibility);
                }}
                className="h-4 w-4 cursor-pointer"
              />
            ) : (
              <EyeOffIcon
                onClick={() => {
                  setVisibility(!visibility);
                }}
                className="h-4 w-4 cursor-pointer text-gray-400"
              />
            )}
          </div>
          <div className="w-5"></div>
        </div>
      </div>
    </div>
  );
};
export default LayersWidgetsWithEye;
