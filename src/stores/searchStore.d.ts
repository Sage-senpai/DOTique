import type { SearchResult } from "../types/search";
interface SearchState {
    query: string;
    results: SearchResult[];
    loading: boolean;
    error: string | null;
    recentSearches: string[];
    savedSearches: string[];
    setQuery: (query: string) => void;
    setResults: (results: SearchResult[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    addRecentSearch: (query: string) => void;
    clearRecentSearches: () => void;
    toggleSavedSearch: (query: string) => void;
}
export declare const useSearchStore: import("zustand").UseBoundStore<import("zustand").StoreApi<SearchState>>;
export {};
//# sourceMappingURL=searchStore.d.ts.map