"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-bg-card shadow-card border-b-2 border-accent">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="om-symbol">ॐ</span>
                    <div className="hidden sm:block">
                        <h1 className="font-sanskrit text-xl md:text-2xl font-bold text-primary">
                            संस्कृतकोश
                        </h1>
                        <p className="text-xs text-accent font-ui">SanskritKosh</p>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <Link
                        href="/grammar"
                        className="ui-text text-text-primary hover:text-primary transition"
                    >
                        Grammar
                    </Link>
                    <Link
                        href="/dictionary"
                        className="ui-text text-text-primary hover:text-primary transition"
                    >
                        Dictionary
                    </Link>
                    <Link
                        href="/subhashit"
                        className="ui-text text-text-primary hover:text-primary transition"
                    >
                        Subhashit
                    </Link>
                    <Link
                        href="/songs"
                        className="ui-text text-text-primary hover:text-primary transition"
                    >
                        Songs
                    </Link>
                    <Link
                        href="/stories"
                        className="ui-text text-text-primary hover:text-primary transition"
                    >
                        Stories
                    </Link>
                    <Link
                        href="/daily"
                        className="ui-text text-text-primary hover:text-primary transition"
                    >
                        Daily
                    </Link>
                </div>

                {/* Desktop Auth */}
                <div className="hidden md:flex items-center gap-4">
                    <Link
                        href="/login"
                        className="ui-text text-primary hover:text-primary-dark transition"
                    >
                        Login
                    </Link>
                    <Link
                        href="/account"
                        className="btn-primary text-sm px-4 py-2"
                    >
                        Account
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden p-2 text-primary"
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <MobileMenu onClose={() => setMobileMenuOpen(false)} />
            )}
        </nav>
    );
}
