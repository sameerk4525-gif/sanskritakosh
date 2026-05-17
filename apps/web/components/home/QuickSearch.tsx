"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export function QuickSearch() {
    const [query, setQuery] = useState("");

    const categories = [
        { label: "Words", value: "words" },
        { label: "Shlokas", value: "shlokas" },
        { label: "Grammar", value: "grammar" },
        { label: "Stories", value: "stories" },
    ];

    return (
        <div className="w-full">
            <h2 className="font-sanskrit text-3xl mb-6 text-center text-primary">
                खोज करें
            </h2>

            <div className="bg-white card md:px-6 md:py-6 mb-4">
                <div className="relative flex items-center gap-2 bg-bg rounded-lg px-4 py-3">
                    <Search size={20} className="text-primary" />
                    <input
                        type="text"
                        placeholder="Search words, shlokas, grammar..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 bg-transparent focus:outline-none ui-text"
                    />
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                    {categories.map((cat) => (
                        <button
                            key={cat.value}
                            className="px-4 py-2 rounded-full bg-accent-light text-primary ui-text text-sm hover:bg-accent transition"
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
