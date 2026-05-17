import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#8B4513",
                    light: "#D4956A",
                    dark: "#5C2D0A",
                },
                accent: {
                    DEFAULT: "#C9A84C",
                    light: "#F0D98C",
                },
                bg: {
                    DEFAULT: "#FDF8F0",
                    card: "#FFFDF7",
                    dark: "#2C1810",
                },
                text: {
                    primary: "#1A0A00",
                    secondary: "#5C3D1E",
                    muted: "#9C7A5A",
                },
                border: {
                    DEFAULT: "#E8D5B5",
                },
                success: "#2D6A2D",
                error: "#8B1A1A",
            },
            fontFamily: {
                sanskrit: ["Tiro Devanagari Sanskrit", "Noto Serif Devanagari", "serif"],
                body: ["Crimson Pro", "Georgia", "serif"],
                ui: ["DM Sans", "Nunito", "sans-serif"],
                sans: ["DM Sans", ...defaultTheme.fontFamily.sans],
            },
            boxShadow: {
                card: "0 2px 12px rgba(139, 69, 19, 0.08)",
                hover: "0 8px 24px rgba(139, 69, 19, 0.16)",
            },
            borderRadius: {
                DEFAULT: "12px",
            },
        },
    },
    plugins: [],
};

export default config;
