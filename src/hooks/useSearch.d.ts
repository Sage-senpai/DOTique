import type { SearchResult } from "../types/search";
export declare function useUserSearch(query: string): {
    results: SearchResult[];
    loading: boolean;
    error: string | null;
    search: (term: string) => Promise<void>;
};
//# sourceMappingURL=useSearch.d.ts.map