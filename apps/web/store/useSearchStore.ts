import { create } from "zustand";

interface SearchResult {
    id: string;
    type: "GRAMMAR" | "DICTIONARY" | "SUBHASHIT" | "SONG" | "STORY";
    title: string;
    titleSkt?: string;
    slug: string;
}

interface SearchStore {
    results: SearchResult[];
    query: string;
    isSearching: boolean;
    recentSearches: string[];

    setQuery: (query: string) => void;
    setResults: (results: SearchResult[]) => void;
    setSearching: (searching: boolean) => void;
    addRecentSearch: (query: string) => void;
    clearRecentSearches: () => void;
}

export const useSearchStore = create<SearchStore>((set, get) => ({
    results: [],
    query: "",
    isSearching: false,
    recentSearches: [],

    setQuery: (query) => set({ query }),

    setResults: (results) => set({ results }),

    setSearching: (searching) => set({ isSearching: searching }),

    addRecentSearch: (query) => {
        const searches = get().recentSearches;
        const filtered = searches.filter((s) => s !== query).slice(0, 9);
        set({ recentSearches: [query, ...filtered] });
    },

    clearRecentSearches: () => set({ recentSearches: [] }),
}));
