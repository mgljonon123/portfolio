/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn2.penguin.com.au",
      "files.fm",
      "m.media-amazon.com", // Added Amazon image domain
    ],
  },
};

module.exports = nextConfig;
