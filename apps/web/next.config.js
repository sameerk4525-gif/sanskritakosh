module.exports = {
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
