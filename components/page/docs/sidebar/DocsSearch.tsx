"use client";

import SearchBox from "@/components/page/docs/sidebar/search/SearchBox";

import { DocSearchProps } from "./search/types";

const DocsSearch = ({
  className = "",
  placeholder = "Search something...",
  minQueryLength = 2,
  debounceTime = 300,
}: DocSearchProps) => {
  return (
    <SearchBox
      className={className}
      placeholder={placeholder}
      minQueryLength={minQueryLength}
      debounceTime={debounceTime}
      searchEndpoint="/api/docs/search-index"
    />
  );
};

export default DocsSearch;
