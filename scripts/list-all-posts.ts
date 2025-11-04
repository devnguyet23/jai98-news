/**
 * Script để liệt kê tất cả posts trong Firestore (không filter theo status)
 * Chạy: npx tsx -r dotenv/config scripts/list-all-posts.ts
 */

import { adminDb } from '../lib/firebase/admin';

async function listAllPosts() {
  try {
    console.log('🔍 Đang lấy tất cả posts từ Firestore...\n');
    
    // Lấy tất cả posts (không filter theo status)
    const snapshot = await adminDb
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .limit(20)
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
      console.log(`   Author: ${data.authorName || data.authorId || 'N/A'}`);
      console.log(`   Tags: ${data.tags?.join(', ') || 'None'}`);
      console.log(`   Created: ${data.createdAt?.toDate().toISOString() || 'N/A'}`);
      console.log(`   Updated: ${data.updatedAt?.toDate().toISOString() || 'N/A'}`);
      console.log(`   Published: ${data.publishedAt?.toDate().toISOString() || 'N/A'}`);
      console.log('   ' + '='.repeat(50));
    });
    
  } catch (error) {
    console.error('❌ Lỗi khi lấy posts:', error);
  }
}

listAllPosts();
