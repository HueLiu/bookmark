import { useState, useRef, useEffect } from "react";
import { TreeDataNode } from "../lib";
import logo from "../assets/logo.svg?url";
import SearchButton from "../assets/search-button.svg";
import ThemeToggleButton from "./themeToggleButton";

type Props = {
  allBookmarks: TreeDataNode[];
  searchResult: { title?: string; data?: TreeDataNode[] };
  setSearchResult: (result: { title?: string; data?: TreeDataNode[] }) => void;
};

const Header: React.FC<Props> = props => {
  const { allBookmarks, searchResult, setSearchResult } = props;

  const [showClearSearchButton, setShowClearSearchButton] =
    useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const searchInputRef = useRef<HTMLInputElement>(null);

  const onSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onSearchInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      onSearchButtonClick();
    }
  };

  const onSearchButtonClick = () => {
    const query = searchInputRef.current?.value;
    if (!query) {
      setShowClearSearchButton(false);
      setSearchResult({});
      return;
    }

    const results = searchBookmarks(allBookmarks, query);
    setShowClearSearchButton(true);
    setSearchResult({ title: "searchResult", data: results });
  };

  const onClearSearchButtonClick = () => {
    setInputValue("");
    setShowClearSearchButton(false);
    setSearchResult({});
  };

  const searchBookmarks = (data: TreeDataNode[], query: string | undefined) => {
    if (!query) {
      return data;
    }

    const results: TreeDataNode[] = [];
    if (!data) {
      return results;
    }

    for (const item of data) {
      if (item.title.toLowerCase().includes(query)) {
        results.push(item);
      }
      if (item.children) {
        const childResults = searchBookmarks(item.children, query);
        if (childResults.length > 0) {
          results.push(...childResults);
        }
      }
    }

    return results;
  };

  useEffect(() => {
    if (!searchResult || (!searchResult.title && !searchResult.data)) {
      setInputValue("");
      setShowClearSearchButton(false);
    }
  }, [searchResult]);

  return (
    <div className="items-center justify-between sticky top-0 z-40 flex h-16 shrink-0 gap-x-4 border-b border-gray-200 dark:pintree-border-gray-800 bg-white dark:pintree-bg-gray-900 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="h-full items-center flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-between">
        <div className="flex gap-x-4 justify-between">
          <img className="pl-2 h-8 w-auto lg:hidden" src={logo} alt="FTab" />
          <div className="hidden lg:block relative w-72 h-full items-center justify-between">
            <button
              className="absolute h-full text-gray-400 rounded"
              onClick={onSearchButtonClick}
            >
              <SearchButton className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400" />
            </button>
            <input
              ref={searchInputRef}
              type="search"
              className="text-sm text-gray-900 dark:text-gray-400 pl-8 h-full border-0 focus:outline-none focus:ring-0 dark:pintree-bg-gray-900"
              placeholder="Search..."
              onChange={onSearchInputChange}
              onKeyDown={onSearchInputKeyDown}
              value={inputValue}
            />
            <button
              className={`text-sm text-gray-500 mr-4 rounded ${
                showClearSearchButton ? "" : "hidden"
              }`}
              onClick={onClearSearchButtonClick}
            >
              Clear
            </button>
          </div>
        </div>
        <a className="lg:hidden ml-4 font-extrabold text-2xl dark:text-white">
          FTab
        </a>

        <ThemeToggleButton />
      </div>
    </div>
  );
};

export default Header;
