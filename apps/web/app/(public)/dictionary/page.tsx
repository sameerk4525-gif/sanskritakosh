"use client";

import { useState, useEffect, useCallback } from "react";
import apiClient from "@/lib/api";
import { debounce } from "@/lib/debounce";
import { Search, Loader2, BookOpen, Volume2 } from "lucide-react";

interface DictionaryWord {
    id: string;
    word: string;
    devanagariWord: string;
    transliteration: string;
    pronunciation: string | null;
    englishMeaning: string;
    partOfSpeech: string | null;
    gender: string | null;
    etymology: string | null;
    examples: string | null;
    audioUrl: string | null;
    viewCount: number;
    isFeatured: boolean;
}

export default function DictionaryPage() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<DictionaryWord[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [totalResults, setTotalResults] = useState(0);

    // Debounced search function
    const searchWords = useCallback(
        debounce(async (searchQuery: string) => {
            if (!searchQuery.trim()) {
                setResults([]);
                setTotalResults(0);
                return;
            }

            try {
                setLoading(true);
                setError("");
                const response = await apiClient.get(`/dictionary/search?q=${encodeURIComponent(searchQuery)}`);
                setResults(response.data.data || []);
                setTotalResults(response.data.data?.length || 0);
            } catch (err: any) {
                console.error("Error searching words:", err);
                setError(err.response?.data?.message || "Search failed");
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 500),
        []
    );

    useEffect(() => {
        searchWords(query);
    }, [query, searchWords]);

    const handlePlay = (audioUrl: string | undefined) => {
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play();
        }
    };

    let examplesData: string[] = [];
    const currentExample = results[0]?.examples;
    if (currentExample) {
        try {
            examplesData = JSON.parse(currentExample);
        } catch (e) {
            console.error("Error parsing examples:", e);
        }
    }

    return (
        <div className="min-h-screen bg-bg py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="font-sanskrit text-5xl font-bold mb-2 text-primary">
                        कोश
                    </h1>
                    <p className="text-lg text-text-secondary mb-2">
                        Sanskrit Dictionary
                    </p>
                    <p className="text-sm text-text-tertiary">
                        Search words, meanings, and usage examples
                    </p>
                </div>

                {/* Search Box */}
                <div className="mb-8 sticky top-4 z-10">
                    <div className="bg-bg-card rounded-2xl p-1 shadow-lg border-2 border-primary/20 hover:border-primary/50 transition-colors">
                        <div className="flex items-center gap-3 bg-bg rounded-xl px-4 py-3">
                            {loading ? (
                                <Loader2 className="w-5 h-5 text-primary animate-spin" />
                            ) : (
                                <Search className="w-5 h-5 text-primary" />
                            )}
                            <input
                                type="text"
                                placeholder="Search Sanskrit words..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                autoFocus
                                className="flex-1 bg-transparent focus:outline-none text-text-primary placeholder-text-tertiary font-ui"
                            />
                            {query && (
                                <button
                                    onClick={() => setQuery("")}
                                    className="text-text-tertiary hover:text-text-primary transition-colors"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>
                    {query && (
                        <p className="text-xs text-text-secondary mt-2 text-center">
                            {loading ? "Searching..." : `Found ${totalResults} word${totalResults !== 1 ? "s" : ""}`}
                        </p>
                    )}
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-600 rounded-lg p-4 mb-8 text-center">
                        {error}
                    </div>
                )}

                {/* Results */}
                <div className="space-y-4">
                    {results.length > 0 ? (
                        results.map((word) => {
                            let examplesArray: string[] = [];
                            try {
                                examplesArray = JSON.parse(word.examples || "[]");
                            } catch (e) {
                                console.error("Error parsing examples:", e);
                            }

                            return (
                                <div
                                    key={word.id}
                                    className="bg-bg-card rounded-2xl p-6 shadow-card hover:shadow-hover transition-all border-l-4 border-primary/50 group"
                                >
                                    {/* Word Header */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-start gap-3">
                                            <div className="flex-1">
                                                {/* Devanagari Word */}
                                                <h3 className="font-sanskrit text-3xl font-bold text-primary mb-1">
                                                    {word.devanagariWord}
                                                </h3>

                                                {/* Transliteration */}
                                                <p className="text-sm text-text-secondary italic">
                                                    {word.transliteration}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Audio Button */}
                                        {word.audioUrl && (
                                            <button
                                                onClick={() => handlePlay(word.audioUrl || "")}
                                                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                                                title="Play pronunciation"
                                            >
                                                <Volume2 className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>

                                    {/* Meaning */}
                                    <div className="mb-4 pb-4 border-b border-primary/10">
                                        <p className="text-lg text-text-primary font-medium mb-2">
                                            {word.englishMeaning}
                                        </p>
                                    </div>

                                    {/* Metadata */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {word.partOfSpeech && (
                                            <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs rounded-full font-medium">
                                                {word.partOfSpeech}
                                            </span>
                                        )}
                                        {word.gender && (
                                            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                                                {word.gender}
                                            </span>
                                        )}
                                        {word.isFeatured && (
                                            <span className="inline-block px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs rounded-full font-medium">
                                                ⭐ Featured
                                            </span>
                                        )}
                                    </div>

                                    {/* Etymology */}
                                    {word.etymology && (
                                        <div className="mb-4 p-3 bg-bg rounded-lg">
                                            <p className="text-xs text-text-tertiary font-medium mb-1">Origin:</p>
                                            <p className="text-sm text-text-secondary">{word.etymology}</p>
                                        </div>
                                    )}

                                    {/* Examples */}
                                    {examplesArray.length > 0 && (
                                        <div className="mb-4">
                                            <p className="text-xs text-text-tertiary font-medium mb-2">Usage Examples:</p>
                                            <ul className="space-y-2">
                                                {examplesArray.slice(0, 2).map((example, idx) => (
                                                    <li key={idx} className="text-sm text-text-secondary">
                                                        • {example}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* View Count */}
                                    <div className="flex items-center text-xs text-text-tertiary">
                                        <BookOpen className="w-4 h-4 mr-1" />
                                        {word.viewCount} views
                                    </div>
                                </div>
                            );
                        })
                    ) : query ? (
                        <div className="text-center py-12">
                            {loading ? (
                                <div className="flex flex-col items-center gap-3">
                                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                                    <p className="text-text-secondary">Searching words...</p>
                                </div>
                            ) : (
                                <div>
                                    <BookOpen className="w-12 h-12 text-text-tertiary mx-auto mb-4 opacity-50" />
                                    <p className="text-text-secondary">No words found for "{query}"</p>
                                    <p className="text-xs text-text-tertiary mt-2">
                                        Try searching with a simpler query or Devanagari script
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <BookOpen className="w-12 h-12 text-text-tertiary mx-auto mb-4 opacity-50" />
                            <p className="text-text-secondary">
                                Start typing to search the Sanskrit dictionary
                            </p>
                            <p className="text-xs text-text-tertiary mt-2">
                                Search by English or Devanagari script
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
