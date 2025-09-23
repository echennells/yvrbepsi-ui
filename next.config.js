/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  swcMinify: false,
  experimental: {
    forceSwcTransforms: false,
  },
};

module.exports = nextConfig;
