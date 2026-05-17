"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Send to API
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <h1 className="font-sanskrit text-4xl mb-8 text-primary text-center">संपर्क</h1>

            {submitted && (
                <div className="card bg-green-50 text-green-700 mb-6">
                    Thank you! We'll be in touch soon.
                </div>
            )}

            <form onSubmit={handleSubmit} className="card">
                <div className="mb-6">
                    <label className="block ui-text font-semibold mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                    />
                </div>

                <div className="mb-6">
                    <label className="block ui-text font-semibold mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                    />
                </div>

                <div className="mb-6">
                    <label className="block ui-text font-semibold mb-2">Message</label>
                    <textarea
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                    />
                </div>

                <button
                    type="submit"
                    className="btn-primary flex items-center gap-2 justify-center w-full"
                >
                    <Send size={18} /> Send Message
                </button>
            </form>

            <div className="card mt-8 bg-accent-light">
                <div className="flex items-center gap-3 mb-2">
                    <Mail size={24} className="text-primary" />
                    <p className="ui-text font-semibold">Email</p>
                </div>
                <a
                    href="mailto:hello@sanskritakosh.com"
                    className="text-primary hover:underline"
                >
                    hello@sanskritakosh.com
                </a>
            </div>
        </div>
    );
}
