/**
 * Script kiểm tra toàn diện các API endpoints của Firebase
 * Chạy: npx tsx -r dotenv/config scripts/test-api-endpoints.ts
 */

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

interface TestResult {
  name: string;
  status: 'passed' | 'failed' | 'skipped';
  message: string;
  duration?: number;
}

const results: TestResult[] = [];
let createdPostId: string | null = null;

// Helper function để log kết quả
function logResult(result: TestResult) {
  const icon = result.status === 'passed' ? '✅' : result.status === 'failed' ? '❌' : '⏭️';
  console.log(`${icon} ${result.name}: ${result.message}`);
  if (result.duration) {
    console.log(`   ⏱️  Duration: ${result.duration}ms`);
  }
  results.push(result);
}

// Helper function để thực hiện HTTP request
async function makeRequest(
  method: string,
  endpoint: string,
  body?: any
): Promise<{ status: number; data: any; error?: string }> {
  const url = `${BASE_URL}${endpoint}`;
  const startTime = Date.now();

  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const data = await response.json();
    const duration = Date.now() - startTime;

    return {
      status: response.status,
      data,
      error: !response.ok ? data.error || 'Unknown error' : undefined,
    };
  } catch (error) {
    return {
      status: 500,
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Test 1: POST /api/firebase/posts - Tạo bài viết mới
async function testCreatePost() {
  console.log('\n📝 Test 1: Tạo bài viết mới (POST /api/firebase/posts)');

  const newPost = {
    title: 'Test Post - ' + new Date().toISOString(),
    slug: 'test-post-' + Date.now(),
    summary: 'Đây là bài viết test được tạo tự động',
    content: '# Test Content\n\nĐây là nội dung test với **Markdown**.',
    authorId: 'test-author-id',
    authorName: 'Test Author',
    tags: ['test', 'automation'],
    status: 'draft',
  };

  const startTime = Date.now();
  const result = await makeRequest('POST', '/api/firebase/posts', newPost);
  const duration = Date.now() - startTime;

  if (result.status === 201 && result.data.data?.id) {
    createdPostId = result.data.data.id;
    logResult({
      name: 'Create Post',
      status: 'passed',
      message: `Tạo thành công post với ID: ${createdPostId}`,
      duration,
    });
  } else {
    logResult({
      name: 'Create Post',
      status: 'failed',
      message: `Lỗi: ${result.error || result.data.message || 'Unknown error'}`,
      duration,
    });
  }
}

// Test 2: GET /api/firebase/posts - Lấy danh sách posts
async function testGetPosts() {
  console.log('\n📋 Test 2: Lấy danh sách posts (GET /api/firebase/posts)');

  const startTime = Date.now();
  const result = await makeRequest('GET', '/api/firebase/posts?limit=10');
  const duration = Date.now() - startTime;

  const posts = result.data.data?.posts || result.data.posts || [];
  if (result.status === 200 && Array.isArray(posts)) {
    logResult({
      name: 'Get Posts List',
      status: 'passed',
      message: `Lấy thành công ${posts.length} posts`,
      duration,
    });
  } else {
    logResult({
      name: 'Get Posts List',
      status: 'failed',
      message: `Lỗi: ${result.error || result.data.message || 'Unknown error'}`,
      duration,
    });
  }
}

// Test 3: GET /api/firebase/posts/[id] - Lấy chi tiết post
async function testGetPostById() {
  console.log('\n🔍 Test 3: Lấy chi tiết post (GET /api/firebase/posts/[id])');

  if (!createdPostId) {
    logResult({
      name: 'Get Post By ID',
      status: 'skipped',
      message: 'Bỏ qua vì không có post ID từ test trước',
    });
    return;
  }

  const startTime = Date.now();
  const result = await makeRequest('GET', `/api/firebase/posts/${createdPostId}`);
  const duration = Date.now() - startTime;

  const post = result.data.data || result.data;
  if (result.status === 200 && post.id === createdPostId) {
    logResult({
      name: 'Get Post By ID',
      status: 'passed',
      message: `Lấy thành công post: ${post.title}`,
      duration,
    });
  } else {
    logResult({
      name: 'Get Post By ID',
      status: 'failed',
      message: `Lỗi: ${result.error || result.data.message || 'Unknown error'}`,
      duration,
    });
  }
}

// Test 4: PUT /api/firebase/posts/[id] - Cập nhật post
async function testUpdatePost() {
  console.log('\n✏️  Test 4: Cập nhật post (PUT /api/firebase/posts/[id])');

  if (!createdPostId) {
    logResult({
      name: 'Update Post',
      status: 'skipped',
      message: 'Bỏ qua vì không có post ID từ test trước',
    });
    return;
  }

  const updateData = {
    title: 'Updated Test Post - ' + new Date().toISOString(),
    summary: 'Bài viết đã được cập nhật',
    status: 'published',
  };

  const startTime = Date.now();
  const result = await makeRequest('PUT', `/api/firebase/posts/${createdPostId}`, updateData);
  const duration = Date.now() - startTime;

  const post = result.data.data || result.data;
  if (result.status === 200 && post.id === createdPostId) {
    logResult({
      name: 'Update Post',
      status: 'passed',
      message: `Cập nhật thành công post: ${post.title}`,
      duration,
    });
  } else {
    logResult({
      name: 'Update Post',
      status: 'failed',
      message: `Lỗi: ${result.error || result.data.message || 'Unknown error'}`,
      duration,
    });
  }
}

// Test 5: DELETE /api/firebase/posts/[id] - Xóa post
async function testDeletePost() {
  console.log('\n🗑️  Test 5: Xóa post (DELETE /api/firebase/posts/[id])');

  if (!createdPostId) {
    logResult({
      name: 'Delete Post',
      status: 'skipped',
      message: 'Bỏ qua vì không có post ID từ test trước',
    });
    return;
  }

  const startTime = Date.now();
  const result = await makeRequest('DELETE', `/api/firebase/posts/${createdPostId}`);
  const duration = Date.now() - startTime;

  if (result.status === 200) {
    logResult({
      name: 'Delete Post',
      status: 'passed',
      message: `Xóa thành công post ID: ${createdPostId}`,
      duration,
    });
  } else {
    logResult({
      name: 'Delete Post',
      status: 'failed',
      message: `Lỗi: ${result.error || 'Unknown error'}`,
      duration,
    });
  }
}

// Test 6: Pagination - Kiểm tra phân trang
async function testPagination() {
  console.log('\n📄 Test 6: Kiểm tra phân trang (GET /api/firebase/posts?limit=5)');

  const startTime = Date.now();
  const result = await makeRequest('GET', '/api/firebase/posts?limit=5');
  const duration = Date.now() - startTime;

  const posts = result.data.data?.posts || result.data.posts || [];
  if (result.status === 200 && posts.length <= 5) {
    logResult({
      name: 'Pagination',
      status: 'passed',
      message: `Pagination hoạt động đúng, trả về ${posts.length} posts`,
      duration,
    });
  } else {
    logResult({
      name: 'Pagination',
      status: 'failed',
      message: `Lỗi: Pagination không hoạt động đúng`,
      duration,
    });
  }
}

// Test 7: Filter by status
async function testFilterByStatus() {
  console.log('\n🔍 Test 7: Lọc theo status (GET /api/firebase/posts?status=published)');

  const startTime = Date.now();
  const result = await makeRequest('GET', '/api/firebase/posts?status=published&limit=10');
  const duration = Date.now() - startTime;

  const posts = result.data.data?.posts || result.data.posts || [];
  if (result.status === 200) {
    const allPublished = posts.every((post: any) => post.status === 'published');
    if (allPublished || posts.length === 0) {
      logResult({
        name: 'Filter By Status',
        status: 'passed',
        message: `Filter hoạt động đúng, tìm thấy ${posts.length} published posts`,
        duration,
      });
    } else {
      logResult({
        name: 'Filter By Status',
        status: 'failed',
        message: 'Filter không hoạt động đúng, có posts không phải published',
        duration,
      });
    }
  } else {
    logResult({
      name: 'Filter By Status',
      status: 'failed',
      message: `Lỗi: ${result.error || result.data.message || 'Unknown error'}`,
      duration,
    });
  }
}

// Test 8: Validation - Kiểm tra validation
async function testValidation() {
  console.log('\n✔️  Test 8: Kiểm tra validation (POST với dữ liệu không hợp lệ)');

  const invalidPost = {
    title: '', // Title rỗng - không hợp lệ
    slug: 'test',
  };

  const startTime = Date.now();
  const result = await makeRequest('POST', '/api/firebase/posts', invalidPost);
  const duration = Date.now() - startTime;

  if (result.status === 400) {
    logResult({
      name: 'Validation',
      status: 'passed',
      message: 'Validation hoạt động đúng, từ chối dữ liệu không hợp lệ',
      duration,
    });
  } else {
    logResult({
      name: 'Validation',
      status: 'failed',
      message: 'Validation không hoạt động, chấp nhận dữ liệu không hợp lệ',
      duration,
    });
  }
}

// Main test runner
async function runAllTests() {
  console.log('🚀 Bắt đầu kiểm tra API endpoints...\n');
  console.log(`📍 Base URL: ${BASE_URL}\n`);
  console.log('=' .repeat(60));

  try {
    // Chạy các test theo thứ tự
    await testCreatePost();
    await testGetPosts();
    await testGetPostById();
    await testUpdatePost();
    await testPagination();
    await testFilterByStatus();
    await testValidation();
    await testDeletePost(); // Xóa cuối cùng để cleanup

    // Tổng kết
    console.log('\n' + '='.repeat(60));
    console.log('\n📊 KẾT QUẢ TỔNG HỢP:\n');

    const passed = results.filter((r) => r.status === 'passed').length;
    const failed = results.filter((r) => r.status === 'failed').length;
    const skipped = results.filter((r) => r.status === 'skipped').length;

    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`⏭️  Skipped: ${skipped}`);
    console.log(`📝 Total: ${results.length}`);

    const successRate = ((passed / (passed + failed)) * 100).toFixed(2);
    console.log(`\n🎯 Success Rate: ${successRate}%`);

    if (failed > 0) {
      console.log('\n⚠️  Có lỗi xảy ra. Vui lòng kiểm tra chi tiết ở trên.');
      process.exit(1);
    } else {
      console.log('\n🎉 Tất cả tests đều passed!');
      process.exit(0);
    }
  } catch (error) {
    console.error('\n❌ Lỗi khi chạy tests:', error);
    process.exit(1);
  }
}

// Chạy tests
runAllTests();
