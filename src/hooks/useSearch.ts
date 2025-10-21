// src/hooks/useUserSearch.ts
// =========================================
import { useEffect, useCallback } from "react";
import { useSearchStore } from "../stores/searchStore";
import { socialService } from "../services/socialService";
import type { SearchResult } from "../types/search"; // 👈 Make sure this path is correct

export function useUserSearch(query: string) {
  const {
    results,
    loading,
    error,
    setResults,
    setLoading,
    setError,
    addRecentSearch,
  } = useSearchStore();

  const search = useCallback(async (term: string) => {
    if (!term.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const users = await socialService.searchUsers(term);

      // ✅ Transform API users → SearchResult[]
      const mappedResults: SearchResult[] = users.map((user: any) => ({
        id: user.id,
        type: "user",
        title: user.display_name || user.username,
        subtitle: user.bio || "",
        avatar: user.dotvatar_url || "",
      }));

      setResults(mappedResults);
      addRecentSearch(term);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [setResults, setLoading, setError, addRecentSearch]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => search(query), 300);
    return () => clearTimeout(timer);
  }, [query, search, setResults]);

  return { results, loading, error, search };
}
