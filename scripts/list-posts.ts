/**
 * Script để liệt kê các posts trong Firestore
 * Chạy: npx tsx -r dotenv/config scripts/list-posts.ts
 */

import { adminDb } from '../lib/firebase/admin';

async function listPosts() {
  try {
    console.log('🔍 Đang lấy danh sách posts từ Firestore...\n');
    
    // Lấy 10 posts mới nhất
    const snapshot = await adminDb
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .limit(10)
      .get();
    
    if (snapshot.empty) {
      console.log('📭 Không có posts nào trong database.');
      return;
    }
    
    console.log(`📊 Tìm thấy ${snapshot.size} posts:\n`);
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      console.log(`📝 Post ID: ${doc.id}`);
      console.log(`   Title: ${data.title}`);
      console.log(`   Slug: ${data.slug}`);
      console.log(`   Status: ${data.status}`);
      console.log(`   Author: ${data.authorName} (${data.authorId})`);
      console.log(`   Tags: ${data.tags?.join(', ') || 'None'}`);
      console.log(`   Created: ${data.createdAt?.toDate().toISOString()}`);
      console.log(`   Updated: ${data.updatedAt?.toDate().toISOString()}`);
      console.log('   ' + '='.repeat(50));
    });
    
  } catch (error) {
    console.error('❌ Lỗi khi lấy posts:', error);
  }
}

listPosts();
