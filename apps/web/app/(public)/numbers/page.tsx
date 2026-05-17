"use client";

export default function NumbersPage() {
    const numbers = Array.from({ length: 20 }, (_, i) => ({
        numeral: i + 1,
        word: ["एक", "द्वे", "त्रि", "चतुर्", "पञ्च", "षष्", "सप्त", "अष्ट", "नव", "दश"][
            i % 10
        ],
    }));

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h1 className="font-sanskrit text-4xl mb-8 text-primary text-center">संख्या</h1>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {numbers.map((num) => (
                    <div key={num.numeral} className="card text-center">
                        <p className="text-2xl font-bold text-primary mb-2">{num.numeral}</p>
                        <p className="sanskrit-text text-lg">{num.word}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
