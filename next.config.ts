import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages:["next-mdx-remote"],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.pinimg.com' },
      { protocol: 'https', hostname: 'i.scdn.co' },
      { protocol: 'https', hostname: 'ghchart.rshah.org' },
      { protocol: 'https', hostname: '*.fbcdn.net' },
    ],
  },
};


 
export default nextConfig