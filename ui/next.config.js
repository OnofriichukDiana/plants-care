/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plants-care.s3.us-east-005.backblazeb2.com",
      },
    ],
  },
};

module.exports = nextConfig;
