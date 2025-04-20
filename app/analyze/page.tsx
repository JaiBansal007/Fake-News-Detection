'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import ResultPopup from '../components/ResultPopup';

export default function AnalyzePage() {
  const [analysisType, setAnalysisType] = useState<'text' | 'image' | 'combined'>('text');
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    is_fake: boolean;
    confidence: number;
    explanation: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setError(null);
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const analyzeContent = async () => {
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      if (analysisType === 'text' || analysisType === 'combined') {
        if (!text.trim()) {
          setError('Please enter some text');
          return;
        }
        formData.append('text', text);
      }
      if (analysisType === 'image' || analysisType === 'combined') {
        if (!image) {
          setError('Please upload an image');
          return;
        }
        formData.append('image', image);
      }

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to analyze content');
      }

      const data = await response.json();
      setResult(data);
      toast.success('Analysis completed!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast.error('Failed to analyze content');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setText('');
    setImage(null);
    setImagePreview(null);
    setError(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar
        onAnalysisTypeChange={(type) => {
          setAnalysisType(type);
          resetForm();
        }}
        currentAnalysisType={analysisType}
      />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Fake News Analysis
              </h1>
              <Link 
                href="/home" 
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Back to Home
              </Link>
            </div>

            {(analysisType === 'text' || analysisType === 'combined') && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Enter text to analyze
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full h-32 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Paste your text here..."
                />
              </div>
            )}

            {(analysisType === 'image' || analysisType === 'combined') && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Upload an image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="mx-auto h-32 w-auto object-contain"
                        />
                        <button
                          onClick={() => {
                            setImage(null);
                            setImagePreview(null);
                          }}
                          className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <>
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600 dark:text-gray-400">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={analyzeContent}
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Analyzing...' : 'Analyze Content'}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </main>

      {loading && <Loader />}

      <ResultPopup
        isOpen={!!result}
        onClose={() => setResult(null)}
        isFake={result?.is_fake ?? false}
        confidence={result?.confidence ?? 0}
        explanation={result?.explanation ?? ''}
      />
    </div>
  );
} 