"use client";

import SearchBox from "./SearchBox";
import { DocSearchProps } from "./types";

const DocSearch = ({
  className = "",
  placeholder = "Search documentation...",
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

export default DocSearch;
