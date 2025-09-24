import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
}

/**
 * Optimized Image Component
 * Automatically serves WebP/AVIF formats and handles responsive sizing
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  placeholder = 'empty',
  blurDataURL,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Generate responsive srcSet for different formats
  const generateSrcSet = (baseSrc: string, format: 'webp' | 'avif' | 'original') => {
    const extension = format === 'original' ? '' : `.${format}`;
    const baseName = baseSrc.replace(/\.(jpg|jpeg|png|gif)$/, '');
    
    return [
      `${baseName}-sm${extension} 384w`,
      `${baseName}-md${extension} 768w`, 
      `${baseName}-lg${extension} 1200w`,
      `${baseName}${extension} 1920w`,
    ].join(', ');
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  if (hasError) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-500 dark:text-gray-400 text-sm">
          Failed to load image
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Modern browsers with AVIF support */}
      <picture>
        <source
          srcSet={generateSrcSet(src, 'avif')}
          sizes={sizes}
          type="image/avif"
        />
        <source
          srcSet={generateSrcSet(src, 'webp')}
          sizes={sizes}
          type="image/webp"
        />
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          sizes={sizes}
          onLoad={handleLoad}
          onError={handleError}
          className={`
            transition-opacity duration-300 
            ${isLoading ? 'opacity-0' : 'opacity-100'}
          `}
          style={{
            objectFit: 'cover',
            width: '100%',
            height: 'auto',
          }}
        />
      </picture>
      
      {/* Loading placeholder */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
      )}
    </div>
  );
}