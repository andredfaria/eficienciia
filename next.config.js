/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  
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
  
  // Configurações de webpack para otimização
  webpack: (config, { dev, isServer }) => {
    // Otimizações apenas para produção
    if (!dev && !isServer) {
      // Minimizar CSS
      config.optimization.minimize = true
      
      // Split chunks otimizado
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
        },
      }
    }
    
    return config
  },
  
  // Configurações de experimental features
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
};

module.exports = nextConfig;
