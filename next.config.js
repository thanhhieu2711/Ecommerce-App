/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                port: '',
                // pathname: '/account123/**',
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/api/orders',
                destination: `api/orders`,
                basePath: process.env.NEXTAUTH_URL_PUBLIC,
            },
        ];
    },
};

module.exports = nextConfig;
