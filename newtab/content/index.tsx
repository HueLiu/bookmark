import React from "react";
import { TreeDataNode } from "../lib";
import Footer from "./footer";
import Header from "./header";
import ContentFolder from "../assets/content-folder.svg";
import ImageData from "./imageData";

type Props = {
  allBookmarks: TreeDataNode[];
  path: TreeDataNode[];
  setPath: (path: TreeDataNode[]) => void;
  searchResult: { title?: string; data?: TreeDataNode[] };
  setSearchResult: (result: { title?: string; data?: TreeDataNode[] }) => void;
};

// Main Content Area
const Content: React.FC<Props> = props => {
  const { allBookmarks, path, setPath, searchResult, setSearchResult } = props;

  const renderBreadcrumbs = (
    path: TreeDataNode[],
    searchResult: { title?: string; data?: TreeDataNode[] }
  ) => {
    if (searchResult?.title) {
      return (
        <>
          <span className="cursor-pointer hover:underline">Search Results</span>
        </>
      );
    }
    return path.map((item, index) => {
      const onBreadcrumbClick = () => {
        const newPath = path.slice(0, index + 1);
        setPath(newPath);
        setSearchResult({});
      };

      if (index < path.length - 1) {
        return (
          <span key={`breadcrumb-${item.id}`}>
            <span
              className="cursor-pointer hover:underline"
              onClick={onBreadcrumbClick}
            >
              {item.title}
            </span>
            <span> {">"} </span>
          </span>
        );
      } else {
        return (
          <span
            key={`breadcrumb-${item.id}`}
            className="cursor-pointer hover:underline"
            onClick={onBreadcrumbClick}
          >
            {item.title}
          </span>
        );
      }
    });
  };

  const renderBookmarks = (
    path: TreeDataNode[],
    searchResult: { title?: string; data?: TreeDataNode[] }
  ) => {
    let data = [];
    if (searchResult?.data) {
      data = searchResult.data;
    } else if (path.length > 0) {
      data = path[path.length - 1].children || [];
    } else {
      data = allBookmarks[0]?.children || [];
    }

    if (!data || data.length === 0) {
      return <NoResultMessage />;
    }

    // Separate folders and links
    const folders = data.filter(item => !!item.children);
    const links = data.filter(item => !item.children);
    // Create folder section
    if (folders.length > 0 && links.length > 0) {
      return (
        <>
          <FolderSection folders={folders} />
          <hr className="my-1 border-t-1 border-gray-200 dark:pintree-border-gray-800" />
          <LinkSection links={links} />
        </>
      );
    }
    if (folders.length > 0) {
      return <FolderSection folders={folders} />;
    }
    return <LinkSection links={links} />;
  };

  const NoResultMessage: React.FC = () => {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-gray-500 text-xl font-semibold mt-4">
          Oops, Nothing to See Here!
        </h2>
        <p className="text-gray-500 mt-2">
          Try another search or discover more cool stuff elsewhere!
        </p>
      </div>
    );
  };

  const FolderSection: React.FC<{
    folders: TreeDataNode[];
  }> = ({ folders }) => {
    return (
      <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-8 2xl:grid-cols-12 gap-6">
        {folders.map(folder => (
          <div
            key={`folder-${folder.id}`}
            className="folder-card text-gray rounded-lg cursor-pointer flex flex-col items-center"
            onClick={() => {
              setPath(path.concat(folder));
              setSearchResult({});
            }}
          >
            <div className="mb-2">
              <ContentFolder />
            </div>
            <h2 className="text-xs font-normal text-center w-full truncate dark:text-gray-400">
              {folder.title}
            </h2>
          </div>
        ))}
      </div>
    );
  };

  const LinkSection: React.FC<{
    links: TreeDataNode[];
  }> = ({ links }) => {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-6">
        {links.map(link => (
          <div
            key={`link-${link.id}`}
            className="cursor-pointer flex items-center hover:shadow-sm transition-shadow p-4 bg-white shadow-sm ring-1 ring-gray-900/5 dark:pintree-ring-gray-800 rounded-lg hover:bg-gray-100 dark:pintree-bg-gray-900 dark:hover:pintree-bg-gray-800"
            onClick={() => window.open(link.url, "_blank")}
          >
            <ImageData link={link} />
            <div className="flex flex-col overflow-hidden">
              <h2 className="text-sm font-medium mb-1 truncate dark:text-gray-400">
                {link.title}
              </h2>
              <p className="text-xs text-gray-400 dark:text-gray-600 dark:hover:text-gray-400 truncate">
                {link.url?.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="lg:pl-60 dark:pintree-bg-gray-900 flex flex-col min-h-screen">
      <Header {...props} />

      <main className="mt-4 dark:pintree-bg-gray-900 flex-grow">
        <div className="mt-2 px-6 text-sm text-gray-400 flex justify-between items-center">
          <div>{renderBreadcrumbs(path, searchResult)}</div>
        </div>
        <div className="grid gap-6 p-6">
          {renderBookmarks(path, searchResult)}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Content;
