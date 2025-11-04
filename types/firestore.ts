import { Timestamp } from 'firebase/firestore';

/**
 * User roles trong hệ thống
 */
export type UserRole = 'admin' | 'editor' | 'viewer';

/**
 * Post status
 */
export type PostStatus = 'draft' | 'published' | 'archived';

/**
 * User document trong Firestore
 */
export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**
 * Post document trong Firestore
 */
export interface Post {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string; // Markdown content
  coverImageUrl?: string;
  authorId: string;
  authorName: string;
  authorPhotoURL?: string;
  tags: string[];
  status: PostStatus;
  publishedAt?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  views: number;
  likes: number;
}

/**
 * Comment document trong Firestore (optional)
 */
export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userPhotoURL?: string;
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**
 * Post data for creation (without auto-generated fields)
 */
export interface CreatePostData {
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImageUrl?: string;
  authorId: string;
  authorName: string;
  authorPhotoURL?: string;
  tags: string[];
  status: PostStatus;
}

/**
 * Post data for update
 */
export interface UpdatePostData {
  title?: string;
  slug?: string;
  summary?: string;
  content?: string;
  coverImageUrl?: string;
  tags?: string[];
  status?: PostStatus;
}

/**
 * Algolia search result
 */
export interface AlgoliaPost {
  objectID: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  tags: string[];
  authorName: string;
  publishedAt: number; // Unix timestamp
  _highlightResult?: {
    title?: { value: string };
    summary?: { value: string };
    content?: { value: string };
  };
}
