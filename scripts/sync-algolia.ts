/**
 * Script để sync tất cả posts lên Algolia
 * Chạy: npx tsx -r dotenv/config scripts/sync-algolia.ts
 */

import { adminDb } from '../lib/firebase/admin';
import { syncMultiplePostsToAlgolia, configureAlgoliaIndex } from '../lib/algolia/admin';

async function syncAllPostsToAlgolia() {
  console.log('🔄 Bắt đầu sync posts lên Algolia...\n');

  try {
    // 1. Configure Algolia index settings
    console.log('⚙️  Configuring Algolia index settings...');
    await configureAlgoliaIndex();
    console.log('✅ Index settings configured\n');

    // 2. Fetch all published posts from Firestore
    console.log('📥 Fetching published posts from Firestore...');
    const snapshot = await adminDb
      .collection('posts')
      .where('status', '==', 'published')
      .get();

    if (snapshot.empty) {
      console.log('📭 No published posts found.');
      return;
    }

    const posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as any[];

    console.log(`✅ Found ${posts.length} published posts\n`);

    // 3. Sync to Algolia
    console.log('🚀 Syncing to Algolia...');
    await syncMultiplePostsToAlgolia(posts);
    console.log(`✅ Successfully synced ${posts.length} posts to Algolia\n`);

    // 4. Summary
    console.log('='.repeat(60));
    console.log('\n📊 SYNC SUMMARY:\n');
    console.log(`✅ Total posts synced: ${posts.length}`);
    console.log(`📝 Posts:`);
    posts.forEach((post, index) => {
      console.log(`   ${index + 1}. ${post.title}`);
    });

    console.log('\n🎉 Sync completed successfully!');
    console.log('\n💡 Next steps:');
    console.log('   - Test search: npm run test:algolia');
    console.log('   - Visit: http://localhost:3000/search');

  } catch (error) {
    console.error('\n❌ Error syncing posts:', error);
    process.exit(1);
  }
}

syncAllPostsToAlgolia();
