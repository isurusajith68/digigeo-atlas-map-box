import {
  ChevronsDown,
  ChevronsRight,
  Eye,
  EyeOffIcon,
  Layers,
  Tag,
} from "lucide-react";

const LayerComponentsWidgets = ({
  visibility,
  setVisibility,
  toggle,
  setToggle,
  layersArray,
  layerComponentsName,
  children,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center p-1  gap-3 bg-zinc-200 dark:bg-white dark:text-black rounded-lg">
        <div className="flex gap-2 items-center">
          <Layers className="h-4 w-4 " />
          <span className="text-sm ">{layerComponentsName}</span>
        </div>
        <div className="flex gap-2 items-center">
          <Tag className="h-3 w-4 cursor-pointer"/>
          {visibility ? (
            <Eye
              onClick={() => {
                setVisibility(!visibility);
                if (layersArray) {
                  layersArray.forEach((layer) => {
                    layer.setVisibility(false);
                  });
                }
              }}
              className="h-4 w-4 cursor-pointer"
            />
          ) : (
            <EyeOffIcon
              onClick={() => {
                setVisibility(!visibility);
                if (layersArray) {
                  layersArray.forEach((layer) => {
                    layer.setVisibility(true);
                  });
                }
              }}
              className="h-4 w-4 cursor-pointer text-gray-400"
            />
          )}
          {toggle ? (
            <ChevronsDown
              onClick={() => setToggle(!toggle)}
              className="h-4 w-4 cursor-pointer"
            />
          ) : (
            <ChevronsRight
              onClick={() => setToggle(!toggle)}
              className="h-4 w-4 cursor-pointer"
            />
          )}
        </div>
      </div>
      {toggle && <> {children}</>}
    </div>
  );
};
export default LayerComponentsWidgets;
