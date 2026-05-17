"use client";

import { useEffect, useState } from "react";
import apiClient from "@/lib/api";
import { Loader2, BookMarked } from "lucide-react";

interface GrammarTopic {
    id: string;
    slug: string;
    title: string;
    titleSanskriti: string;
    description: string;
    category: string;
    level: string;
    content: string;
    examples: string | null;
    viewCount: number;
    estimatedTime: number;
}

export default function GrammarPage() {
    const [topics, setTopics] = useState<GrammarTopic[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [category, setCategory] = useState("ALL");
    const [level, setLevel] = useState("ALL");

    useEffect(() => {
        fetchTopics();
    }, []);

    const fetchTopics = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get("/grammar/topics");
            setTopics(response.data.data || []);
            setError("");
        } catch (err: any) {
            console.error("Error fetching topics:", err);
            setError(err.response?.data?.message || "Failed to load grammar topics");
        } finally {
            setLoading(false);
        }
    };

    const categories = ["ALL", "PHONETICS", "NOUNS", "VERBS", "ADJECTIVES", "SANDHI"];
    const levels = ["ALL", "BEGINNER", "INTERMEDIATE", "ADVANCED"];

    const filteredTopics = topics.filter(topic => {
        const categoryMatch = category === "ALL" || topic.category === category;
        const levelMatch = level === "ALL" || topic.level === level;
        return categoryMatch && levelMatch;
    });

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
                        व्याकरण
                    </h1>
                    <p className="text-lg text-text-secondary mb-2">
                        Learn Sanskrit Grammar
                    </p>
                    <p className="text-sm text-text-tertiary">
                        {filteredTopics.length} topics available
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-600 rounded-lg p-4 mb-8 text-center">
                        {error}
                    </div>
                )}

                {/* Filters */}
                <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Category Filter */}
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                            Category
                        </label>
                        <div className="flex gap-2 flex-wrap">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    className={`px-3 py-1 rounded-full text-sm transition-all ${category === cat
                                            ? "bg-primary text-white"
                                            : "bg-bg-card text-text-primary border border-primary/20 hover:border-primary/50"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Level Filter */}
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                            Level
                        </label>
                        <div className="flex gap-2 flex-wrap">
                            {levels.map(lv => (
                                <button
                                    key={lv}
                                    onClick={() => setLevel(lv)}
                                    className={`px-3 py-1 rounded-full text-sm transition-all ${level === lv
                                            ? "bg-primary text-white"
                                            : "bg-bg-card text-text-primary border border-primary/20 hover:border-primary/50"
                                        }`}
                                >
                                    {lv}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Topics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTopics.length > 0 ? (
                        filteredTopics.map(topic => {
                            let contentData = [];
                            try {
                                contentData = JSON.parse(topic.content);
                            } catch (e) {
                                console.error("Error parsing content:", e);
                            }

                            return (
                                <div
                                    key={topic.id}
                                    className="bg-bg-card rounded-2xl p-6 shadow-card hover:shadow-hover transition-all border-t-4 border-primary/50 group cursor-pointer"
                                >
                                    {/* Icon */}
                                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 group-hover:bg-primary/20 transition-colors">
                                        <BookMarked className="w-6 h-6 text-primary" />
                                    </div>

                                    {/* Devanagari Title */}
                                    <h3 className="font-sanskrit text-2xl font-bold mb-1 text-primary group-hover:text-primary/80 transition-colors">
                                        {topic.titleSanskriti}
                                    </h3>

                                    {/* English Title */}
                                    <h4 className="font-ui font-bold text-lg mb-3 text-text-primary">
                                        {topic.title}
                                    </h4>

                                    {/* Description */}
                                    <p className="text-sm text-text-secondary line-clamp-2 mb-4">
                                        {topic.description}
                                    </p>

                                    {/* Meta */}
                                    <div className="flex gap-2 mb-4 flex-wrap">
                                        <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs rounded-full font-medium">
                                            {topic.category}
                                        </span>
                                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                                            {topic.level}
                                        </span>
                                    </div>

                                    {/* Additional Info */}
                                    <div className="flex items-center justify-between text-xs text-text-tertiary mb-4">
                                        <span>⏱ {topic.estimatedTime} min</span>
                                        <span>👁 {topic.viewCount}</span>
                                    </div>

                                    {/* Learn Button */}
                                    <button className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-lg transition-colors">
                                        Learn Now
                                    </button>
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <BookMarked className="w-12 h-12 text-text-tertiary mx-auto mb-4 opacity-50" />
                            <p className="text-text-secondary">
                                No topics found with the selected filters
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
