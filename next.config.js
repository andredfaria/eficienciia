/** @type {import('next').NextConfig} */
const nextConfig = {
  // Exportação estática apenas em produção quando necessário
  // Comentado para permitir middleware em desenvolvimento
  // output: 'export',
  
  // Configurações de ESLint
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Configurações de imagens otimizadas
  images: { 
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Configurações de compressão e otimização
  compress: true,
  poweredByHeader: false,
  
  // Configurações de experimental features
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
};

module.exports = nextConfig;
