import PostForm from '@/components/admin/PostForm';

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tạo bài viết mới</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Viết và xuất bản bài viết mới
        </p>
      </div>

      <PostForm mode="create" />
    </div>
  );
}
