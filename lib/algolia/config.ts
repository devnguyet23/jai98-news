import { liteClient as algoliasearch } from 'algoliasearch/lite';

/**
 * Algolia client configuration
 */
const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!;
const searchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!;

if (!appId || !searchKey) {
  console.warn('Algolia credentials not found. Search functionality will be disabled.');
}

/**
 * Algolia search client (client-side)
 */
export const searchClient = algoliasearch(appId, searchKey);

/**
 * Index name
 */
export const POSTS_INDEX = 'posts_production';

/**
 * Search configuration
 */
export const searchConfig = {
  hitsPerPage: 10,
  attributesToSnippet: ['content:20'],
  snippetEllipsisText: '...',
  highlightPreTag: '<mark>',
  highlightPostTag: '</mark>',
};
