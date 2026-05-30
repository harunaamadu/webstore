import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['10.255.76.240'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.mytheresa.com',
      },
      {
        protocol: 'https',
        hostname: 'www.macpros.tech',
      },
    ],
  },
};

export default nextConfig;
