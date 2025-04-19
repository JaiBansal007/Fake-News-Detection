'use client';

import { useState } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

interface AnalysisResult {
  is_fake: boolean;
  confidence: number;
  explanation: string;
  error?: string;
}

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
    <main className={`min-h-screen p-8 ${inter.className}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Fake News Detection
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <textarea
            className="w-full h-48 p-4 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Paste your news article or text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          
          <button
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            onClick={analyzeText}
            disabled={loading || !text.trim()}
          >
            {loading ? 'Analyzing...' : 'Analyze Text'}
          </button>
        </div>

        {result && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Analysis Result</h2>
            {result.error ? (
              <p className="text-red-600">{result.error}</p>
            ) : (
              <div>
                <p className="text-lg mb-2">
                  <span className="font-semibold">Status: </span>
                  <span className={result.is_fake ? 'text-red-600' : 'text-green-600'}>
                    {result.is_fake ? 'Likely Fake' : 'Likely Real'}
                  </span>
                </p>
                <p className="text-lg mb-2">
                  <span className="font-semibold">Confidence: </span>
                  {(result.confidence * 100).toFixed(2)}%
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Explanation: </span>
                  {result.explanation}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
