'use client';

import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../providers/ThemeProvider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  onAnalysisTypeChange: (type: 'text' | 'image' | 'combined') => void;
  currentAnalysisType: 'text' | 'image' | 'combined';
}

export default function Navbar({
  onAnalysisTypeChange,
  currentAnalysisType,
}: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const isAnalyzePage = pathname === '/analyze';

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/home" className="text-xl font-bold text-gray-900 dark:text-white">
              Fake News Detector
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAnalyzePage && (
              <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    currentAnalysisType === 'text'
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                  onClick={() => onAnalysisTypeChange('text')}
                >
                  Text
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    currentAnalysisType === 'image'
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                  onClick={() => onAnalysisTypeChange('image')}
                >
                  Image
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    currentAnalysisType === 'combined'
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                  onClick={() => onAnalysisTypeChange('combined')}
                >
                  Text+Image
                </motion.button>
              </div>
            )}

            <div className="flex items-center space-x-2">
              {isAnalyzePage ? (
                <Link 
                  href="/home" 
                  className="px-3 py-1 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Home
                </Link>
              ) : (
                <Link 
                  href="/analyze" 
                  className="px-3 py-1 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Analyze
                </Link>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
                onClick={toggleTheme}
              >
                {theme === 'light' ? (
                  <MoonIcon className="h-5 w-5 text-gray-600" />
                ) : (
                  <SunIcon className="h-5 w-5 text-yellow-400" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 