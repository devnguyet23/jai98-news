import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';
import { z } from 'zod';
import { syncPostToAlgolia } from '@/lib/algolia/admin';

/**
 * Schema validation cho Post
 */
const CreatePostSchema = z.object({
  title: z.string().min(1, 'Title không được để trống'),
  slug: z.string().min(1, 'Slug không được để trống').regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    'Slug chỉ được chứa chữ thường, số và dấu gạch ngang'
  ),
  summary: z.string().min(1, 'Summary không được để trống'),
  content: z.string().min(1, 'Content không được để trống'),
  coverImageUrl: z.string().url('Cover phải là URL hợp lệ').optional(),
  authorId: z.string().min(1, 'AuthorId không được để trống'),
  authorName: z.string().min(1, 'AuthorName không được để trống'),
  authorPhotoURL: z.string().url().optional(),
  tags: z.array(z.string()).default([]),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
});

/**
 * GET /api/firebase/posts
 * Lấy danh sách posts với pagination
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit') || '10';
    const status = searchParams.get('status') || 'published';
    const lastDocId = searchParams.get('lastDocId');
    
    const limit = parseInt(limitParam, 10);

    let query = adminDb
      .collection('posts')
      .where('status', '==', status)
      .orderBy('publishedAt', 'desc')
      .limit(limit);

    // Pagination
    if (lastDocId) {
      const lastDoc = await adminDb.collection('posts').doc(lastDocId).get();
      if (lastDoc.exists) {
        query = query.startAfter(lastDoc);
      }
    }

    const snapshot = await query.get();
    
    const posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate().toISOString(),
      updatedAt: doc.data().updatedAt?.toDate().toISOString(),
      publishedAt: doc.data().publishedAt?.toDate().toISOString(),
    }));

    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
    const duration = Date.now() - startTime;

    console.log(`✅ [API] Fetched ${posts.length} posts in ${duration}ms`);

    return NextResponse.json({
      success: true,
      data: {
        posts,
        lastDocId: lastVisible?.id || null,
        hasMore: posts.length === limit,
      },
      duration: `${duration}ms`,
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error('❌ [API] Error fetching posts:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch posts',
        message: error instanceof Error ? error.message : 'Unknown error',
        duration: `${duration}ms`,
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/firebase/posts
 * Tạo post mới
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Parse JSON body
    let body: unknown;
    try {
      body = await request.json();
    } catch (error) {
      console.error('❌ [API] Invalid JSON:', error);
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid JSON format',
          message: 'Request body phải là JSON hợp lệ'
        },
        { status: 400 }
      );
    }

    // Validate với Zod
    const validationResult = CreatePostSchema.safeParse(body);
    
    if (!validationResult.success) {
      const errors = validationResult.error.issues.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      
      console.error('❌ [API] Validation failed:', errors);
      
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
    
    // Check slug đã tồn tại chưa
    const existingPost = await adminDb
      .collection('posts')
      .where('slug', '==', data.slug)
      .limit(1)
      .get();

    if (!existingPost.empty) {
      console.warn('⚠️  [API] Slug already exists:', data.slug);
      return NextResponse.json(
        {
          success: false,
          error: 'Slug already exists',
          message: `Bài viết với slug "${data.slug}" đã tồn tại`,
          slug: data.slug,
        },
        { status: 409 }
      );
    }

    const now = new Date();
    
    // Tạo post data
    const postData = {
      ...data,
      createdAt: now,
      updatedAt: now,
      publishedAt: data.status === 'published' ? now : null,
      views: 0,
      likes: 0,
    };

    console.log('📝 [API] Creating post:', {
      title: data.title,
      slug: data.slug,
      status: data.status,
      tags: data.tags,
    });

    // Lưu vào Firestore
    const docRef = await adminDb.collection('posts').add(postData);
    
    console.log('✅ [API] Post created in Firestore:', docRef.id);

    // Đồng bộ lên Algolia nếu published
    if (data.status === 'published') {
      try {
        const postWithId = {
          id: docRef.id,
          ...postData,
        };
        await syncPostToAlgolia(postWithId as any);
        console.log('✅ [API] Post synced to Algolia');
      } catch (algoliaError) {
        console.error('⚠️  [API] Algolia sync failed:', algoliaError);
        // Không fail request nếu Algolia sync lỗi
      }
    }

    const duration = Date.now() - startTime;
    console.log(`✨ [API] Post created in ${duration}ms`);

    return NextResponse.json(
      {
        success: true,
        message: 'Post created successfully',
        data: {
          id: docRef.id,
          slug: data.slug,
          title: data.title,
          status: data.status,
          url: `/blog/${data.slug}`,
        },
        duration: `${duration}ms`,
      },
      { status: 201 }
    );

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
