'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from '../providers/ThemeProvider';
import Footer from '../components/Footer';

export default function HomePage() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Fake News Detector
            </h1>
            <Link 
              href="/analyze" 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try It Now
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Detect Fake News with AI
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
          >
            Our advanced AI technology helps you verify the authenticity of news articles, images, and social media content.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link 
              href="/analyze" 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Start Analyzing
            </Link>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">Text Analysis</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Analyze news articles and text content to detect patterns commonly associated with fake news.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">Image Analysis</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Detect manipulated or doctored images using advanced computer vision algorithms.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">Combined Analysis</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Analyze both text and images together for a comprehensive authenticity check.
              </p>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            How It Works
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center mb-8">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">1</span>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Input Content</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Enter the text you want to analyze or upload an image. You can also do both for a combined analysis.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center mb-8">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6">
                <span className="text-2xl font-bold text-green-600 dark:text-green-300">2</span>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">AI Analysis</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our advanced AI algorithms analyze the content for patterns, inconsistencies, and manipulation.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-300">3</span>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Get Results</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Receive a detailed analysis with confidence score and explanation of the findings.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Creators Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Created By
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center"
            >
              <div className="w-24 h-24 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-300">J</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Jai</h3>
              
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center"
            >
              <div className="w-24 h-24 mx-auto bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-green-600 dark:text-green-300">S</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Sahil</h3>
             
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center"
            >
              <div className="w-24 h-24 mx-auto bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-purple-600 dark:text-purple-300">M</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Manoj</h3>
             
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center"
            >
              <div className="w-24 h-24 mx-auto bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-yellow-600 dark:text-yellow-300">S</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Sambhav</h3>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-blue-50 dark:bg-blue-900 p-8 rounded-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Detect Fake News?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              Try our Fake News Detector now and verify the authenticity of content.
            </p>
            <Link 
              href="/analyze" 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Start Analyzing
            </Link>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
} 