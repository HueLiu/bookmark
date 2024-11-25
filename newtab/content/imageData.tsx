import { TreeDataNode } from "../lib";
import defaultIcon from "../assets/default-icon.svg?url";

const ImageData: React.FC<{ link: TreeDataNode }> = ({ link }) => {
  return (
    <img
      className="w-8 h-8 mr-4 rounded-full flex-shrink-0 card-icon-bg"
      src={chrome.runtime.getURL(
        `/_favicon/?pageUrl=${encodeURIComponent(link.url || "")}&size=32`
      )}
      alt={link.title}
      onError={e => {
        (e.target as HTMLImageElement).src = defaultIcon;
      }}
    />
  );
};

export default ImageData;
