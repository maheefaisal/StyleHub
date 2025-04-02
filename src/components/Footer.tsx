'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-8 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="text-blue-600 dark:text-blue-400">Style</span>Hub
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} StyleHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
