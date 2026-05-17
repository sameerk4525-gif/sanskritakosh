"use client";

import { useEffect, useState } from "react";

const SHLOKAS = [
    "अष्टावक्र उवाच",
    "आत्मा का श्रेष्ठ ज्ञान सबसे महत्वपूर्ण",
    "संस्कृतं भाषा देवानाम्",
];

export function HeroBanner() {
    const [currentShloka, setCurrentShloka] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentShloka((prev) => (prev + 1) % SHLOKAS.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full py-16 md:py-24 bg-gradient-to-b from-primary to-primary-dark overflow-hidden">
            {/* Decorative pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-repeat" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 15L45 45H15Z' fill='white' opacity='0.1'/%3E%3C/svg%3E")`,
                }} />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 text-center">
                <div className="text-5xl md:text-7xl mb-4">ॐ</div>

                <h1 className="font-sanskrit text-4xl md:text-5xl mb-2 text-white">
                    संस्कृतकोश
                </h1>

                <p className="font-ui text-xl md:text-2xl text-white mb-6">
                    SanskritKosh
                </p>

                <p className="text-lg md:text-xl text-accent-light mb-8 font-ui">
                    संस्कृतं पठाम — Let us learn Sanskrit
                </p>

                {/* Animated Shloka */}
                <div className="min-h-12 md:min-h-16">
                    <p
                        key={currentShloka}
                        className="shloka-text text-white animate-fade-in"
                    >
                        {SHLOKAS[currentShloka]}
                    </p>
                </div>
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
        </div>
    );
}
