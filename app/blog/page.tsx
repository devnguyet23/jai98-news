import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { Calendar, Tag } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Blog - Andy's Blog",
  description: "Tất cả bài viết trên blog",
};

export default function BlogPage() {
  const posts = getAllPosts();

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Chưa có bài viết nào. Hãy thêm bài viết đầu tiên!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Blog</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Chia sẻ kiến thức và kinh nghiệm về công nghệ
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            {post.cover && (
              <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-800">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            {!post.cover && (
              <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-4xl font-bold">
                  {post.title.charAt(0)}
                </span>
              </div>
            )}
            
            <div className="p-5 space-y-3">
              <h2 className="text-xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                {post.title}
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                {post.summary}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.date).toLocaleDateString('vi-VN')}</span>
                </div>
              </div>
              
              {post.tags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="w-4 h-4 text-gray-500" />
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
