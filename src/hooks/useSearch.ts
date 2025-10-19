
// src/hooks/useUserSearch.ts (Unified Optimized Version)

import { useEffect, useCallback } from "react";
import { useSearchStore } from "../stores/searchStore";
import { socialService } from "../services/socialService";

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

  // Core async search function
  const search = useCallback(async (term: string) => {
    if (!term.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const users = await socialService.searchUsers(term);
      setResults(users);
      addRecentSearch(term);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [setResults, setLoading, setError, addRecentSearch]);

  // Debounce input changes (300ms)
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
