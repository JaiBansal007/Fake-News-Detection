'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface ResultPopupProps {
  isOpen: boolean;
  onClose: () => void;
  isFake: boolean;
  confidence: number;
  explanation: string;
}

export default function ResultPopup({
  isOpen,
  onClose,
  isFake,
  confidence,
  explanation,
}: ResultPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
        >
          <div className="fixed inset-0 bg-black/30" onClick={onClose} />
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full p-6"
          >
            <div className="flex items-center justify-center mb-4">
              {isFake ? (
                <XCircleIcon className="h-12 w-12 text-red-500" />
              ) : (
                <CheckCircleIcon className="h-12 w-12 text-green-500" />
              )}
            </div>
            
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">
              {isFake ? 'Fake News Detected' : 'Authentic Content'}
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Confidence:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {(confidence * 100).toFixed(2)}%
                </span>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-gray-700 dark:text-gray-300">{explanation}</p>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 w-full bg-gray-900 dark:bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
              onClick={onClose}
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 