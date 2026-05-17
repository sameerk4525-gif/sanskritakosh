"use client";

import { Heart } from "lucide-react";

export function FeaturedSubhashit() {
    const subhashit = {
        shloka:
            "उद्योगिनं पुरुषसिंहमुपैति लक्ष्मीः",
        meaning: "Lakshmi follows those who work diligently. Fortune is an ally to hard work.",
        source: "Chanakya Niti",
    };

    return (
        <div className="card md:col-span-2 h-full flex flex-col justify-between bg-gradient-to-br from-accent-light to-bg-card">
            <div>
                <h3 className="ui-text text-primary text-sm font-semibold mb-4">
                    Featured Subhashit
                </h3>
                <p className="shloka-text text-primary mb-6">{subhashit.shloka}</p>
            </div>

            <div>
                <p className="body-text text-primary mb-3 italic">{subhashit.meaning}</p>
                <div className="flex justify-between items-center">
                    <p className="ui-text text-xs text-text-secondary">— {subhashit.source}</p>
                    <button className="p-2 hover:bg-white rounded-full transition">
                        <Heart size={20} className="text-primary" />
                    </button>
                </div>
            </div>
        </div>
    );
}
