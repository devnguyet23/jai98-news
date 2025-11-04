import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  Timestamp,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { db } from './config';
import { Post, CreatePostData, UpdatePostData } from '@/types/firestore';

const POSTS_COLLECTION = 'posts';

/**
 * Tạo bài viết mới
 */
export async function createPost(data: CreatePostData): Promise<string> {
  const now = Timestamp.now();
  
  const postData = {
    ...data,
    createdAt: now,
    updatedAt: now,
    views: 0,
    likes: 0,
    publishedAt: data.status === 'published' ? now : null,
  };

  const docRef = await addDoc(collection(db, POSTS_COLLECTION), postData);
  return docRef.id;
}

/**
 * Lấy bài viết theo ID
 */
export async function getPostById(id: string): Promise<Post | null> {
  const docRef = doc(db, POSTS_COLLECTION, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  return {
    id: docSnap.id,
    ...docSnap.data(),
  } as Post;
}

/**
 * Lấy bài viết theo slug
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const q = query(
    collection(db, POSTS_COLLECTION),
    where('slug', '==', slug),
    where('status', '==', 'published'),
    limit(1)
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }

  const doc = querySnapshot.docs[0];
  return {
    id: doc.id,
    ...doc.data(),
  } as Post;
}

/**
 * Lấy danh sách bài viết đã published (có pagination)
 */
export async function getPublishedPosts(
  limitCount: number = 10,
  lastDoc?: QueryDocumentSnapshot
): Promise<{ posts: Post[]; lastDoc: QueryDocumentSnapshot | null }> {
  let q = query(
    collection(db, POSTS_COLLECTION),
    where('status', '==', 'published'),
    orderBy('publishedAt', 'desc'),
    limit(limitCount)
  );

  if (lastDoc) {
    q = query(q, startAfter(lastDoc));
  }

  const querySnapshot = await getDocs(q);
  const posts = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Post[];

  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1] || null;

  return { posts, lastDoc: lastVisible };
}

/**
 * Lấy bài viết theo tag
 */
export async function getPostsByTag(
  tag: string,
  limitCount: number = 10
): Promise<Post[]> {
  const q = query(
    collection(db, POSTS_COLLECTION),
    where('tags', 'array-contains', tag),
    where('status', '==', 'published'),
    orderBy('publishedAt', 'desc'),
    limit(limitCount)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Post[];
}

/**
 * Lấy bài viết theo author
 */
export async function getPostsByAuthor(
  authorId: string,
  limitCount: number = 10
): Promise<Post[]> {
  const q = query(
    collection(db, POSTS_COLLECTION),
    where('authorId', '==', authorId),
    where('status', '==', 'published'),
    orderBy('publishedAt', 'desc'),
    limit(limitCount)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Post[];
}

/**
 * Cập nhật bài viết
 */
export async function updatePost(
  id: string,
  data: UpdatePostData
): Promise<void> {
  const docRef = doc(db, POSTS_COLLECTION, id);
  
  const updateData: any = {
    ...data,
    updatedAt: Timestamp.now(),
  };

  // Nếu status chuyển sang published, set publishedAt
  if (data.status === 'published') {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() && !docSnap.data().publishedAt) {
      updateData.publishedAt = Timestamp.now();
    }
  }

  await updateDoc(docRef, updateData);
}

/**
 * Xóa bài viết
 */
export async function deletePost(id: string): Promise<void> {
  const docRef = doc(db, POSTS_COLLECTION, id);
  await deleteDoc(docRef);
}

/**
 * Tăng view count
 */
export async function incrementViews(id: string): Promise<void> {
  const docRef = doc(db, POSTS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    const currentViews = docSnap.data().views || 0;
    await updateDoc(docRef, {
      views: currentViews + 1,
    });
  }
}

/**
 * Tăng like count
 */
export async function incrementLikes(id: string): Promise<void> {
  const docRef = doc(db, POSTS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    const currentLikes = docSnap.data().likes || 0;
    await updateDoc(docRef, {
      likes: currentLikes + 1,
    });
  }
}

/**
 * Lấy tất cả tags
 */
export async function getAllTags(): Promise<string[]> {
  const querySnapshot = await getDocs(
    query(collection(db, POSTS_COLLECTION), where('status', '==', 'published'))
  );

  const tagsSet = new Set<string>();
  querySnapshot.docs.forEach((doc) => {
    const post = doc.data() as Post;
    post.tags.forEach((tag) => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
}
