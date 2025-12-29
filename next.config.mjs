/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, basePath: "/dashboard", experimental: {
        nextScriptWorkers: false, // Disable worker scripts
    },
};


export default nextConfig;
