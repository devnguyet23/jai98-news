import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';
import { z } from 'zod';
import { syncPostToAlgolia, deletePostFromAlgolia } from '@/lib/algolia/admin';

/**
 * Schema validation cho Update Post
 */
const UpdatePostSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
  summary: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  coverImageUrl: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
});

/**
 * GET /api/firebase/posts/[id]
 * Lấy chi tiết post theo ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const startTime = Date.now();
  
  try {
    const { id } = await params;
    
    const docRef = adminDb.collection('posts').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json(
        {
          success: false,
          error: 'Post not found',
          message: `Không tìm thấy bài viết với ID: ${id}`,
        },
        { status: 404 }
      );
    }

    const post = {
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data()?.createdAt?.toDate().toISOString(),
      updatedAt: doc.data()?.updatedAt?.toDate().toISOString(),
      publishedAt: doc.data()?.publishedAt?.toDate().toISOString(),
    };

    const duration = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      data: post,
      duration: `${duration}ms`,
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error('❌ [API] Error fetching post:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch post',
        message: error instanceof Error ? error.message : 'Unknown error',
        duration: `${duration}ms`,
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/firebase/posts/[id]
 * Cập nhật post
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const startTime = Date.now();
  
  try {
    const { id } = await params;
    
    // Parse JSON body
    let body: unknown;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid JSON format',
          message: 'Request body phải là JSON hợp lệ'
        },
        { status: 400 }
      );
    }

    // Validate
    const validationResult = UpdatePostSchema.safeParse(body);
    
    if (!validationResult.success) {
      const errors = validationResult.error.issues.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          message: 'Dữ liệu đầu vào không hợp lệ',
          details: errors,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;
    
    // Check post exists
    const docRef = adminDb.collection('posts').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json(
        {
          success: false,
          error: 'Post not found',
          message: `Không tìm thấy bài viết với ID: ${id}`,
        },
        { status: 404 }
      );
    }

    // Check slug conflict nếu update slug
    if (data.slug && data.slug !== doc.data()?.slug) {
      const existingPost = await adminDb
        .collection('posts')
        .where('slug', '==', data.slug)
        .limit(1)
        .get();

      if (!existingPost.empty && existingPost.docs[0].id !== id) {
        return NextResponse.json(
          {
            success: false,
            error: 'Slug already exists',
            message: `Slug "${data.slug}" đã được sử dụng bởi bài viết khác`,
          },
          { status: 409 }
        );
      }
    }

    const now = new Date();
    const updateData: any = {
      ...data,
      updatedAt: now,
    };

    // Nếu chuyển sang published, set publishedAt
    if (data.status === 'published' && !doc.data()?.publishedAt) {
      updateData.publishedAt = now;
    }

    console.log('📝 [API] Updating post:', id);

    // Update Firestore
    await docRef.update(updateData);
    
    console.log('✅ [API] Post updated in Firestore');

    // Sync Algolia
    const updatedDoc = await docRef.get();
    const updatedPost = {
      id: updatedDoc.id,
      ...updatedDoc.data(),
    };

    if (updatedPost.status === 'published') {
      try {
        await syncPostToAlgolia(updatedPost as any);
        console.log('✅ [API] Post synced to Algolia');
      } catch (algoliaError) {
        console.error('⚠️  [API] Algolia sync failed:', algoliaError);
      }
    } else {
      // Xóa khỏi Algolia nếu không còn published
      try {
        await deletePostFromAlgolia(id);
        console.log('✅ [API] Post removed from Algolia');
      } catch (algoliaError) {
        console.error('⚠️  [API] Algolia delete failed:', algoliaError);
      }
    }

    const duration = Date.now() - startTime;
    console.log(`✨ [API] Post updated in ${duration}ms`);

    return NextResponse.json({
      success: true,
      message: 'Post updated successfully',
      data: {
        id,
        ...updateData,
      },
      duration: `${duration}ms`,
    });

  } catch (error) {
    const duration = Date.now() - startTime;
    console.error('❌ [API] Unexpected error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Đã xảy ra lỗi không mong muốn',
        details: error instanceof Error ? error.message : 'Unknown error',
        duration: `${duration}ms`,
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/firebase/posts/[id]
 * Xóa post
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const startTime = Date.now();
  
  try {
    const { id } = await params;
    
    const docRef = adminDb.collection('posts').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json(
        {
          success: false,
          error: 'Post not found',
          message: `Không tìm thấy bài viết với ID: ${id}`,
        },
        { status: 404 }
      );
    }

    console.log('🗑️  [API] Deleting post:', id);

    // Delete from Firestore
    await docRef.delete();
    
    console.log('✅ [API] Post deleted from Firestore');

    // Delete from Algolia
    try {
      await deletePostFromAlgolia(id);
      console.log('✅ [API] Post deleted from Algolia');
    } catch (algoliaError) {
      console.error('⚠️  [API] Algolia delete failed:', algoliaError);
    }

    const duration = Date.now() - startTime;
    console.log(`✨ [API] Post deleted in ${duration}ms`);

    return NextResponse.json({
      success: true,
      message: 'Post deleted successfully',
      data: { id },
      duration: `${duration}ms`,
    });

  } catch (error) {
    const duration = Date.now() - startTime;
    console.error('❌ [API] Unexpected error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Đã xảy ra lỗi không mong muốn',
        details: error instanceof Error ? error.message : 'Unknown error',
        duration: `${duration}ms`,
      },
      { status: 500 }
    );
  }
}
