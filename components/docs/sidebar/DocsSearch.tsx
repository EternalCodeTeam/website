"use client";

import SearchBox from "@/components/docs/search/SearchBox";

import { DocSearchProps } from "@/components/docs/search/types";

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
