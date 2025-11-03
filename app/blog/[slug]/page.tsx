import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { Calendar, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} - Andy's Blog`,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

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

      {post.cover && (
        <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <header className="mb-8 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">{post.title}</h1>
        
        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        </div>

        {post.tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="w-5 h-5 text-gray-500" />
            {post.tags.map((tag) => (
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
