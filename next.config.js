/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
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
