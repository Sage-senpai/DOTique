import React from "react";
import "./SearchFilters.scss";
interface SearchFiltersProps {
    activeFilter: "all" | "users" | "posts" | "nfts";
    onFilterChange: (filter: "all" | "users" | "posts" | "nfts") => void;
}
declare const SearchFilters: React.FC<SearchFiltersProps>;
export default SearchFilters;
//# sourceMappingURL=SearchFilters.d.ts.map