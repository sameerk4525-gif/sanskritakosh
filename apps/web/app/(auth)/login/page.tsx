"use client";

import Link from "next/link";
import { useState } from "react";
import { LogIn } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Call login API
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md card">
                <div className="text-4xl text-center mb-2">ॐ</div>
                <h1 className="font-sanskrit text-2xl text-center text-primary mb-6">
                    प्रवेशम्
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block ui-text font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                        />
                    </div>

                    <div>
                        <label className="block ui-text font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-primary w-full flex items-center justify-center gap-2"
                    >
                        <LogIn size={18} /> Login
                    </button>
                </form>

                <p className="text-center text-text-secondary mt-6 ui-text">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-primary hover:underline font-semibold">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
