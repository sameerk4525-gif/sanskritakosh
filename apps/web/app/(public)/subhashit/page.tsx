"use client";

import { useEffect, useState } from "react";
import apiClient from "@/lib/api";
import { Loader2, Star } from "lucide-react";

interface Subhashit {
    id: string;
    slug: string;
    devanagariText: string;
    englishTranslation: string;
    meaning: string;
    category: string;
    author: string | null;
    source: string | null;
    isFeatured: boolean;
    viewCount: number;
}

export default function SubhashitPage() {
    const [subhashits, setSubhashits] = useState<Subhashit[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [category, setCategory] = useState("ALL");

    useEffect(() => {
        fetchSubhashits();
    }, []);

    const fetchSubhashits = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get("/subhashit");
            setSubhashits(response.data.data || []);
            setError("");
        } catch (error: unknown) {
            console.error("Error fetching subhashits:", error);
            const err = error as { response?: { data?: { message?: string } } };
            setError(err.response?.data?.message || "Failed to load subhashits");
        } finally {
            setLoading(false);
        }
    };

    const categories = ["ALL", "WISDOM", "MOTIVATIONAL", "SPIRITUAL"];

    const filteredSubhashits = category === "ALL"
        ? subhashits
        : subhashits.filter(s => s.category === category);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="font-sanskrit text-5xl font-bold mb-4 text-primary">
                        सुभाषित
                    </h1>
                    <p className="text-lg text-text-secondary mb-2">
                        Classical Sanskrit Verses and Wisdom
                    </p>
                    <p className="text-sm text-text-tertiary">
                        {filteredSubhashits.length} verses available
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-600 rounded-lg p-4 mb-8 text-center">
                        {error}
                    </div>
                )}

                {/* Category Filter */}
                <div className="flex gap-2 mb-8 justify-center flex-wrap">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`px-4 py-2 rounded-full transition-all font-medium ${category === cat
                                ? "bg-primary text-white shadow-lg"
                                : "bg-bg-card text-text-primary border border-primary/20 hover:border-primary/50"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Subhashits Masonry Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSubhashits.length > 0 ? (
                        filteredSubhashits.map(subhashit => (
                            <div
                                key={subhashit.id}
                                className="bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/30 rounded-2xl p-6 shadow-card hover:shadow-hover transition-all group cursor-pointer"
                            >
                                {/* Featured Badge */}
                                {subhashit.isFeatured && (
                                    <div className="flex items-center gap-1 text-yellow-500 mb-3">
                                        <Star className="w-4 h-4 fill-current" />
                                        <span className="text-xs font-medium">Featured</span>
                                    </div>
                                )}

                                {/* Sanskrit Text */}
                                <p className="font-sanskrit text-lg text-primary mb-3 line-clamp-3 group-hover:text-primary/80 transition-colors">
                                    {subhashit.devanagariText}
                                </p>

                                {/* English Translation */}
                                <p className="text-sm text-text-secondary italic mb-3">
                                    "{subhashit.englishTranslation}"
                                </p>

                                {/* Meaning */}
                                <div className="bg-bg/50 rounded-lg p-3 mb-4">
                                    <p className="text-xs font-medium text-text-tertiary mb-1">Meaning:</p>
                                    <p className="text-sm text-text-secondary line-clamp-2">
                                        {subhashit.meaning}
                                    </p>
                                </div>

                                {/* Category & Source */}
                                <div className="flex flex-col gap-2 mb-4">
                                    {subhashit.category && (
                                        <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs rounded-full font-medium w-fit">
                                            {subhashit.category}
                                        </span>
                                    )}
                                    {subhashit.source && (
                                        <p className="text-xs text-text-tertiary">
                                            Source: {subhashit.source}
                                        </p>
                                    )}
                                </div>

                                {/* View Count */}
                                <div className="text-xs text-text-tertiary">
                                    👁 {subhashit.viewCount} views
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-text-secondary">
                                No verses found in this category
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
