/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',  // Domain dari gambar eksternal
      },
    ],
  },
};

export default nextConfig;
