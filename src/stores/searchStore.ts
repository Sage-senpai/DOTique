// src/stores/searchStore.ts
import { create } from "zustand";
import type { SearchResult } from "../types/search"; // ✅ unified import

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

export const useSearchStore = create<SearchState>((set) => ({
  query: "",
  results: [],
  loading: false,
  error: null,
  recentSearches: [],
  savedSearches: [],

  setQuery: (query) => set({ query }),
  setResults: (results) => set({ results }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  addRecentSearch: (query) =>
    set((state) => ({
      recentSearches: [query, ...state.recentSearches.filter((q) => q !== query)].slice(0, 10),
    })),

  clearRecentSearches: () => set({ recentSearches: [] }),

  toggleSavedSearch: (query) =>
    set((state) => ({
      savedSearches: state.savedSearches.includes(query)
        ? state.savedSearches.filter((q) => q !== query)
        : [...state.savedSearches, query],
    })),
}));
