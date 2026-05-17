"use client";

import Link from "next/link";
import { Home, BookOpen, Search, Sun, User } from "lucide-react";

interface MobileMenuProps {
    onClose: () => void;
}

export function MobileMenu({ onClose }: MobileMenuProps) {
    return (
        <div className="md:hidden bg-bg-card border-t border-border">
            <nav className="flex justify-around py-2 mb-4">
                <Link
                    href="/"
                    onClick={onClose}
                    title="Home"
                    className="flex flex-col items-center p-3 text-primary hover:bg-accent-light rounded-lg"
                >
                    <Home size={24} />
                    <span className="text-xs ui-text mt-1">Home</span>
                </Link>
                <Link
                    href="/grammar"
                    onClick={onClose}
                    title="Grammar"
                    className="flex flex-col items-center p-3 text-primary hover:bg-accent-light rounded-lg"
                >
                    <BookOpen size={24} />
                    <span className="text-xs ui-text mt-1">Grammar</span>
                </Link>
                <Link
                    href="/dictionary"
                    onClick={onClose}
                    title="Dictionary"
                    className="flex flex-col items-center p-3 text-primary hover:bg-accent-light rounded-lg"
                >
                    <Search size={24} />
                    <span className="text-xs ui-text mt-1">Dict</span>
                </Link>
                <Link
                    href="/daily"
                    onClick={onClose}
                    title="Daily"
                    className="flex flex-col items-center p-3 text-primary hover:bg-accent-light rounded-lg"
                >
                    <Sun size={24} />
                    <span className="text-xs ui-text mt-1">Daily</span>
                </Link>
                <Link
                    href="/account"
                    onClick={onClose}
                    title="Account"
                    className="flex flex-col items-center p-3 text-primary hover:bg-accent-light rounded-lg"
                >
                    <User size={24} />
                    <span className="text-xs ui-text mt-1">Account</span>
                </Link>
            </nav>
            <div className="border-t border-border px-4 py-3 flex gap-2">
                <Link href="/login" onClick={onClose} className="flex-1 btn-primary text-sm text-center">
                    Login
                </Link>
            </div>
        </div>
    );
}
