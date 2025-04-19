'use client';

import { useState } from 'react';
import { Inter } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';

const inter = Inter({ subsets: ['latin'] });

interface AnalysisResult {
  is_fake: boolean;
  confidence: number;
  explanation: string;
  error?: string;
}

const Loader = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
  </div>
);

export default function Home() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const analyzeText = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      setResult({
        is_fake: false,
        confidence: 0,
        explanation: '',
        error: 'An error occurred while analyzing the text.',
      });
    }
    setLoading(false);
  };

  return (
    <main className={`min-h-screen p-8 bg-white ${inter.className}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl font-bold mb-8 text-center text-black"
        >
          Fake News Detection
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gray-50 rounded-lg shadow-lg p-6 mb-8 border border-gray-200"
        >
          <textarea
            className="w-full h-48 p-4 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-black bg-white text-black placeholder-gray-500"
            placeholder="Paste your news article or text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400"
            onClick={analyzeText}
            disabled={loading || !text.trim()}
          >
            {loading ? <Loader /> : 'Analyze Text'}
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 rounded-lg shadow-lg p-6 border border-gray-200"
            >
              <h2 className="text-2xl font-semibold mb-4 text-black">Analysis Result</h2>
              {result.error ? (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-600"
                >
                  {result.error}
                </motion.p>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.p 
                    className="text-lg mb-2"
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="font-semibold text-black">Status: </span>
                    <span className={result.is_fake ? 'text-red-600' : 'text-green-600'}>
                      {result.is_fake ? 'Likely Fake' : 'Likely Real'}
                    </span>
                  </motion.p>
                  <motion.p 
                    className="text-lg mb-2"
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <span className="font-semibold text-black">Confidence: </span>
                    {(result.confidence * 100).toFixed(2)}%
                  </motion.p>
                  <motion.p 
                    className="text-lg"
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <span className="font-semibold text-black">Explanation: </span>
                    {result.explanation}
                  </motion.p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
