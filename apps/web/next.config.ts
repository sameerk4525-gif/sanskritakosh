import type { NextConfig } from "next";
import withPWA from "next-pwa";

const config: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
        ],
    },
    webpack: (config) => {
        config.externals = [...(config.externals || []), "better-sqlite3"];
        return config;
    },
};

export default withPWA({
    dest: "public",
    register: "/sw.js",
    skipWaiting: true,
    ...config,
});
