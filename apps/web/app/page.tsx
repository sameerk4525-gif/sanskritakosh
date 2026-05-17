"use client";

import { HeroBanner } from "@/components/home/HeroBanner";
import { QuickSearch } from "@/components/home/QuickSearch";
import { DailyWordCard } from "@/components/home/DailyWordCard";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedSubhashit } from "@/components/home/FeaturedSubhashit";

export default function Home() {
    return (
        <div className="w-full">
            <HeroBanner />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <QuickSearch />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
                    <DailyWordCard />
                    <FeaturedSubhashit />
                </div>

                <CategoryGrid />
            </div>
        </div>
    );
}
