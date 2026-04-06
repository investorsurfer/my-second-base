/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/.well-known/farcaster.json',
        destination: '/.well-known/farcaster.json',
      },
    ];
  },
};

export default nextConfig;