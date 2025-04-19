import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input. Please provide a text string.' },
        { status: 400 }
      );
    }

    // Generate random result
    const is_fake = Math.random() > 0.5;
    const confidence = Math.random() * 0.3 + 0.7; // Random confidence between 0.7 and 1.0
    
    // Generate explanation based on the result
    const explanation = is_fake 
      ? "This text shows characteristics commonly associated with fake news, such as sensational language and unverified claims."
      : "This text appears to be from a reliable source with factual information and proper citations.";

    return NextResponse.json({
      is_fake,
      confidence,
      explanation
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
} 