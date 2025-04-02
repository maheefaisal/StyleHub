import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface FashionTrendCardProps {
  article: {
    title: string;
    description: string;
    urlToImage: string;
    url: string;
    source: {
      name: string;
    };
    publishedAt: string;
  };
  index: number;
  darkMode?: boolean;
}

export default function FashionTrendCard({ article, index, darkMode = false }: FashionTrendCardProps) {
  // Format the date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <motion.div 
      className={`rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image 
          src={article.urlToImage} 
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-0 right-0 bg-black bg-opacity-70 text-white px-3 py-1 text-xs font-semibold">
          {article.source.name}
        </div>
      </div>
      
      <div className="p-5">
        <div className={`text-xs mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {formatDate(article.publishedAt)}
        </div>
        <h3 className={`text-xl font-bold mb-2 line-clamp-2 ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}>
          {article.title}
        </h3>
        <p className={`mb-4 line-clamp-3 ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {article.description}
        </p>
        <Link 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`inline-block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            darkMode 
              ? 'bg-gray-700 text-white hover:bg-gray-600' 
              : 'bg-black text-white hover:bg-gray-800'
          }`}
        >
          Read More
        </Link>
      </div>
    </motion.div>
  );
} 