"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Layers } from 'lucide-react';

interface CategoryImageProps {
  src?: string | null;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: { width: 40, height: 40 },
  md: { width: 80, height: 80 },
  lg: { width: 160, height: 160 },
};

export function CategoryImage({ 
  src, 
  alt, 
  size = 'md', 
  className = '' 
}: CategoryImageProps) {
  const [hasError, setHasError] = useState(false);
  const { width, height } = sizes[size];

  const handleError = () => {
    setHasError(true);
  };

  // Handle null, undefined, or error loading the image
  if (!src || hasError) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 ${className}`}
           style={{ width, height }}>
        <Layers className="w-1/3 h-1/3 text-gray-400" />
      </div>
    );
  }

  // If we have a valid image URL, render it with Next.js Image
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="object-cover w-full h-full"
        onError={handleError}
        unoptimized={src.startsWith('https://via.placeholder.com')} // Don't optimize placeholder images
      />
    </div>
  );
} 