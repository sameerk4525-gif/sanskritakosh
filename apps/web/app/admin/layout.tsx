"use client";

import Link from "next/link";
import { LayoutDashboard, BookOpen, Music, Bookmark, Scroll, BookMarked, Users, Mail, LogOut } from "lucide-react";
import React from "react";

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const menuItems = [
        { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { label: "Grammar", href: "/admin/grammar", icon: BookOpen },
        { label: "Songs", href: "/admin/songs", icon: Music },
        { label: "Subhashit", href: "/admin/subhashit", icon: BookMarked },
        { label: "Stories", href: "/admin/stories", icon: Scroll },
        { label: "Users", href: "/admin/users", icon: Users },
        { label: "Messages", href: "/admin/messages", icon: Mail },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="hidden md:flex md:w-64 bg-bg-dark text-white flex-col">
                <div className="p-6 border-b border-gray-700">
                    <h2 className="font-sanskrit text-xl">संस्कृतकोश Admin</h2>
                </div>

                <nav className="flex-1 p-6 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary transition"
                            >
                                <Icon size={20} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 border-t border-gray-700">
                    <button className="flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-primary transition text-red-400">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                    <h1 className="font-ui font-bold text-lg">Admin Panel</h1>
                    <p className="text-sm text-gray-600">Admin User</p>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}
