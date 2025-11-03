import { NextRequest, NextResponse } from 'next/server';
import { savePost } from '@/lib/posts';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Create post object
    const post = {
      title: body.title,
      summary: body.summary || '',
      content: body.content,
      date: body.date || new Date().toISOString(),
      tags: body.tags || [],
      cover: body.cover,
    };

    // Save post
    const slug = savePost(post);

    return NextResponse.json(
      {
        success: true,
        slug,
        message: 'Post created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
