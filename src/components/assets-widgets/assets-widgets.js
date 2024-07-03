import { AsteriskSquare, Eye, EyeOffIcon } from "lucide-react";
import Image from "next/image";

const AssetsWidgets = ({ assetsType, visibility, setVisibility, icon }) => {
  return (
    <div className="flex p-1 gap-3 w-full">
      <div className="flex-3/4 items-center flex gap-2 ">
        <Image
          src={icon}
          alt="Asset Deposit"
          width={20}
          height={20}
        />
        <span className="text-xs">{assetsType}</span>
      </div>
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
        <div className="w-6"></div>
      </div>
    </div>
  );
};
export default AssetsWidgets;
