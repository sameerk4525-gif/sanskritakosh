"use client";

export default function AboutPage() {
    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <h1 className="font-sanskrit text-4xl mb-8 text-primary text-center">परिचय</h1>

            <div className="card mb-6">
                <h2 className="font-sanskrit text-2xl text-primary mb-4">SanskritKosh (संस्कृतकोश)</h2>
                <p className="body-text mb-4">
                    A complete Sanskrit learning platform designed for absolute beginners and intermediate learners. Our mission is to make Sanskrit accessible, engaging, and deeply spiritual.
                </p>
                <p className="body-text">
                    We believe Sanskrit is not just a language—it's a doorway to centuries of wisdom, philosophy, and cultural heritage. Through interactive lessons, authentic texts, and mindful learning, we help you discover the beauty and depth of this ancient language.
                </p>
            </div>

            <div className="card">
                <h2 className="font-sanskrit text-2xl text-primary mb-4">मूल्यवान्</h2>
                <ul className="space-y-2 body-text">
                    <li>✓ Spiritual and respectful approach</li>
                    <li>✓ Mobile-first learning experience</li>
                    <li>✓ Authentic Sanskrit resources</li>
                    <li>✓ Community-driven content</li>
                </ul>
            </div>
        </div>
    );
}
