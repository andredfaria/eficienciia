"use client"

import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  sizes?: string
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  onLoad?: () => void
  onError?: () => void
}

/**
 * Componente de imagem otimizada para SEO e performance
 * Implementa lazy loading, WebP, e otimizações de Core Web Vitals
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Fallback para imagem de erro
  const handleError = () => {
    setHasError(true)
    onError?.()
  }

  // Callback de carregamento
  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  // Se houve erro, mostrar placeholder
  if (hasError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-500 text-sm">Imagem não disponível</span>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`
          transition-opacity duration-300
          ${isLoading ? 'opacity-0' : 'opacity-100'}
        `}
        priority={priority}
        sizes={sizes}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        // Otimizações para Core Web Vitals
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        style={{
          objectFit: 'cover',
          objectPosition: 'center'
        }}
      />
      
      {/* Skeleton loading */}
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ width, height }}
        />
      )}
    </div>
  )
}

/**
 * Componente para imagens de hero otimizadas
 * Prioriza carregamento para LCP (Largest Contentful Paint)
 */
export function HeroImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      priority={true}
      sizes="100vw"
      quality={90}
      className={`w-full h-auto ${props.className || ''}`}
    />
  )
}

/**
 * Componente para thumbnails otimizados
 * Otimizado para performance em listagens
 */
export function ThumbnailImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      priority={false}
      sizes="(max-width: 768px) 50vw, 25vw"
      quality={75}
      className={`w-full h-auto ${props.className || ''}`}
    />
  )
}
