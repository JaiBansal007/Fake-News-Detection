import { NextResponse } from 'next/server';
import { analyzeText, analyzeImage, analyzeCombined } from '@/lib/analysis';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const text = formData.get('text') as string | null;
    const image = formData.get('image') as File | null;

    if (!text && !image) {
      return NextResponse.json(
        { error: 'Please provide either text or image for analysis' },
        { status: 400 }
      );
    }

    let result;
    if (text && image) {
      // Combined analysis
      result = await analyzeCombined(text, image);
    } else if (text) {
      // Text-only analysis
      result = await analyzeText(text);
    } else if (image) {
      // Image-only analysis
      result = await analyzeImage(image);
    } else {
      return NextResponse.json(
        { error: 'Invalid input combination' },
        { status: 400 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze content' },
      { status: 500 }
    );
  }
} 