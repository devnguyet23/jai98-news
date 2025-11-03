---
title: "Bắt đầu với Next.js 15 - Hướng dẫn toàn diện"
summary: "Tìm hiểu cách xây dựng ứng dụng web hiện đại với Next.js 15 và App Router. Hướng dẫn từ cơ bản đến nâng cao."
date: "2024-01-20T14:30:00.000Z"
tags: ["nextjs", "react", "web development", "tutorial"]
---

# Bắt đầu với Next.js 15 - Hướng dẫn toàn diện

Next.js là một framework React mạnh mẽ giúp bạn xây dựng ứng dụng web full-stack. Trong bài viết này, chúng ta sẽ tìm hiểu các tính năng chính của Next.js 15.

## Tại sao chọn Next.js?

Next.js mang lại nhiều lợi ích:

### 1. Server-Side Rendering (SSR)
- Cải thiện SEO
- Tăng tốc độ tải trang ban đầu
- Trải nghiệm người dùng tốt hơn

### 2. App Router mới
```typescript
// app/page.tsx
export default function Home() {
  return <h1>Welcome to Next.js 15!</h1>
}
```

### 3. API Routes
Tạo backend API ngay trong dự án Next.js:

```typescript
// app/api/hello/route.ts
export async function GET() {
  return Response.json({ message: 'Hello World' })
}
```

## Cài đặt Next.js

Tạo dự án mới với lệnh:

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

## Cấu trúc thư mục

```
my-app/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── api/           # API routes
├── components/        # React components
├── public/           # Static files
└── package.json
```

## Server Components vs Client Components

### Server Components (mặc định)
```typescript
// app/posts/page.tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts')
  return res.json()
}

export default async function PostsPage() {
  const posts = await getPosts()
  return <div>{/* Render posts */}</div>
}
```

### Client Components
```typescript
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

## Data Fetching

Next.js 15 hỗ trợ nhiều cách fetch data:

### 1. Server-side
```typescript
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    cache: 'no-store' // Luôn fetch mới
  })
  return res.json()
}
```

### 2. Static Generation
```typescript
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 } // Revalidate mỗi giờ
  })
  return res.json()
}
```

## Routing

### Dynamic Routes
```typescript
// app/blog/[slug]/page.tsx
export default function BlogPost({ params }: { params: { slug: string } }) {
  return <h1>Post: {params.slug}</h1>
}
```

### Route Groups
```
app/
├── (marketing)/
│   ├── about/
│   └── contact/
└── (shop)/
    ├── products/
    └── cart/
```

## Styling với Tailwind CSS

Next.js tích hợp tốt với Tailwind:

```typescript
export default function Button() {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      Click me
    </button>
  )
}
```

## Metadata và SEO

```typescript
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Page',
  description: 'Page description',
  openGraph: {
    title: 'My Page',
    description: 'Page description',
  },
}
```

## Deployment

Deploy lên Vercel rất đơn giản:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## Kết luận

Next.js 15 là một framework tuyệt vời để xây dựng ứng dụng web hiện đại. Với App Router, Server Components, và nhiều tính năng mạnh mẽ khác, bạn có thể tạo ra các ứng dụng nhanh, SEO-friendly và dễ maintain.

Hãy thử nghiệm và khám phá thêm các tính năng của Next.js nhé!

## Tài liệu tham khảo

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Vercel Platform](https://vercel.com)

---

*Happy coding! 🚀*
