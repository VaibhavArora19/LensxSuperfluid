/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  transpilePackages: ["@nivo", "@nivo/calendar"],
  experimental: {
    esmExternals: "loose",
  },
};

module.exports = nextConfig;
