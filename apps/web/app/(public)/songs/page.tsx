"use client";

import { useEffect, useState } from "react";
import apiClient from "@/lib/api";
import { Loader2, Play, Music } from "lucide-react";

interface Song {
    id: string;
    slug: string;
    title: string;
    artist: string | null;
    lyrics: string;
    description: string | null;
    category: string | null;
    difficulty: string;
    viewCount: number;
    audioUrl?: string;
    videoUrl?: string;
}

export default function SongsPage() {
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [category, setCategory] = useState("ALL");

    useEffect(() => {
        fetchSongs();
    }, []);

    const fetchSongs = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get("/songs");
            setSongs(response.data.data || []);
            setError("");
        } catch (error: unknown) {
            console.error("Error fetching songs:", error);
            const err = error as { response?: { data?: { message?: string } } };
            setError(err.response?.data?.message || "Failed to load songs");
        } finally {
            setLoading(false);
        }
    };

    const filteredSongs = category === "ALL"
        ? songs
        : songs.filter(song => song.category === category);

    const categories = ["ALL", "DEVOTIONAL", "CLASSICAL", "MODERN"];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="font-sanskrit text-5xl font-bold mb-4 text-primary">
                        गीत
                    </h1>
                    <p className="text-lg text-text-secondary mb-2">
                        Sanskrit Songs and Devotional Mantras
                    </p>
                    <p className="text-sm text-text-tertiary">
                        {filteredSongs.length} songs available
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex gap-2 mb-8 justify-center flex-wrap">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`px-4 py-2 rounded-full transition-all ${category === cat
                                ? "bg-primary text-white shadow-lg"
                                : "bg-bg-card text-text-primary border border-primary/20 hover:border-primary/50"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-600 rounded-lg p-4 mb-8 text-center">
                        {error}
                    </div>
                )}

                {/* Songs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSongs.length > 0 ? (
                        filteredSongs.map(song => {
                            let lyricsData = { verse: "", translation: "" };
                            try {
                                lyricsData = JSON.parse(song.lyrics);
                            } catch (e) {
                                console.error("Error parsing lyrics:", e);
                            }

                            return (
                                <div
                                    key={song.id}
                                    className="bg-bg-card rounded-2xl p-6 shadow-card hover:shadow-hover transition-all border-t-4 border-primary/50 group cursor-pointer"
                                >
                                    {/* Icon */}
                                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 group-hover:bg-primary/20 transition-colors">
                                        <Music className="w-6 h-6 text-primary" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="font-ui font-bold text-xl mb-2 text-text-primary group-hover:text-primary transition-colors">
                                        {song.title}
                                    </h3>

                                    {/* Artist */}
                                    {song.artist && (
                                        <p className="text-sm text-text-secondary mb-3">
                                            By {song.artist}
                                        </p>
                                    )}

                                    {/* Lyrics Preview */}
                                    <div className="bg-bg/50 rounded-lg p-3 mb-4">
                                        {lyricsData.verse && (
                                            <p className="font-sanskrit text-sm text-primary mb-2">
                                                {lyricsData.verse}
                                            </p>
                                        )}
                                        {lyricsData.translation && (
                                            <p className="text-xs text-text-secondary italic">
                                                "{lyricsData.translation}"
                                            </p>
                                        )}
                                    </div>

                                    {/* Description */}
                                    {song.description && (
                                        <p className="text-sm text-text-secondary line-clamp-2 mb-4">
                                            {song.description}
                                        </p>
                                    )}

                                    {/* Meta */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-2">
                                            {song.category && (
                                                <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs rounded-full font-medium">
                                                    {song.category}
                                                </span>
                                            )}
                                            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                                                {song.difficulty}
                                            </span>
                                        </div>
                                        <div className="text-xs text-text-tertiary">
                                            👁 {song.viewCount}
                                        </div>
                                    </div>

                                    {/* Play Button */}
                                    {song.audioUrl && (
                                        <button className="w-full mt-4 bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
                                            <Play className="w-4 h-4" />
                                            Play
                                        </button>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <Music className="w-12 h-12 text-text-tertiary mx-auto mb-4 opacity-50" />
                            <p className="text-text-secondary">
                                No songs found in this category
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
