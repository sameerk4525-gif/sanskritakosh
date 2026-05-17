import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
    title: "SanskritKosh - संस्कृतकोश",
    description:
        "Learn Sanskrit through grammar, vocabulary, songs, subhashits, and stories. A complete Sanskrit learning platform for beginners and intermediate learners.",
    keywords: [
        "Sanskrit",
        "Learning",
        "Grammar",
        "Dictionary",
        "Subhashit",
        "स्कृत",
    ],
    authors: [{ name: "SanskritKosh" }],
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://sanskritakosh.com",
        title: "SanskritKosh - Learn Sanskrit Online",
        description: "Master Sanskrit grammar, vocabulary, and classical texts",
        images: [
            {
                url: "https://sanskritakosh.com/og-image.png",
                width: 1200,
                height: 630,
                alt: "SanskritKosh",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "SanskritKosh",
        description: "Learn Sanskrit online",
        images: ["https://sanskritakosh.com/og-image.png"],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Sanskrit&family=Crimson+Pro:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="bg-bg text-text-primary min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
