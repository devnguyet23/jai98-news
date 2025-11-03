# Andy's Blog - Personal Website & Blog

Website blog cá nhân được xây dựng với Next.js 15, Tailwind CSS và MDX. Hỗ trợ dark/light mode và API để đăng bài tự động.

## 🚀 Tính năng

- ✅ **Next.js 15** với App Router
- ✅ **Tailwind CSS** cho styling hiện đại
- ✅ **MDX/Markdown** để viết bài
- ✅ **Dark/Light Mode** tự động
- ✅ **API Endpoint** để đăng bài tự động
- ✅ **TypeScript** cho type safety
- ✅ **Responsive Design** trên mọi thiết bị
- ✅ **SEO Optimized** với metadata

## 📦 Cài đặt

### 1. Clone hoặc tải dự án

```bash
cd jai98-news
```

### 2. Cài đặt dependencies

```bash
npm install
# hoặc
yarn install
# hoặc
pnpm install
```

### 3. Chạy development server

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem kết quả.

## 📝 Cách thêm bài viết

### Cách 1: Tạo file Markdown thủ công

Tạo file `.md` trong thư mục `posts/`:

```markdown
---
title: "Tiêu đề bài viết"
summary: "Tóm tắt ngắn gọn"
date: "2024-01-15T10:00:00.000Z"
tags: ["tag1", "tag2"]
cover: "https://example.com/image.jpg" # Optional
---

# Nội dung bài viết

Viết nội dung của bạn ở đây với Markdown...
```

### Cách 2: Sử dụng API Endpoint

Gửi POST request đến `/api/posts`:

```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tiêu đề bài viết",
    "summary": "Tóm tắt ngắn gọn",
    "content": "# Nội dung\n\nViết bằng Markdown...",
    "tags": ["tag1", "tag2"],
    "cover": "https://example.com/image.jpg"
  }'
```

**Response:**
```json
{
  "success": true,
  "slug": "tieu-de-bai-viet",
  "message": "Post created successfully"
}
```

### Cách 3: Tích hợp với n8n

Tạo workflow trong n8n để tự động đăng bài:

1. **Trigger**: Webhook hoặc Schedule
2. **HTTP Request Node**:
   - Method: POST
   - URL: `https://your-domain.vercel.app/api/posts`
   - Body: JSON với các trường title, summary, content, tags

## 🎨 Tùy chỉnh

### Thay đổi thông tin cá nhân

Chỉnh sửa file `app/page.tsx`:

```typescript
// Thay đổi tên, tagline, links
<h1>Xin chào, tôi là [Tên của bạn]</h1>
```

### Thay đổi avatar

Thay thế file `public/avatar.jpg` bằng ảnh của bạn.

### Thay đổi màu sắc

Chỉnh sửa `tailwind.config.ts` để thay đổi theme colors.

## 🚢 Deploy lên Vercel

### Cách 1: Deploy qua Vercel Dashboard

1. Push code lên GitHub
2. Truy cập [vercel.com](https://vercel.com)
3. Import repository
4. Click "Deploy"

### Cách 2: Deploy qua CLI

```bash
# Cài đặt Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy production
vercel --prod
```

### Environment Variables (nếu cần)

Không cần environment variables cho bản cơ bản. Nếu muốn thêm authentication cho API:

```env
API_SECRET_KEY=your-secret-key
```

## 📁 Cấu trúc dự án

```
jai98-news/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── posts/        # POST /api/posts
│   ├── blog/             # Blog pages
│   │   ├── [slug]/       # Dynamic blog post page
│   │   └── page.tsx      # Blog listing page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/            # React components
│   ├── header.tsx        # Header with navigation
│   ├── footer.tsx        # Footer
│   ├── theme-provider.tsx # Theme context
│   └── theme-toggle.tsx  # Dark/light toggle
├── lib/                   # Utilities
│   └── posts.ts          # Post management functions
├── posts/                 # Markdown blog posts
│   ├── welcome-to-my-blog.md
│   └── getting-started-with-nextjs.md
├── public/               # Static files
│   └── avatar.jpg        # Your avatar
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🔧 Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## 🌐 API Documentation

### POST /api/posts

Tạo bài viết mới với validation đầy đủ và logging chi tiết.

**Request Body:**
```typescript
{
  title: string;        // Required - Tiêu đề bài viết
  slug?: string;        // Optional - URL slug (auto-generate nếu không có)
  date?: string;        // Optional - Format: YYYY-MM-DD (mặc định: hôm nay)
  tags?: string[];      // Optional - Danh sách tags
  content: string;      // Required - Nội dung Markdown
  summary?: string;     // Optional - Tóm tắt
  cover?: string;       // Optional - URL ảnh cover (phải là URL hợp lệ)
}
```

**Success Response (201):**
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

**Error Response (400/409/500):**
```json
{
  "success": false,
  "error": "Validation failed",
  "message": "Dữ liệu đầu vào không hợp lệ",
  "details": [
    {
      "field": "title",
      "message": "Title không được để trống"
    }
  ]
}
```

**Xem chi tiết:** [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## 🔐 Bảo mật API (Tùy chọn)

Để bảo vệ API endpoint, thêm authentication:

```typescript
// app/api/posts/route.ts
export async function POST(request: NextRequest) {
  const apiKey = request.headers.get('x-api-key');
  
  if (apiKey !== process.env.API_SECRET_KEY) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  // ... rest of the code
}
```

## 📚 Tài liệu tham khảo

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [MDX](https://mdxjs.com)
- [Vercel Deployment](https://vercel.com/docs)

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Hãy tạo issue hoặc pull request.

## 📄 License

MIT License - Tự do sử dụng cho mục đích cá nhân và thương mại.

## 💬 Liên hệ

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourusername)
- Email: your.email@example.com

---

**Made with ❤️ by Andy**
