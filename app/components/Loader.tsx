'use client';

import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <motion.div
        className="relative w-16 h-16"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="absolute w-16 h-16 border-4 border-gray-200 dark:border-gray-700 rounded-full" />
        <motion.div
          className="absolute w-16 h-16 border-4 border-blue-500 rounded-full"
          style={{
            borderTopColor: 'transparent',
            borderLeftColor: 'transparent',
          }}
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>
      <motion.p
        className="text-gray-600 dark:text-gray-400"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        Analyzing content...
      </motion.p>
    </div>
  );
} 