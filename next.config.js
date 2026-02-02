/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.prismic.io", pathname: "/**" }
    ]
  },
  turbopack: { root: __dirname }
};

module.exports = nextConfig;
