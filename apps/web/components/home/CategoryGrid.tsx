"use client";

import Link from "next/link";
import { BookOpen, Search, Music, BookMarked, Scroll, Hash } from "lucide-react";

const CATEGORIES = [
    {
        titleSkt: "व्याकरण",
        titleEn: "Grammar",
        href: "/grammar",
        icon: BookOpen,
        color: "from-primary to-primary-light",
    },
    {
        titleSkt: "कोश",
        titleEn: "Dictionary",
        href: "/dictionary",
        icon: Search,
        color: "from-accent to-accent-light",
    },
    {
        titleSkt: "गीत",
        titleEn: "Songs",
        href: "/songs",
        icon: Music,
        color: "from-primary-dark to-primary",
    },
    {
        titleSkt: "सुभाषित",
        titleEn: "Subhashits",
        href: "/subhashit",
        icon: BookMarked,
        color: "from-accent to-primary",
    },
    {
        titleSkt: "कथा",
        titleEn: "Stories",
        href: "/stories",
        icon: Scroll,
        color: "from-primary-light to-accent-light",
    },
    {
        titleSkt: "संख्या",
        titleEn: "Numbers",
        href: "/numbers",
        icon: Hash,
        color: "from-primary to-accent",
    },
];

export function CategoryGrid() {
    return (
        <section className="py-12">
            <h2 className="font-sanskrit text-3xl text-center mb-8 text-primary">
                विषय
            </h2>
            <p className="text-center text-text-secondary mb-12 ui-text">
                Choose a category to start your Sanskrit learning journey
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {CATEGORIES.map((category) => {
                    const Icon = category.icon;
                    return (
                        <Link key={category.href} href={category.href}>
                            <div
                                className={`card h-full cursor-pointer transform transition hover:scale-105 bg-gradient-to-br ${category.color}`}
                            >
                                <Icon size={32} className="text-white mb-3" />
                                <h3 className="font-sanskrit text-2xl text-white mb-1">
                                    {category.titleSkt}
                                </h3>
                                <p className="ui-text text-white opacity-90">
                                    {category.titleEn}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
