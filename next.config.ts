/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn2.penguin.com.au",
      "files.fm",
      "m.media-amazon.com",
      "upload.wikimedia.org", // Add more as needed
      "images.unsplash.com",
      "res.cloudinary.com",
    ],
  },
};

module.exports = nextConfig;
