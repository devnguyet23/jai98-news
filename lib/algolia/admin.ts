import { algoliasearch } from 'algoliasearch';
import { Post } from '@/types/firestore';
import { AlgoliaPost } from '@/types/firestore';

/**
 * Algolia admin client (server-side only)
 */
const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!;
const adminKey = process.env.ALGOLIA_ADMIN_KEY!;

const client = algoliasearch(appId, adminKey);
const INDEX_NAME = 'posts_production';

/**
 * Convert Firestore Post to Algolia Post
 */
function postToAlgoliaObject(post: Post): AlgoliaPost {
  // Handle both Firestore Timestamp and Date objects
  let publishedAtTimestamp: number;
  
  if (post.publishedAt) {
    // Check if it's a Firestore Timestamp
    if (typeof (post.publishedAt as any).toMillis === 'function') {
      publishedAtTimestamp = (post.publishedAt as any).toMillis();
    } 
    // Check if it's a Date object
    else if (post.publishedAt instanceof Date) {
      publishedAtTimestamp = post.publishedAt.getTime();
    }
    // Check if it's already a timestamp or ISO string
    else if (typeof post.publishedAt === 'number') {
      publishedAtTimestamp = post.publishedAt;
    }
    else if (typeof post.publishedAt === 'string') {
      publishedAtTimestamp = new Date(post.publishedAt).getTime();
    }
    else {
      publishedAtTimestamp = Date.now();
    }
  } else {
    publishedAtTimestamp = Date.now();
  }

  return {
    objectID: post.id,
    title: post.title,
    slug: post.slug,
    summary: post.summary,
    content: post.content,
    tags: post.tags,
    authorName: post.authorName,
    publishedAt: publishedAtTimestamp,
  };
}

/**
 * Đồng bộ post lên Algolia
 */
export async function syncPostToAlgolia(post: Post): Promise<void> {
  try {
    // Chỉ sync posts đã published
    if (post.status !== 'published') {
      console.log(`[Algolia] Skipping draft post: ${post.id}`);
      return;
    }

    const algoliaObject = postToAlgoliaObject(post);
    await client.saveObject({
      indexName: INDEX_NAME,
      body: algoliaObject,
    });
    console.log(`[Algolia] Synced post: ${post.id}`);
  } catch (error) {
    console.error(`[Algolia] Error syncing post ${post.id}:`, error);
    throw error;
  }
}

/**
 * Xóa post khỏi Algolia
 */
export async function deletePostFromAlgolia(postId: string): Promise<void> {
  try {
    await client.deleteObject({
      indexName: INDEX_NAME,
      objectID: postId,
    });
    console.log(`[Algolia] Deleted post: ${postId}`);
  } catch (error) {
    console.error(`[Algolia] Error deleting post ${postId}:`, error);
    throw error;
  }
}

/**
 * Đồng bộ nhiều posts lên Algolia
 */
export async function syncMultiplePostsToAlgolia(posts: Post[]): Promise<void> {
  try {
    const publishedPosts = posts.filter((post) => post.status === 'published');
    const algoliaObjects = publishedPosts.map(postToAlgoliaObject);
    
    await client.saveObjects({
      indexName: INDEX_NAME,
      objects: algoliaObjects as any,
    });
    console.log(`[Algolia] Synced ${algoliaObjects.length} posts`);
  } catch (error) {
    console.error('[Algolia] Error syncing multiple posts:', error);
    throw error;
  }
}

/**
 * Xóa tất cả records trong index (use with caution!)
 */
export async function clearAlgoliaIndex(): Promise<void> {
  try {
    await client.clearObjects({
      indexName: INDEX_NAME,
    });
    console.log('[Algolia] Cleared all objects from index');
  } catch (error) {
    console.error('[Algolia] Error clearing index:', error);
    throw error;
  }
}

/**
 * Configure index settings
 */
export async function configureAlgoliaIndex(): Promise<void> {
  try {
    await client.setSettings({
      indexName: INDEX_NAME,
      indexSettings: {
        searchableAttributes: [
          'title',
          'summary',
          'content',
          'tags',
        ],
        attributesForFaceting: [
          'tags',
          'authorName',
        ],
        customRanking: [
          'desc(publishedAt)',
        ],
        highlightPreTag: '<mark>',
        highlightPostTag: '</mark>',
      },
    });
    console.log('[Algolia] Index settings configured');
  } catch (error) {
    console.error('[Algolia] Error configuring index:', error);
    throw error;
  }
}
