// ==================== src/hooks/useSearch.ts ====================
import { useEffect } from 'react';
import { useSearchStore } from '../stores/searchStore';

export function useSearch(query: string) {
  const { results, loading, error, setQuery, setResults, setLoading, setError, addRecentSearch } = useSearchStore();

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        // TODO: Call searchService.searchAll(query)
        setResults([]);
        addRecentSearch(query);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed');
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, setQuery, setResults, setLoading, setError, addRecentSearch]);

  return { results, loading, error };
}
