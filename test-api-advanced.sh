#!/bin/bash

# Script test API endpoint POST /api/posts với nhiều test cases
# Sử dụng: ./test-api-advanced.sh

API_URL="http://localhost:3000/api/posts"

echo "🧪 Testing POST /api/posts endpoint"
echo "===================================="
echo ""

# Test 1: Tạo bài viết thành công với đầy đủ thông tin
echo "📝 Test 1: Tạo bài viết đầy đủ thông tin"
echo "----------------------------------------"
curl -X POST $API_URL \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tổng hợp xu hướng AI 2025",
    "slug": "tong-hop-xu-huong-ai-2025",
    "date": "2025-11-03",
    "tags": ["AI", "Technology", "Trends"],
    "summary": "Khám phá những xu hướng AI hàng đầu trong năm 2025",
    "content": "# Tổng hợp xu hướng AI 2025\n\nAI đang thay đổi thế giới với tốc độ chưa từng có...\n\n## 1. Generative AI\n\nCông nghệ AI tạo sinh đang bùng nổ.\n\n## 2. AI Agents\n\nCác AI agent tự động hóa công việc.\n\n## Kết luận\n\nTương lai của AI rất hứa hẹn!"
  }'
echo -e "\n\n"

# Test 2: Tạo bài viết tối thiểu (chỉ title và content)
echo "📝 Test 2: Tạo bài viết tối thiểu"
echo "----------------------------------------"
curl -X POST $API_URL \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Bài viết test đơn giản",
    "content": "# Nội dung test\n\nĐây là bài viết test với thông tin tối thiểu."
  }'
echo -e "\n\n"

# Test 3: Tạo bài viết tiếng Việt có dấu (test auto slug)
echo "📝 Test 3: Tạo bài viết tiếng Việt (auto slug)"
echo "----------------------------------------"
curl -X POST $API_URL \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Hướng dẫn học lập trình Next.js từ đầu",
    "tags": ["Next.js", "Tutorial", "Lập trình"],
    "content": "# Hướng dẫn học Next.js\n\nNext.js là framework React mạnh mẽ..."
  }'
echo -e "\n\n"

# Test 4: Validation error - thiếu title
echo "❌ Test 4: Validation error - thiếu title"
echo "----------------------------------------"
curl -X POST $API_URL \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Nội dung không có title"
  }'
echo -e "\n\n"

# Test 5: Validation error - thiếu content
echo "❌ Test 5: Validation error - thiếu content"
echo "----------------------------------------"
curl -X POST $API_URL \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Bài viết không có nội dung"
  }'
echo -e "\n\n"

# Test 6: Validation error - date format sai
echo "❌ Test 6: Validation error - date format sai"
echo "----------------------------------------"
curl -X POST $API_URL \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test date format",
    "date": "03/11/2025",
    "content": "Nội dung test"
  }'
echo -e "\n\n"

# Test 7: Validation error - cover URL không hợp lệ
echo "❌ Test 7: Validation error - cover URL không hợp lệ"
echo "----------------------------------------"
curl -X POST $API_URL \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test cover URL",
    "cover": "not-a-valid-url",
    "content": "Nội dung test"
  }'
echo -e "\n\n"

# Test 8: Validation error - slug format sai
echo "❌ Test 8: Validation error - slug format sai"
echo "----------------------------------------"
curl -X POST $API_URL \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test slug format",
    "slug": "Slug_Có_Ký_Tự_Đặc_Biệt",
    "content": "Nội dung test"
  }'
echo -e "\n\n"

# Test 9: Invalid JSON
echo "❌ Test 9: Invalid JSON format"
echo "----------------------------------------"
curl -X POST $API_URL \
  -H "Content-Type: application/json" \
  -d 'invalid json here'
echo -e "\n\n"

echo "✅ Testing completed!"
echo ""
echo "📂 Kiểm tra các file đã tạo trong thư mục: ./posts/"
echo "🌐 Xem bài viết tại: http://localhost:3000/blog"
