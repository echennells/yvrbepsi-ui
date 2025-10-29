/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: "export", // Disabled to allow API routes for Ark invoice creation
  images: {
    unoptimized: true,
  },
  swcMinify: false,
  compiler: {
    removeConsole: false,
  },
  experimental: {
    forceSwcTransforms: false,
    swcTraceProfiling: false,
  },
};

module.exports = nextConfig;
