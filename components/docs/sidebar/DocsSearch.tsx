"use client";

import SearchBox from "@/components/docs/search/SearchBox";

const DocsSearch = ({
  className = "",
  placeholder = "Search something...",
  minQueryLength = 2,
  debounceTime = 300,
}) => {
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
