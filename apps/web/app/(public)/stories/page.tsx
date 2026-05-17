"use client";

import { useEffect, useState } from "react";
import apiClient from "@/lib/api";
import { Loader2, BookOpen, Clock } from "lucide-react";

interface Story {
    id: string;
    slug: string;
    title: string;
    devanagariTitle: string | null;
    content: string;
    englishTranslation: string;
    category: string | null;
    difficulty: string;
    estimatedTime: number | null;
    viewCount: number;
}

export default function StoriesPage() {
    const [stories, setStories] = useState<Story[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [difficulty, setDifficulty] = useState("ALL");

    useEffect(() => {
        fetchStories();
    }, []);

    const fetchStories = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get("/stories");
            setStories(response.data.data || []);
            setError("");
        } catch (error: unknown) {
            console.error("Error fetching stories:", error);
            const err = error as { response?: { data?: { message?: string } } };
            setError(err.response?.data?.message || "Failed to load stories");
        } finally {
            setLoading(false);
        }
    };

    const filteredStories = difficulty === "ALL"
        ? stories
        : stories.filter(story => story.difficulty === difficulty);

    const difficulties = ["ALL", "BEGINNER", "INTERMEDIATE", "ADVANCED"];

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
                        कथा
                    </h1>
                    <p className="text-lg text-text-secondary mb-2">
                        Sanskrit Stories and Mythology
                    </p>
                    <p className="text-sm text-text-tertiary">
                        {filteredStories.length} stories available
                    </p>
                </div>

                {/* Difficulty Filter */}
                <div className="flex gap-2 mb-8 justify-center flex-wrap">
                    {difficulties.map(level => (
                        <button
                            key={level}
                            onClick={() => setDifficulty(level)}
                            className={`px-4 py-2 rounded-full transition-all ${difficulty === level
                                ? "bg-primary text-white shadow-lg"
                                : "bg-bg-card text-text-primary border border-primary/20 hover:border-primary/50"
                                }`}
                        >
                            {level}
                        </button>
                    ))}
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-600 rounded-lg p-4 mb-8 text-center">
                        {error}
                    </div>
                )}

                {/* Stories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredStories.length > 0 ? (
                        filteredStories.map(story => {
                            let contentData = { paragraphs: [] };
                            try {
                                contentData = JSON.parse(story.content);
                            } catch (e) {
                                console.error("Error parsing content:", e);
                            }

                            return (
                                <div
                                    key={story.id}
                                    className="bg-bg-card rounded-2xl p-6 shadow-card hover:shadow-hover transition-all border-t-4 border-primary/50 group cursor-pointer"
                                >
                                    {/* Icon */}
                                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 group-hover:bg-primary/20 transition-colors">
                                        <BookOpen className="w-6 h-6 text-primary" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="font-ui font-bold text-2xl mb-1 text-text-primary group-hover:text-primary transition-colors">
                                        {story.title}
                                    </h3>

                                    {/* Devanagari Title */}
                                    {story.devanagariTitle && (
                                        <p className="font-sanskrit text-lg text-primary/70 mb-3">
                                            {story.devanagariTitle}
                                        </p>
                                    )}

                                    {/* Category */}
                                    {story.category && (
                                        <div className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs rounded-full font-medium mb-3">
                                            {story.category}
                                        </div>
                                    )}

                                    {/* Content Preview */}
                                    <div className="bg-bg/50 rounded-lg p-4 mb-4 max-h-32 overflow-hidden">
                                        {Array.isArray(contentData.paragraphs) && contentData.paragraphs.length > 0 ? (
                                            <p className="text-sm text-text-secondary line-clamp-4">
                                                {contentData.paragraphs[0]}
                                            </p>
                                        ) : (
                                            <p className="text-sm text-text-tertiary italic">No content preview available</p>
                                        )}
                                    </div>

                                    {/* Meta Info */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex gap-2">
                                            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                                                {story.difficulty}
                                            </span>
                                        </div>
                                        <div className="text-xs text-text-tertiary">
                                            👁 {story.viewCount}
                                        </div>
                                    </div>

                                    {/* Time Estimate */}
                                    {story.estimatedTime && (
                                        <div className="flex items-center gap-1 text-xs text-text-secondary mb-4">
                                            <Clock className="w-4 h-4" />
                                            {story.estimatedTime} min read
                                        </div>
                                    )}

                                    {/* Read Button */}
                                    <button className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-lg transition-colors">
                                        Read Story
                                    </button>
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <BookOpen className="w-12 h-12 text-text-tertiary mx-auto mb-4 opacity-50" />
                            <p className="text-text-secondary">
                                No stories found at this difficulty level
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
