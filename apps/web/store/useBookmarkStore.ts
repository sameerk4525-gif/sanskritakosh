import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BookmarkedItem {
    contentType: "SUBHASHIT" | "SONG" | "STORY" | "GRAMMAR";
    contentId: string;
    timestamp: number;
}

interface BookmarkStore {
    bookmarks: Map<string, BookmarkedItem>;
    addBookmark: (item: BookmarkedItem) => void;
    removeBookmark: (contentType: string, contentId: string) => void;
    isBookmarked: (contentType: string, contentId: string) => boolean;
    getBookmarks: () => BookmarkedItem[];
}

export const useBookmarkStore = create<BookmarkStore>()(
    persist(
        (set, get) => ({
            bookmarks: new Map(),

            addBookmark: (item) =>
                set((state) => {
                    const key = `${item.contentType}:${item.contentId}`;
                    const bookmarks = new Map(state.bookmarks);
                    bookmarks.set(key, item);
                    return { bookmarks };
                }),

            removeBookmark: (contentType, contentId) =>
                set((state) => {
                    const key = `${contentType}:${contentId}`;
                    const bookmarks = new Map(state.bookmarks);
                    bookmarks.delete(key);
                    return { bookmarks };
                }),

            isBookmarked: (contentType, contentId) => {
                const key = `${contentType}:${contentId}`;
                return get().bookmarks.has(key);
            },

            getBookmarks: () => Array.from(get().bookmarks.values()),
        }),
        {
            name: "bookmarks-storage",
            storage: {
                getItem: (name) => {
                    const item = localStorage.getItem(name);
                    if (!item) return null;
                    const parsed = JSON.parse(item);
                    return {
                        ...parsed,
                        state: {
                            ...parsed.state,
                            bookmarks: new Map(parsed.state.bookmarks),
                        },
                    };
                },
                setItem: (name, value) => {
                    const toStore = {
                        ...value,
                        state: {
                            ...value.state,
                            bookmarks: Array.from(value.state.bookmarks.entries()),
                        },
                    };
                    localStorage.setItem(name, JSON.stringify(toStore));
                },
                removeItem: (name) => localStorage.removeItem(name),
            },
        }
    )
);
