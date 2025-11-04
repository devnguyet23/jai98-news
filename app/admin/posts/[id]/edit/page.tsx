import { notFound } from 'next/navigation';
import PostForm from '@/components/admin/PostForm';

// Fetch post by ID
async function getPostById(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/firebase/posts/${id}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) return null;
    const data = await res.json();
    return data.data || data;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export default async function EditPostPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Chỉnh sửa bài viết</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Cập nhật nội dung bài viết
        </p>
      </div>

      <PostForm 
        mode="edit" 
        initialData={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          summary: post.summary,
          content: post.content,
          tags: post.tags || [],
          status: post.status,
          coverImageUrl: post.coverImageUrl,
          authorId: post.authorId,
          authorName: post.authorName,
        }}
      />
    </div>
  );
}
