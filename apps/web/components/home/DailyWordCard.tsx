"use client";

import { Volume2 } from "lucide-react";

export function DailyWordCard() {
    const dailyWord = {
        word: "आत्मा",
        meaning: "Soul, Self, Spirit",
        transliteration: "Atma",
        example: "आत्मा शाश्वतम्",
    };

    return (
        <div className="card h-full flex flex-col justify-between">
            <div>
                <h3 className="ui-text text-accent text-sm font-semibold mb-2">
                    Word of the Day
                </h3>
                <p className="sanskrit-text font-bold mb-2">{dailyWord.word}</p>
                <p className="ui-text text-xs text-text-muted mb-3">
                    {dailyWord.transliteration}
                </p>
            </div>

            <div>
                <p className="body-text text-sm mb-3">{dailyWord.meaning}</p>
                <p className="text-xs text-text-muted italic mb-4">
                    "{dailyWord.example}"
                </p>
                <button className="flex items-center gap-2 text-primary hover:text-primary-dark transition">
                    <Volume2 size={18} />
                    <span className="ui-text text-sm">Pronounce</span>
                </button>
            </div>
        </div>
    );
}
