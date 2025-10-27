import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages:["next-mdx-remote"],
  images: {
    domains: [
      'i.pinimg.com',
      'i.scdn.co'
    ],
  },
};


 
export default nextConfig