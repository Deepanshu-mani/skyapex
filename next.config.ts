import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental:{
    serverComponentsExternalPackages:['puppeteer']
  }
};

export default nextConfig;
