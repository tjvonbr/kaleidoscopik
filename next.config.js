/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_LEG_API_KEY: process.env.NEXT_LEG_API_KEY,
  },
};

module.exports = nextConfig;
