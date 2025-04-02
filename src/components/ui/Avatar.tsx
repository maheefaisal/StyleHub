"use client";

import Image from 'next/image';
import { useState } from 'react';
import { User } from 'lucide-react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
}

export function Avatar({ 
  src, 
  alt = 'User avatar', 
  size = 40, 
  className = ''
}: AvatarProps) {
  const [hasError, setHasError] = useState(false);

  // Handle image loading error
  const handleError = () => {
    setHasError(true);
  };

  return (
    <div 
      className={`relative overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {!hasError && src ? (
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="object-cover w-full h-full"
          onError={handleError}
        />
      ) : (
        <User 
          size={Math.round(size * 0.6)} 
          className="text-gray-500 dark:text-gray-400" 
        />
      )}
    </div>
  );
} 