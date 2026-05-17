"use client";

import { useEffect, useState } from "react";
import apiClient from "@/lib/api";
import { Loader2, Calendar, Flame, BookOpen } from "lucide-react";

interface DailyContent {
    id: string;
    contentType: string;
    contentId: string;
    contentTitle: string;
    contentText: string;
    scheduledDate: string;
    viewCount: number;
    isActive: boolean;
}

export default function DailyPage() {
    const [dailyContent, setDailyContent] = useState<DailyContent | null>(null);
    const [history, setHistory] = useState<DailyContent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedType, setSelectedType] = useState("ALL");

    useEffect(() => {
        fetchTodayContent();
        fetchHistory();
    }, []);

    const fetchTodayContent = async () => {
        try {
            const response = await apiClient.get("/daily");
            if (response.data.data) {
                setDailyContent(response.data.data);
            }
            setError("");
        } catch (err: any) {
            console.error("Error fetching today's content:", err);
            setError(err.response?.data?.message || "Failed to load today's content");
        }
    };

    const fetchHistory = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get("/daily/history/30");
            setHistory(response.data.data || []);
            setError("");
        } catch (err: any) {
            console.error("Error fetching history:", err);
        } finally {
            setLoading(false);
        }
    };

    const contentTypes = ["ALL", "WORD", "SUBHASHIT", "GRAMMAR", "STORY"];

    const filteredHistory = selectedType === "ALL"
        ? history
        : history.filter(item => item.contentType === selectedType);

    const getIconForType = (type: string) => {
        switch (type) {
            case "WORD":
                return "📚";
            case "SUBHASHIT":
                return "✨";
            case "GRAMMAR":
                return "🔤";
            case "STORY":
                return "📖";
            default:
                return "📝";
        }
    };

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
                <div className="mb-8 text-center">
                    <h1 className="font-sanskrit text-5xl font-bold mb-2 text-primary">
                        दैनिकम्
                    </h1>
                    <p className="text-lg text-text-secondary">
                        Daily Sanskrit Learning
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-600 rounded-lg p-4 mb-8 text-center">
                        {error}
                    </div>
                )}

                {/* Today's Content */}
                <div className="mb-12">
                    <h2 className="font-ui font-bold text-2xl mb-4 text-text-primary flex items-center gap-2">
                        <Calendar className="w-6 h-6 text-primary" />
                        Today's Learning
                    </h2>

                    {dailyContent ? (
                        <div className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 rounded-2xl p-8 shadow-lg">
                            {/* Type Badge */}
                            <div className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full font-medium text-sm mb-4">
                                {getIconForType(dailyContent.contentType)} {dailyContent.contentType}
                            </div>

                            {/* Title */}
                            <h3 className="font-ui font-bold text-3xl text-text-primary mb-4">
                                {dailyContent.contentTitle}
                            </h3>

                            {/* Content */}
                            <div className="bg-white/50 dark:bg-bg-card/50 rounded-lg p-6 mb-6">
                                <p className="text-lg text-text-secondary leading-relaxed">
                                    {dailyContent.contentText}
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-text-secondary">
                                    <BookOpen className="w-5 h-5" />
                                    <span>👁 {dailyContent.viewCount} views</span>
                                </div>
                            </div>

                            {/* CTA */}
                            <button className="mt-6 bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                                Learn More
                            </button>
                        </div>
                    ) : (
                        <div className="bg-bg-card rounded-2xl p-8 text-center">
                            <p className="text-text-secondary">
                                Come back tomorrow for today's learning content!
                            </p>
                        </div>
                    )}
                </div>

                {/* Learning History */}
                <div>
                    <h2 className="font-ui font-bold text-2xl mb-4 text-text-primary flex items-center gap-2">
                        <Flame className="w-6 h-6 text-accent" />
                        Learning History (30 days)
                    </h2>

                    {/* Type Filter */}
                    <div className="flex gap-2 mb-6 flex-wrap">
                        {contentTypes.map(type => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`px-4 py-2 rounded-full transition-all text-sm font-medium ${selectedType === type
                                        ? "bg-primary text-white shadow-lg"
                                        : "bg-bg-card text-text-primary border border-primary/20 hover:border-primary/50"
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    {/* History Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredHistory.length > 0 ? (
                            filteredHistory.map(item => (
                                <div
                                    key={item.id}
                                    className="bg-bg-card rounded-xl p-4 shadow-card hover:shadow-hover transition-all border-l-4 border-primary/50 group cursor-pointer"
                                >
                                    {/* Date & Type */}
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-2xl">{getIconForType(item.contentType)}</span>
                                        <span className="text-xs text-text-tertiary">
                                            {new Date(item.scheduledDate).toLocaleDateString()}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h4 className="font-ui font-bold text-sm text-text-primary group-hover:text-primary transition-colors mb-2 line-clamp-2">
                                        {item.contentTitle}
                                    </h4>

                                    {/* Content Preview */}
                                    <p className="text-xs text-text-secondary line-clamp-2 mb-2">
                                        {item.contentText}
                                    </p>

                                    {/* Stats */}
                                    <div className="flex items-center justify-between pt-2 border-t border-primary/10">
                                        <span className="text-xs text-text-tertiary">
                                            👁 {item.viewCount}
                                        </span>
                                        {item.isActive && (
                                            <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-8">
                                <p className="text-text-secondary">
                                    No content found for this filter.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
