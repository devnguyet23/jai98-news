import Link from "next/link";
import { FileText, Eye, ThumbsUp, Plus, TrendingUp } from "lucide-react";

// Fetch stats từ Firebase
async function getStats() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    
    // Fetch all posts để tính stats
    const res = await fetch(`${baseUrl}/api/firebase/posts?limit=100`, {
      cache: 'no-store',
    });
    
    if (!res.ok) return null;
    const data = await res.json();
    const allPosts = data.data?.posts || [];
    
    // Tính toán stats
    const published = allPosts.filter((p: any) => p.status === 'published').length;
    const draft = allPosts.filter((p: any) => p.status === 'draft').length;
    const totalViews = allPosts.reduce((sum: number, p: any) => sum + (p.views || 0), 0);
    const totalLikes = allPosts.reduce((sum: number, p: any) => sum + (p.likes || 0), 0);
    
    return {
      total: allPosts.length,
      published,
      draft,
      totalViews,
      totalLikes,
      recentPosts: allPosts.slice(0, 5),
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return null;
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">
          Không thể tải dữ liệu. Vui lòng thử lại.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Chào mừng đến Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Quản lý bài viết và nội dung của bạn
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Posts */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">{stats.total}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Tổng số bài viết</p>
          <div className="mt-2 text-xs text-gray-500">
            {stats.published} published • {stats.draft} draft
          </div>
        </div>

        {/* Total Views */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <Eye className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">{stats.totalViews.toLocaleString()}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Tổng lượt xem</p>
        </div>

        {/* Total Likes */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <ThumbsUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">{stats.totalLikes.toLocaleString()}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Tổng lượt thích</p>
        </div>

        {/* Published Posts */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">{stats.published}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Bài đã xuất bản</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/posts/new"
            className="flex items-center gap-3 p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
          >
            <Plus className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="font-semibold">Tạo bài viết mới</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Viết bài mới</p>
            </div>
          </Link>

          <Link
            href="/admin/posts"
            className="flex items-center gap-3 p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
          >
            <FileText className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="font-semibold">Quản lý bài viết</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Xem tất cả posts</p>
            </div>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-3 p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
          >
            <Eye className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="font-semibold">Xem website</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Preview site</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Bài viết gần đây</h2>
          <Link
            href="/admin/posts"
            className="text-sm text-blue-600 hover:underline"
          >
            Xem tất cả →
          </Link>
        </div>
        
        <div className="space-y-3">
          {stats.recentPosts.map((post: any) => (
            <Link
              key={post.id}
              href={`/admin/posts/${post.id}/edit`}
              className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
            >
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{post.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className={`px-2 py-1 rounded text-xs ${
                    post.status === 'published' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {post.status}
                  </span>
                  <span>👁️ {post.views || 0}</span>
                  <span>👍 {post.likes || 0}</span>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString('vi-VN')}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
