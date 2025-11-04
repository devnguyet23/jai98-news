'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Eye, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface PostFormProps {
  initialData?: {
    id?: string;
    title: string;
    slug: string;
    summary: string;
    content: string;
    tags: string[];
    status: 'draft' | 'published' | 'archived';
    coverImageUrl?: string;
    authorId: string;
    authorName: string;
  };
  mode: 'create' | 'edit';
}

export default function PostForm({ initialData, mode }: PostFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    summary: initialData?.summary || '',
    content: initialData?.content || '',
    tags: initialData?.tags?.join(', ') || '',
    status: initialData?.status || 'draft',
    coverImageUrl: initialData?.coverImageUrl || '',
    authorId: initialData?.authorId || 'admin-001',
    authorName: initialData?.authorName || 'Admin',
  });

  // Auto-generate slug from title
  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, ''),
    }));
  };

  const handleSubmit = async (e: React.FormEvent, status?: string) => {
    e.preventDefault();
    setLoading(true);

    try {
      const postData = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        status: status || formData.status,
      };

      const url = mode === 'create' 
        ? '/api/firebase/posts'
        : `/api/firebase/posts/${initialData?.id}`;
      
      const method = mode === 'create' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`Bài viết đã được ${mode === 'create' ? 'tạo' : 'cập nhật'} thành công!`);
        router.push('/admin/posts');
        router.refresh();
      } else {
        alert(`Lỗi: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Có lỗi xảy ra khi lưu bài viết');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/posts"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </Link>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={(e) => handleSubmit(e, 'draft')}
            disabled={loading}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            Lưu nháp
          </button>
          
          <button
            type="button"
            onClick={(e) => handleSubmit(e, 'published')}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {loading ? 'Đang lưu...' : 'Xuất bản'}
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <label className="block text-sm font-medium mb-2">
              Tiêu đề <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập tiêu đề bài viết..."
            />
          </div>

          {/* Slug */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <label className="block text-sm font-medium mb-2">
              Slug <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="url-friendly-slug"
            />
            <p className="text-sm text-gray-500 mt-1">
              URL: /blog/{formData.slug || 'slug'}
            </p>
          </div>

          {/* Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <label className="block text-sm font-medium mb-2">
              Tóm tắt <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.summary}
              onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập tóm tắt ngắn gọn về bài viết..."
            />
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <label className="block text-sm font-medium mb-2">
              Nội dung (Markdown) <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              required
              rows={20}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              placeholder="# Tiêu đề&#10;&#10;Nội dung bài viết với **Markdown**..."
            />
            <p className="text-sm text-gray-500 mt-1">
              Hỗ trợ Markdown: **bold**, *italic*, # heading, - list, etc.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <label className="block text-sm font-medium mb-2">Trạng thái</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* Tags */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <label className="block text-sm font-medium mb-2">Tags</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="tag1, tag2, tag3"
            />
            <p className="text-sm text-gray-500 mt-1">
              Phân cách bằng dấu phẩy
            </p>
          </div>

          {/* Author */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <label className="block text-sm font-medium mb-2">Tác giả</label>
            <input
              type="text"
              value={formData.authorName}
              onChange={(e) => setFormData(prev => ({ ...prev, authorName: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tên tác giả"
            />
          </div>

          {/* Cover Image */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <label className="block text-sm font-medium mb-2">Cover Image URL</label>
            <input
              type="url"
              value={formData.coverImageUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, coverImageUrl: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://..."
            />
          </div>

          {/* Preview Button */}
          {formData.slug && (
            <Link
              href={`/blog/${formData.slug}`}
              target="_blank"
              className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Eye className="w-4 h-4" />
              Preview
            </Link>
          )}
        </div>
      </div>
    </form>
  );
}
