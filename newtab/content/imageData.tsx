import { useEffect, useState } from "react";
import { logoToBase64, TreeDataNode } from "../lib";
import localforage from "localforage";
import defaultIcon from "../assets/default-icon.svg?url";

const ImageData: React.FC<{ link: TreeDataNode }> = ({ link }) => {
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    const renderImage = async () => {
      let image: any = await localforage.getItem(link.id);
      if (!image) {
        image = await logoToBase64(link.url || "");
        if (image) {
          await localforage.setItem(link.id, image);
        } else {
          await localforage.setItem(link.id, defaultIcon);
          image = defaultIcon;
        }
      }
      setImage(image);
    };
    renderImage();
  }, []);
  return (
    <img
      className="w-8 h-8 mr-4 rounded-full flex-shrink-0 card-icon-bg"
      src={image}
      alt={link.title}
    />
  );
};

export default ImageData;
