"use client";

import { User, LogOut, Bookmark } from "lucide-react";

export default function AccountPage() {
    // TODO: Get user from auth store
    const user = {
        name: "Student Name",
        email: "student@example.com",
        streak: 5,
        bookmarks: 12,
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="font-sanskrit text-4xl mb-8 text-primary text-center">खाता</h1>

            {/* Profile Card */}
            <div className="card mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-accent-light flex items-center justify-center">
                        <User size={32} className="text-primary" />
                    </div>
                    <div>
                        <h2 className="ui-text font-bold text-lg">{user.name}</h2>
                        <p className="text-text-secondary text-sm">{user.email}</p>
                    </div>
                </div>
                <button className="text-primary hover:text-primary-dark">
                    <LogOut size={24} />
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="card text-center">
                    <p className="text-3xl font-bold text-accent mb-2">🔥</p>
                    <p className="ui-text font-semibold">{user.streak} Day Streak</p>
                </div>
                <div className="card text-center">
                    <p className="text-3xl font-bold text-primary mb-2">
                        <Bookmark size={32} className="mx-auto" />
                    </p>
                    <p className="ui-text font-semibold">{user.bookmarks} Bookmarks</p>
                </div>
                <div className="card text-center">
                    <p className="text-3xl font-bold text-primary-light mb-2">📚</p>
                    <p className="ui-text font-semibold">5 Topics Completed</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="card">
                <div className="flex border-b border-border mb-6">
                    <button className="px-4 py-2 ui-text font-semibold text-primary border-b-2 border-primary">
                        Bookmarks
                    </button>
                    <button className="px-4 py-2 ui-text text-text-secondary hover:text-primary">
                        Progress
                    </button>
                </div>
                <p className="text-text-muted">No bookmarks yet. Start saving content!</p>
            </div>
        </div>
    );
}
