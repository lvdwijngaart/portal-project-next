import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["avatars.githubusercontent.com", "randomuser.me"],
    remotePatterns: [new URL('https://usujzwwhshgoqsfj.public.blob.vercel-storage.com/**')],
  }
};

export default nextConfig;
