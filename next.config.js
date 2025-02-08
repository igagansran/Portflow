/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
      serverActions: true,
    },
    serverExternalPackages: ["@prisma/client"],
    images: {
      domains: [
        "hebbkx1anhila5yf.public.blob.vercel-storage.com",
        "lh3.googleusercontent.com", // For Google user avatars
        "avatars.githubusercontent.com", // For GitHub user avatars
        "res.cloudinary.com", // In case you use Cloudinary for image hosting
        "images.unsplash.com", // For placeholder images from Unsplash
        "picsum.photos", // For placeholder images from Lorem Picsum
      ],
    },
  }
  
  module.exports = nextConfig
  
  