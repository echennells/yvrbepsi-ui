/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: "/bepsi",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
