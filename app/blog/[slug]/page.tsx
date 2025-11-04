import { notFound } from "next/navigation";
import { Calendar, Tag, ArrowLeft, User } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";

// Fetch all posts để generate static params
async function getAllPostsFromAPI() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/firebase/posts?status=published&limit=100`, {
      cache: 'no-store',
    });
    
    if (!res.ok) return [];
    const data = await res.json();
    return data.data?.posts || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

// Fetch single post by slug
async function getPostBySlug(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/firebase/posts?status=published&limit=100`, {
      cache: 'no-store',
    });
    
    if (!res.ok) return null;
    const data = await res.json();
    const posts = data.data?.posts || [];
    
    // Tìm post theo slug
    return posts.find((post: any) => post.slug === slug) || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function generateStaticParams() {
  const posts = await getAllPostsFromAPI();
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} - Jai98 News`,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Quay lại Blog
      </Link>

      {post.coverImageUrl && (
        <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <header className="mb-8 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">{post.title}</h1>
        
        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 flex-wrap">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <time dateTime={post.publishedAt || post.createdAt}>
              {new Date(post.publishedAt || post.createdAt).toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          
          {post.authorName && (
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{post.authorName}</span>
            </div>
          )}
          
          {post.views !== undefined && (
            <span className="text-sm">
              👁️ {post.views} lượt xem
            </span>
          )}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="w-5 h-5 text-gray-500" />
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {post.summary && (
          <p className="text-xl text-gray-600 dark:text-gray-400 border-l-4 border-blue-500 pl-4 italic">
            {post.summary}
          </p>
        )}
      </header>

      <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>

      <footer className="mt-12 pt-8 border-t">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Xem tất cả bài viết
        </Link>
      </footer>
    </article>
  );
}
