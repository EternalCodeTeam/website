"use client";

import SearchBox from "@/components/docs/search/search-box";

const DocsSearch = ({
  className = "",
  placeholder = "Search something...",
  minQueryLength = 2,
  debounceTime = 300,
}) => (
  <SearchBox
    className={className}
    debounceTime={debounceTime}
    minQueryLength={minQueryLength}
    placeholder={placeholder}
    searchEndpoint="/api/docs/search-index"
  />
);

export default DocsSearch;
