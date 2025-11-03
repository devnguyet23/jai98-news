# API Documentation - POST /api/posts

## Mô tả
API endpoint để tạo bài viết mới từ dữ liệu JSON và lưu vào thư mục `/posts` dưới dạng file Markdown.

## Endpoint
```
POST /api/posts
```

## Headers
```
Content-Type: application/json
```

## Request Body

### Schema
```typescript
{
  title: string;           // Bắt buộc - Tiêu đề bài viết
  slug?: string;           // Tùy chọn - URL slug (tự động tạo nếu không có)
  date?: string;           // Tùy chọn - Ngày đăng (YYYY-MM-DD, mặc định: hôm nay)
  tags?: string[];         // Tùy chọn - Danh sách tags
  content: string;         // Bắt buộc - Nội dung Markdown
  summary?: string;        // Tùy chọn - Tóm tắt bài viết
  cover?: string;          // Tùy chọn - URL ảnh cover
}
```

### Validation Rules

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `title` | string | ✅ Yes | Không được rỗng |
| `slug` | string | ❌ No | Chỉ chứa chữ thường, số, dấu gạch ngang. Tự động tạo từ title nếu không có |
| `date` | string | ❌ No | Format: YYYY-MM-DD. Mặc định: ngày hiện tại |
| `tags` | string[] | ❌ No | Mảng các string. Mặc định: [] |
| `content` | string | ✅ Yes | Không được rỗng. Hỗ trợ Markdown |
| `summary` | string | ❌ No | Tóm tắt ngắn gọn |
| `cover` | string | ❌ No | Phải là URL hợp lệ |

### Ví dụ Request

#### 1. Request đầy đủ
```json
{
  "title": "Tổng hợp xu hướng AI 2025",
  "slug": "tong-hop-xu-huong-ai-2025",
  "date": "2025-11-03",
  "tags": ["AI", "Technology", "Trends"],
  "summary": "Khám phá những xu hướng AI hàng đầu trong năm 2025",
  "cover": "https://example.com/ai-2025.jpg",
  "content": "# Tổng hợp xu hướng AI 2025\n\nAI đang thay đổi thế giới..."
}
```

#### 2. Request tối thiểu
```json
{
  "title": "Bài viết đơn giản",
  "content": "# Nội dung\n\nĐây là nội dung bài viết."
}
```

#### 3. Request tiếng Việt (auto slug)
```json
{
  "title": "Hướng dẫn học lập trình Next.js",
  "tags": ["Next.js", "Tutorial"],
  "content": "# Hướng dẫn\n\nNext.js là framework React mạnh mẽ..."
}
```
→ Slug tự động: `huong-dan-hoc-lap-trinh-nextjs`

## Response

### Success Response (201 Created)
```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "slug": "tong-hop-xu-huong-ai-2025",
    "file": "tong-hop-xu-huong-ai-2025.md",
    "path": "/posts/tong-hop-xu-huong-ai-2025.md",
    "url": "/blog/tong-hop-xu-huong-ai-2025",
    "title": "Tổng hợp xu hướng AI 2025",
    "date": "2025-11-03"
  },
  "duration": "15ms"
}
```

### Error Responses

#### 400 - Invalid JSON
```json
{
  "success": false,
  "error": "Invalid JSON format",
  "message": "Request body phải là JSON hợp lệ"
}
```

#### 400 - Validation Failed
```json
{
  "success": false,
  "error": "Validation failed",
  "message": "Dữ liệu đầu vào không hợp lệ",
  "details": [
    {
      "field": "title",
      "message": "Title không được để trống"
    },
    {
      "field": "content",
      "message": "Content không được để trống"
    }
  ]
}
```

#### 409 - File Already Exists
```json
{
  "success": false,
  "error": "File already exists",
  "message": "Bài viết với slug \"tong-hop-xu-huong-ai-2025\" đã tồn tại",
  "slug": "tong-hop-xu-huong-ai-2025"
}
```

#### 500 - Internal Server Error
```json
{
  "success": false,
  "error": "Internal server error",
  "message": "Đã xảy ra lỗi không mong muốn",
  "details": "Error message here",
  "duration": "10ms"
}
```

## File Output

Bài viết sẽ được lưu vào `/posts/{slug}.md` với format:

```markdown
---
title: "Tổng hợp xu hướng AI 2025"
date: "2025-11-03"
tags: ["AI", "Technology", "Trends"]
summary: "Khám phá những xu hướng AI hàng đầu trong năm 2025"
cover: "https://example.com/ai-2025.jpg"
---

# Tổng hợp xu hướng AI 2025

AI đang thay đổi thế giới...
```

## Testing

### Sử dụng cURL
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Post",
    "content": "# Test\n\nThis is a test post."
  }'
```

### Sử dụng test script
```bash
./test-api-advanced.sh
```

## Tích hợp với n8n

### HTTP Request Node Configuration

**Method:** POST  
**URL:** `https://your-domain.vercel.app/api/posts`  
**Authentication:** None (public API)  
**Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Body (JSON):**
```json
{
  "title": "{{ $json.title }}",
  "tags": {{ $json.tags }},
  "content": "{{ $json.content }}",
  "summary": "{{ $json.summary }}",
  "date": "{{ $now.format('YYYY-MM-DD') }}"
}
```

### Workflow Example

```
1. [Trigger] → Webhook hoặc Schedule
2. [ChatGPT] → Tạo nội dung bài viết
3. [HTTP Request] → POST /api/posts
4. [IF] → Kiểm tra success
5. [Notification] → Thông báo kết quả
```

## Logging

API tự động log các hoạt động vào console:

```
📝 [API] Creating post: { title, slug, date, tags, contentLength }
✅ [API] File created successfully: /path/to/file.md
✨ [API] Post created in 15ms
❌ [API] Validation failed: [errors]
⚠️  [API] File already exists: /path/to/file.md
```

## Security Notes

- ⚠️ API hiện tại là **public** (không có authentication)
- Chỉ sử dụng trong môi trường nội bộ hoặc với n8n
- Để thêm authentication, xem phần "Bảo mật API" trong README.md

## Rate Limiting

- Không có rate limiting mặc định
- Nên thêm rate limiting nếu expose ra internet
- Có thể sử dụng middleware hoặc Vercel Edge Config

## Troubleshooting

### Lỗi: "File already exists"
**Giải pháp:** Thay đổi slug hoặc xóa file cũ trong `/posts/`

### Lỗi: "Validation failed"
**Giải pháp:** Kiểm tra lại format của các trường theo schema

### Lỗi: "Failed to write file"
**Giải pháp:** Kiểm tra quyền ghi file trong thư mục `/posts/`

### Không thấy bài viết trên website
**Giải pháp:** Restart dev server để Next.js đọc lại file mới

## Changelog

### Version 1.0.0 (2025-11-03)
- ✅ Tạo endpoint POST /api/posts
- ✅ Validation với Zod
- ✅ Auto-generate slug từ tiếng Việt
- ✅ Logging chi tiết
- ✅ Error handling đầy đủ
- ✅ Support Front Matter metadata
- ✅ File conflict detection

## Support

Nếu gặp vấn đề, kiểm tra:
1. Console logs trong terminal
2. Network tab trong DevTools
3. File permissions trong `/posts/`
4. Next.js dev server đang chạy

---

**Made with ❤️ for n8n automation**
