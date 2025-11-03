import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';

// Schema validation với Zod
const PostSchema = z.object({
  title: z.string().min(1, 'Title không được để trống'),
  slug: z.string().min(1, 'Slug không được để trống').regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    'Slug chỉ được chứa chữ thường, số và dấu gạch ngang'
  ).optional(),
  date: z.string().regex(
    /^\d{4}-\d{2}-\d{2}$/,
    'Date phải có định dạng YYYY-MM-DD'
  ).optional(),
  tags: z.array(z.string()).optional().default([]),
  content: z.string().min(1, 'Content không được để trống'),
  summary: z.string().optional(),
  cover: z.string().url('Cover phải là URL hợp lệ').optional(),
});

type PostInput = z.infer<typeof PostSchema>;

/**
 * API Endpoint: POST /api/posts
 * Tạo bài viết mới từ dữ liệu JSON và lưu vào thư mục /posts
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
    const validationResult = PostSchema.safeParse(body);
    
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
    
    // Tạo slug nếu không có
    const slug = data.slug || data.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Bỏ dấu tiếng Việt
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '') // Chỉ giữ chữ, số, space, gạch ngang
      .replace(/\s+/g, '-') // Thay space bằng gạch ngang
      .replace(/-+/g, '-') // Gộp nhiều gạch ngang thành 1
      .replace(/^-|-$/g, ''); // Xóa gạch ngang đầu cuối

    // Tạo date nếu không có
    const date = data.date || new Date().toISOString().split('T')[0];

    console.log('📝 [API] Creating post:', {
      title: data.title,
      slug,
      date,
      tags: data.tags,
      contentLength: data.content.length,
    });

    // Đường dẫn file
    const postsDir = path.join(process.cwd(), 'posts');
    const filePath = path.join(postsDir, `${slug}.md`);

    // Kiểm tra file đã tồn tại chưa
    if (fs.existsSync(filePath)) {
      console.warn('⚠️  [API] File already exists:', filePath);
      return NextResponse.json(
        {
          success: false,
          error: 'File already exists',
          message: `Bài viết với slug "${slug}" đã tồn tại`,
          slug,
        },
        { status: 409 }
      );
    }

    // Đảm bảo thư mục posts tồn tại
    if (!fs.existsSync(postsDir)) {
      fs.mkdirSync(postsDir, { recursive: true });
      console.log('📁 [API] Created posts directory');
    }

    // Tạo Front Matter
    const frontMatter = [
      '---',
      `title: "${data.title.replace(/"/g, '\\"')}"`,
      `date: "${date}"`,
      `tags: [${data.tags.map(tag => `"${tag}"`).join(', ')}]`,
    ];

    if (data.summary) {
      frontMatter.push(`summary: "${data.summary.replace(/"/g, '\\"')}"`);
    }

    if (data.cover) {
      frontMatter.push(`cover: "${data.cover}"`);
    }

    frontMatter.push('---');

    // Tạo nội dung file
    const fileContent = [
      ...frontMatter,
      '',
      data.content,
    ].join('\n');

    // Ghi file
    try {
      fs.writeFileSync(filePath, fileContent, 'utf8');
      console.log('✅ [API] File created successfully:', filePath);
    } catch (writeError) {
      console.error('❌ [API] Failed to write file:', writeError);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to write file',
          message: 'Không thể ghi file vào hệ thống',
        },
        { status: 500 }
      );
    }

    const duration = Date.now() - startTime;
    console.log(`✨ [API] Post created in ${duration}ms`);

    // Trả về response thành công
    return NextResponse.json(
      {
        success: true,
        message: 'Post created successfully',
        data: {
          slug,
          file: `${slug}.md`,
          path: `/posts/${slug}.md`,
          url: `/blog/${slug}`,
          title: data.title,
          date,
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
