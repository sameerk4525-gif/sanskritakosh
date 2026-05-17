"use client";

import Link from "next/link";
import { Mail, Github } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-bg-dark text-white py-8 mt-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <div className="text-3xl mb-2">ॐ</div>
                        <h3 className="font-sanskrit text-lg mb-2">संस्कृतकोश</h3>
                        <p className="text-sm text-gray-300">
                            Made with devotion to preserve and share Sanskrit knowledge
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-ui font-semibold mb-3 text-accent">Learn</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/grammar" className="hover:text-accent transition">
                                    Grammar
                                </Link>
                            </li>
                            <li>
                                <Link href="/dictionary" className="hover:text-accent transition">
                                    Dictionary
                                </Link>
                            </li>
                            <li>
                                <Link href="/subhashit" className="hover:text-accent transition">
                                    Subhashit
                                </Link>
                            </li>
                            <li>
                                <Link href="/songs" className="hover:text-accent transition">
                                    Songs
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* More */}
                    <div>
                        <h4 className="font-ui font-semibold mb-3 text-accent">More</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/stories" className="hover:text-accent transition">
                                    Stories
                                </Link>
                            </li>
                            <li>
                                <Link href="/numbers" className="hover:text-accent transition">
                                    Numbers
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-accent transition">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-accent transition">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-ui font-semibold mb-3 text-accent">Connect</h4>
                        <div className="space-y-2">
                            <a
                                href="mailto:hello@sanskritakosh.com"
                                className="flex items-center gap-2 text-sm hover:text-accent transition"
                            >
                                <Mail size={16} /> Email
                            </a>
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm hover:text-accent transition"
                            >
                                <Github size={16} /> GitHub
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
                    <p>
                        © 2024 SanskritKosh. Built with{" "}
                        <span className="text-accent">♡</span> for Sanskrit learners
                    </p>
                </div>
            </div>
        </footer>
    );
}
