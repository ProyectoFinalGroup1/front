import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // Agregar el dominio de Cloudinary
  },
};

export default nextConfig;
