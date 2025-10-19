//src/components/Search/SearchFilters.tsx
import React from "react";
import "./SearchFilters.scss";

interface SearchFiltersProps {
  activeFilter: "all" | "users" | "posts" | "nfts";
  onFilterChange: (filter: "all" | "users" | "posts" | "nfts") => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  const filters = [
    { id: "all", label: "All", icon: "🔍" },
    { id: "users", label: "Users", icon: "👥" },
    { id: "posts", label: "Posts", icon: "📝" },
    { id: "nfts", label: "NFTs", icon: "💎" },
  ];

  return (
    <div className="search-filters">
      {filters.map((filter) => (
        <button
          key={filter.id}
          className={`search-filters__filter ${
            activeFilter === filter.id ? "active" : ""
          }`}
          onClick={() =>
            onFilterChange(filter.id as "all" | "users" | "posts" | "nfts")
          }
        >
          {filter.icon} {filter.label}
        </button>
      ))}
    </div>
  );
};

export default SearchFilters;