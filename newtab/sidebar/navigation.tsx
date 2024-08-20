import { useRef } from "react";
import { TreeDataNode } from "../lib";
import SidebarFolder from "../assets/sidebar-folder.svg";
import SidebarToggle from "../assets/sidebar-toggle.svg";

type Props = {
  allBookmarks: TreeDataNode[];
  path: TreeDataNode[];
  setPath: (path: TreeDataNode[]) => void;
  setSearchResult: (result: { title?: string; data?: TreeDataNode[] }) => void;
};

const Navigation: React.FC<Props> = props => {
  const { allBookmarks, path, setPath, setSearchResult } = props;

  const navigationRef = useRef<HTMLUListElement>(null);
  const ulRefs = useRef<{ [key: string]: HTMLUListElement | null }>({});
  const selectedBookmark = path.length > 0 ? path[path.length - 1] : undefined;

  const renderNavigation = (
    folders: TreeDataNode[],
    isFirstRender = false,
    path: TreeDataNode[] = []
  ) => {
    return folders.map((folder, index) => {
      if (!folder.children) {
        return <div key={`sidebar-${folder.id}`}></div>;
      }
      const expanded = isFirstRender && index === 0;
      const element = (
        <div key={`sidebar-${folder.id}`}>
          <li
            className={`items-center group flex justify-between gap-x-3 rounded-md p-2 text-gray-700 dark:text-gray-400 hover:text-main-500 hover:bg-gray-50 dark:hover:pintree-bg-gray-800 bg-opacity-50 ${
              selectedBookmark?.id === folder.id ? "sidebar-active" : ""
            }`}
            onClick={(event: React.MouseEvent<HTMLLIElement>) => {
              event.stopPropagation();
              const navItem = event.target as HTMLLIElement;
              if (!navItem.classList.contains("sidebar-active")) {
                navigationRef.current
                  ?.querySelectorAll(".sidebar-active")
                  .forEach(el => el.classList.remove("sidebar-active"));
                navItem.classList.add("sidebar-active");
              }
              navItem
                .querySelector("span.toggle-svg")
                ?.classList.toggle("rotate-90");
              !expanded &&
                ulRefs.current[folder.id]?.classList.toggle("hidden");
              setPath(path.concat(folder));
              setSearchResult({});
            }}
          >
            <div className="flex items-center space-x-2 truncate">
              <span>
                <SidebarFolder className="h-4 w-4 mr-1" />
              </span>
              <a className="flex text-sm leading-6 font-semibold dark:text-gray-400">
                {folder.title}
              </a>
            </div>
            {folder.children.length > 0 && !expanded && (
              <span className="ml-2 transform transition-transform toggle-svg">
                <SidebarToggle className="h-4 w-4" />
              </span>
            )}
          </li>
          {renderSubNavigation(folder, expanded, path)}
        </div>
      );
      return element;
    });
  };

  const renderSubNavigation = (
    folder: TreeDataNode,
    expanded: boolean,
    path: TreeDataNode[]
  ) => {
    if (!folder.children || folder.children.length === 0) {
      return <></>;
    }
    return (
      <ul
        key={`sidebar-${folder.id}-children`}
        className={`ml-4 space-y-2 ${expanded ? "" : "hidden"}`}
        ref={e => (ulRefs.current[folder.id] = e)}
      >
        {renderNavigation(folder.children, false, path.concat(folder))}
      </ul>
    );
  };

  return (
    <ul ref={navigationRef} className="space-y-1">
      {renderNavigation(allBookmarks, true)}
    </ul>
  );
};

export default Navigation;
