import { TreeDataNode } from "../lib";
import Navigation from "./navigation";
import logo from "../assets/logo.svg?url";

type Props = {
  allBookmarks: TreeDataNode[];
  path: TreeDataNode[];
  setPath: (path: TreeDataNode[]) => void;
  setSearchResult: (result: { title?: string; data?: TreeDataNode[] }) => void;
};

const Sidebar: React.FC<Props> = props => {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-60 lg:flex-col">
      <div className="flex flex-col border-r border-gray-200 dark:pintree-border-gray-800 bg-white px-4 h-full font-semibold dark:pintree-bg-gray-900">
        <div className="flex p-0 h-16 shrink-0 items-center">
          <img className="pl-2 h-8 w-auto" src={logo} alt="FTab" />
          <a className="ml-4 font-extrabold text-2xl dark:text-white">FTab</a>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto no-scrollbar p-1 cursor-pointer">
          <div className="flex flex-1 flex-col">
            <Navigation {...props} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
