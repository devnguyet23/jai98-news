# Quick Start - API Endpoint

## 🚀 Sử dụng nhanh API /api/posts

### 1. Test cơ bản với cURL

```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Bài viết test",
    "content": "# Nội dung\n\nĐây là bài viết test."
  }'
```

### 2. Test đầy đủ với cURL

```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tổng hợp xu hướng AI 2025",
    "slug": "tong-hop-xu-huong-ai-2025",
    "date": "2025-11-03",
    "tags": ["AI", "Technology"],
    "summary": "Khám phá xu hướng AI 2025",
    "content": "# Tổng hợp xu hướng AI 2025\n\nAI đang thay đổi thế giới..."
  }'
```

### 3. Chạy test script

```bash
# Test đơn giản
./test-api.sh

# Test đầy đủ (9 test cases)
./test-api-advanced.sh
```

## 📋 Tích hợp với n8n

### Bước 1: Tạo HTTP Request Node

- **Method:** POST
- **URL:** `https://your-domain.vercel.app/api/posts`
- **Authentication:** None
- **Body Type:** JSON

### Bước 2: Cấu hình Body

```json
{
  "title": "{{ $json.title }}",
  "content": "{{ $json.content }}",
  "tags": {{ $json.tags }},
  "date": "{{ $now.format('YYYY-MM-DD') }}"
}
```

### Bước 3: Xử lý Response

```javascript
// Kiểm tra success
if ($json.success) {
  return {
    message: "Bài viết đã được tạo",
    url: $json.data.url,
    slug: $json.data.slug
  };
} else {
  throw new Error($json.message);
}
```

## 🔍 Kiểm tra kết quả

### 1. Xem file đã tạo
```bash
ls -la posts/
cat posts/test-api-voi-zod.md
```

### 2. Xem trên website
```
http://localhost:3000/blog
http://localhost:3000/blog/test-api-voi-zod
```

### 3. Xem logs trong terminal
```
📝 [API] Creating post: { title, slug, date, tags, contentLength }
✅ [API] File created successfully: /path/to/file.md
✨ [API] Post created in 15ms
```

## ⚠️ Lưu ý quan trọng

### Auto-generate Slug
Nếu không truyền `slug`, API sẽ tự động tạo từ `title`:
- Bỏ dấu tiếng Việt
- Chuyển thành chữ thường
- Thay space bằng dấu gạch ngang

**Ví dụ:**
```
"Hướng dẫn học Next.js" → "huong-dan-hoc-nextjs"
```

### Validation Errors
API sẽ trả về chi tiết lỗi nếu dữ liệu không hợp lệ:

```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "field": "title",
      "message": "Title không được để trống"
    }
  ]
}
```

### File Conflict
Nếu file đã tồn tại, API trả về HTTP 409:

```json
{
  "success": false,
  "error": "File already exists",
  "message": "Bài viết với slug \"test\" đã tồn tại"
}
```

## 📚 Tài liệu chi tiết

Xem [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) để biết:
- Schema validation đầy đủ
- Tất cả error codes
- Ví dụ tích hợp n8n
- Troubleshooting guide

## 🎯 Workflow n8n mẫu

```
┌─────────────┐
│  Schedule   │ Chạy mỗi ngày
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  ChatGPT    │ Tạo nội dung bài viết
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ HTTP Request│ POST /api/posts
└──────┬──────┘
       │
       ▼
┌─────────────┐
│     IF      │ Kiểm tra success
└──────┬──────┘
       │
       ├─ Success → Slack notification
       └─ Error   → Email alert
```

## 🐛 Debug

### Kiểm tra server logs
```bash
# Terminal đang chạy npm run dev
# Sẽ hiển thị:
📝 [API] Creating post: {...}
✅ [API] File created successfully
```

### Kiểm tra response
```bash
curl -v http://localhost:3000/api/posts ...
# -v để xem headers và status code
```

### Test validation
```bash
# Test thiếu title
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"content":"test"}'

# Test date format sai
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"test","date":"03/11/2025","content":"test"}'
```

---

**Happy Coding! 🚀**
