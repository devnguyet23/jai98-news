#!/bin/bash

# Script để test API endpoint POST /api/posts
# Sử dụng: ./test-api.sh

echo "Testing POST /api/posts endpoint..."
echo ""

curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test API Post",
    "summary": "Đây là bài viết test từ API",
    "content": "# Bài viết test\n\nĐây là nội dung bài viết được tạo từ API endpoint.\n\n## Tính năng\n\n- Tạo bài viết tự động\n- Hỗ trợ Markdown\n- Dễ dàng tích hợp với n8n",
    "tags": ["test", "api", "automation"],
    "date": "2024-01-25T10:00:00.000Z"
  }'

echo ""
echo ""
echo "Kiểm tra kết quả tại: http://localhost:3000/blog"
