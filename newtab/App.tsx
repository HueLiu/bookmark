import React, { useCallback, useEffect, useState } from "react";
import Content from "./content";
import OffCanvasMenu from "./offCanvasMenu";
import Sidebar from "./sidebar";

import { getBookmarks, TreeDataNode } from "./lib";

const NewTabApp: React.FC = () => {
  const [rootBookmark, setRootBookmark] = useState<TreeDataNode[]>([]);
  const [path, setPath] = useState<TreeDataNode[]>([]);
  const [searchResult, setSearchResult] = useState<{
    title?: string;
    data?: TreeDataNode[];
  }>({});

  const refreshBookmarks = useCallback(async () => {
    const rootBookmark = await getBookmarks();
    setRootBookmark(rootBookmark);
    setPath([rootBookmark[0]]);
  }, []);

  useEffect(() => {
    refreshBookmarks().catch(console.error);
  }, [refreshBookmarks]);

  return (
    <>
      <OffCanvasMenu />
      <Sidebar
        allBookmarks={rootBookmark}
        path={path}
        setPath={setPath}
        setSearchResult={setSearchResult}
      />
      <Content
        allBookmarks={rootBookmark}
        path={path}
        setPath={setPath}
        searchResult={searchResult}
        setSearchResult={setSearchResult}
      />
    </>
  );
};

export default NewTabApp;
