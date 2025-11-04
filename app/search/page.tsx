'use client';

import { useState } from 'react';
import { InstantSearch, SearchBox, Hits, RefinementList, Configure, Stats } from 'react-instantsearch';
import { searchClient, POSTS_INDEX } from '@/lib/algolia/config';
import Link from 'next/link';
import { Calendar, Tag, User, ArrowLeft } from 'lucide-react';

// Custom Hit Component
function Hit({ hit }: { hit: any }) {
  return (
    <Link
      href={`/blog/${hit.slug}`}
      className="block p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all hover:-translate-y-1"
    >
      <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
        <span dangerouslySetInnerHTML={{ __html: hit._highlightResult?.title?.value || hit.title }} />
      </h2>
      
      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        <span dangerouslySetInnerHTML={{ __html: hit._highlightResult?.summary?.value || hit.summary }} />
      </p>
      
      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500 flex-wrap">
        {hit.authorName && (
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{hit.authorName}</span>
          </div>
        )}
        
        {hit.publishedAt && (
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(hit.publishedAt).toLocaleDateString('vi-VN')}</span>
          </div>
        )}
      </div>
      
      {hit.tags && hit.tags.length > 0 && (
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <Tag className="w-4 h-4 text-gray-500" />
          {hit.tags.slice(0, 3).map((tag: string) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}

// No Results Component
function NoResults() {
  return (
    <div className="text-center py-12">
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
        Không tìm thấy kết quả phù hợp
      </p>
      <p className="text-gray-500 dark:text-gray-500 text-sm">
        Thử tìm kiếm với từ khóa khác
      </p>
    </div>
  );
}

export default function SearchPage() {
  const [searchState, setSearchState] = useState<any>({});

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại trang chủ
        </Link>
        
        <h1 className="text-4xl font-bold mb-2">Tìm kiếm bài viết</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Tìm kiếm trong {POSTS_INDEX}
        </p>
      </div>

      <InstantSearch
        searchClient={searchClient}
        indexName={POSTS_INDEX}
        onStateChange={({ uiState, setUiState }) => {
          setSearchState(uiState);
          setUiState(uiState);
        }}
      >
        <Configure hitsPerPage={12} />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 sticky top-4">
              <h3 className="font-bold mb-4">Lọc theo Tags</h3>
              <RefinementList
                attribute="tags"
                limit={10}
                showMore={true}
                showMoreLimit={20}
                classNames={{
                  list: 'space-y-2',
                  item: 'flex items-center gap-2',
                  label: 'flex items-center gap-2 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400',
                  checkbox: 'w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500',
                  labelText: 'text-sm',
                  count: 'text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded',
                  showMore: 'text-sm text-blue-600 hover:underline mt-2',
                }}
              />
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-bold mb-4">Lọc theo Tác giả</h3>
                <RefinementList
                  attribute="authorName"
                  limit={5}
                  classNames={{
                    list: 'space-y-2',
                    item: 'flex items-center gap-2',
                    label: 'flex items-center gap-2 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400',
                    checkbox: 'w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500',
                    labelText: 'text-sm',
                    count: 'text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search Box */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <SearchBox
                placeholder="Tìm kiếm bài viết..."
                classNames={{
                  root: 'w-full',
                  form: 'relative',
                  input: 'w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg',
                  submit: 'absolute right-3 top-1/2 -translate-y-1/2',
                  reset: 'absolute right-12 top-1/2 -translate-y-1/2',
                  submitIcon: 'w-5 h-5 text-blue-600',
                  resetIcon: 'w-5 h-5 text-gray-400',
                }}
                autoFocus
              />
              
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                <Stats
                  classNames={{
                    root: '',
                    text: 'text-sm',
                  }}
                  translations={{
                    rootElementText({ nbHits, processingTimeMS }) {
                      return `Tìm thấy ${nbHits.toLocaleString()} kết quả trong ${processingTimeMS}ms`;
                    },
                  }}
                />
              </div>
            </div>

            {/* Results */}
            <div>
              <Hits
                hitComponent={Hit}
                classNames={{
                  root: '',
                  list: 'grid grid-cols-1 md:grid-cols-2 gap-6',
                  item: '',
                }}
              />
              
              <div className="mt-8">
                <NoResults />
              </div>
            </div>
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}
