/**
 * Script test đơn giản để kiểm tra nhanh API endpoints
 * Chạy: npx tsx -r dotenv/config scripts/test-api-simple.ts
 */

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

async function testAPI() {
  console.log('🔍 Kiểm tra kết nối API...\n');
  console.log(`📍 Base URL: ${BASE_URL}\n`);

  try {
    // Test GET /api/firebase/posts
    console.log('1️⃣  Testing GET /api/firebase/posts...');
    const response = await fetch(`${BASE_URL}/api/firebase/posts?limit=5`);
    const data = await response.json();

    if (response.ok) {
      console.log('✅ API hoạt động!');
      const posts = data.data?.posts || data.posts || [];
      console.log(`   📊 Tìm thấy ${posts.length} posts`);
      
      if (posts.length > 0) {
        console.log('\n📝 Sample post:');
        const post = posts[0];
        console.log(`   - ID: ${post.id}`);
        console.log(`   - Title: ${post.title}`);
        console.log(`   - Status: ${post.status}`);
        console.log(`   - Author: ${post.authorName}`);
      } else {
        console.log('   ℹ️  Chưa có posts nào trong database');
      }
    } else {
      console.log('❌ API error:', data.error || 'Unknown error');
      if (data.message) {
        console.log(`   Message: ${data.message}`);
      }
    }

    console.log('\n✨ Test hoàn tất!');
  } catch (error) {
    console.error('❌ Lỗi kết nối:', error instanceof Error ? error.message : error);
    console.log('\n💡 Gợi ý:');
    console.log('   - Đảm bảo dev server đang chạy: npm run dev');
    console.log('   - Kiểm tra BASE_URL trong .env');
    console.log('   - Kiểm tra Firebase credentials');
  }
}

testAPI();
