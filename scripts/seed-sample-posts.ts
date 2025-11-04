/**
 * Script để tạo nhiều posts mẫu trong Firestore
 * Chạy: npx tsx -r dotenv/config scripts/seed-sample-posts.ts
 */

import { adminDb } from '../lib/firebase/admin';
import { syncPostToAlgolia } from '../lib/algolia/admin';

interface SamplePost {
  title: string;
  slug: string;
  summary: string;
  content: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  authorId: string;
  authorName: string;
  coverImageUrl?: string;
}

const samplePosts: SamplePost[] = [
  {
    title: 'Giới thiệu về Next.js 15 - Framework React mới nhất',
    slug: 'gioi-thieu-nextjs-15',
    summary: 'Next.js 15 mang đến nhiều tính năng mới và cải tiến hiệu suất đáng kể cho các ứng dụng React.',
    content: `# Giới thiệu về Next.js 15

Next.js 15 là phiên bản mới nhất của framework React phổ biến, mang đến nhiều cải tiến về hiệu suất và trải nghiệm phát triển.

## Tính năng nổi bật

### 1. Server Components mặc định
Next.js 15 sử dụng React Server Components làm mặc định, giúp giảm kích thước bundle và tăng tốc độ tải trang.

### 2. Turbopack ổn định
Turbopack, công cụ build mới thay thế Webpack, giờ đã ổn định và nhanh hơn đáng kể.

### 3. Cải thiện Image Optimization
Component Image được tối ưu hóa tốt hơn với lazy loading thông minh.

## Kết luận
Next.js 15 là một bước tiến lớn cho cộng đồng React developers.`,
    tags: ['nextjs', 'react', 'javascript', 'web-development'],
    status: 'published',
    authorId: 'admin-001',
    authorName: 'Nguyễn Văn A',
  },
  {
    title: 'Firebase vs Supabase - So sánh chi tiết hai nền tảng Backend',
    slug: 'firebase-vs-supabase',
    summary: 'Phân tích chi tiết ưu nhược điểm của Firebase và Supabase để giúp bạn chọn nền tảng phù hợp.',
    content: `# Firebase vs Supabase

Cả Firebase và Supabase đều là các nền tảng Backend-as-a-Service (BaaS) phổ biến, nhưng có những điểm khác biệt quan trọng.

## Firebase

### Ưu điểm
- Hệ sinh thái hoàn chỉnh từ Google
- Realtime Database mạnh mẽ
- Authentication đa dạng
- Tích hợp tốt với các dịch vụ Google Cloud

### Nhược điểm
- Chi phí có thể cao khi scale
- Vendor lock-in
- Không phải open source

## Supabase

### Ưu điểm
- Open source
- Sử dụng PostgreSQL (SQL)
- Chi phí thấp hơn
- Self-hosting được

### Nhược điểm
- Cộng đồng nhỏ hơn Firebase
- Ít tính năng tích hợp sẵn

## Kết luận
Chọn Firebase nếu bạn cần hệ sinh thái hoàn chỉnh, chọn Supabase nếu ưu tiên open source và SQL.`,
    tags: ['firebase', 'supabase', 'backend', 'database'],
    status: 'published',
    authorId: 'admin-001',
    authorName: 'Nguyễn Văn A',
  },
  {
    title: 'TypeScript Best Practices 2025',
    slug: 'typescript-best-practices-2025',
    summary: 'Tổng hợp các best practices khi làm việc với TypeScript trong năm 2025.',
    content: `# TypeScript Best Practices 2025

TypeScript đã trở thành ngôn ngữ không thể thiếu trong phát triển web hiện đại.

## 1. Sử dụng Strict Mode

\`\`\`typescript
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
\`\`\`

## 2. Tận dụng Type Inference

Không cần khai báo type cho mọi thứ, TypeScript đủ thông minh để infer.

\`\`\`typescript
// Không cần: const name: string = "John"
const name = "John"; // TypeScript tự hiểu
\`\`\`

## 3. Sử dụng Union Types thay vì Enums

\`\`\`typescript
type Status = 'pending' | 'approved' | 'rejected';
\`\`\`

## 4. Tránh 'any' type

Sử dụng 'unknown' hoặc generics thay vì 'any'.

## Kết luận
TypeScript giúp code an toàn và dễ maintain hơn khi áp dụng đúng best practices.`,
    tags: ['typescript', 'javascript', 'programming', 'best-practices'],
    status: 'published',
    authorId: 'admin-002',
    authorName: 'Trần Thị B',
  },
  {
    title: 'Hướng dẫn sử dụng Tailwind CSS hiệu quả',
    slug: 'huong-dan-tailwind-css',
    summary: 'Tailwind CSS là utility-first CSS framework giúp xây dựng UI nhanh chóng và linh hoạt.',
    content: `# Hướng dẫn sử dụng Tailwind CSS

Tailwind CSS đã thay đổi cách chúng ta viết CSS với approach utility-first.

## Cài đặt

\`\`\`bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

## Utility Classes cơ bản

### Layout
- \`flex\`, \`grid\` - Layout containers
- \`container\`, \`mx-auto\` - Centering

### Typography
- \`text-xl\`, \`font-bold\` - Text styling
- \`text-gray-700\` - Colors

### Spacing
- \`p-4\`, \`m-2\` - Padding và margin
- \`space-x-4\` - Gap giữa elements

## Custom Configuration

\`\`\`javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: '#FF6B6B',
      },
    },
  },
}
\`\`\`

## Tips
1. Sử dụng @apply để tạo component classes
2. Kết hợp với CSS variables
3. Tận dụng JIT mode

Tailwind CSS giúp bạn code UI nhanh hơn rất nhiều!`,
    tags: ['tailwindcss', 'css', 'frontend', 'ui'],
    status: 'published',
    authorId: 'admin-002',
    authorName: 'Trần Thị B',
  },
  {
    title: 'Tối ưu hiệu suất React App với React.memo và useMemo',
    slug: 'toi-uu-hieu-suat-react',
    summary: 'Học cách sử dụng React.memo, useMemo và useCallback để tối ưu hiệu suất ứng dụng React.',
    content: `# Tối ưu hiệu suất React App

React cung cấp nhiều công cụ để tối ưu hiệu suất, nhưng cần biết khi nào nên dùng.

## React.memo

Ngăn component re-render không cần thiết:

\`\`\`typescript
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{data}</div>;
});
\`\`\`

## useMemo

Cache kết quả tính toán phức tạp:

\`\`\`typescript
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
\`\`\`

## useCallback

Cache function references:

\`\`\`typescript
const handleClick = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
\`\`\`

## Khi nào nên dùng?

- **React.memo**: Component re-render nhiều với props không đổi
- **useMemo**: Tính toán phức tạp, tốn thời gian
- **useCallback**: Pass callbacks xuống child components

## Lưu ý
Không nên over-optimize! Chỉ optimize khi thực sự cần thiết.`,
    tags: ['react', 'performance', 'optimization', 'javascript'],
    status: 'published',
    authorId: 'admin-003',
    authorName: 'Lê Văn C',
  },
  {
    title: 'Docker cho người mới bắt đầu',
    slug: 'docker-cho-nguoi-moi-bat-dau',
    summary: 'Hướng dẫn cơ bản về Docker và containerization cho developers.',
    content: `# Docker cho người mới bắt đầu

Docker giúp đóng gói ứng dụng và dependencies thành containers.

## Docker là gì?

Docker là platform để phát triển, ship và chạy ứng dụng trong containers.

## Concepts cơ bản

### Image
Template để tạo containers, chứa code và dependencies.

### Container
Instance đang chạy của một image.

### Dockerfile
File định nghĩa cách build image.

## Ví dụ Dockerfile

\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

## Docker Compose

Quản lý multi-container apps:

\`\`\`yaml
version: '3'
services:
  web:
    build: .
    ports:
      - "3000:3000"
  db:
    image: postgres
\`\`\`

Docker giúp development và deployment dễ dàng hơn rất nhiều!`,
    tags: ['docker', 'devops', 'containers', 'deployment'],
    status: 'published',
    authorId: 'admin-003',
    authorName: 'Lê Văn C',
  },
  {
    title: 'GraphQL vs REST API - Nên chọn gì?',
    slug: 'graphql-vs-rest-api',
    summary: 'So sánh GraphQL và REST API để giúp bạn đưa ra quyết định đúng đắn cho dự án.',
    content: `# GraphQL vs REST API

Hai approach khác nhau cho API design, mỗi cái có ưu nhược điểm riêng.

## REST API

### Ưu điểm
- Đơn giản, dễ hiểu
- Caching tốt
- Tooling phong phú

### Nhược điểm
- Over-fetching / Under-fetching
- Multiple endpoints
- Versioning phức tạp

## GraphQL

### Ưu điểm
- Fetch chính xác data cần thiết
- Single endpoint
- Strong typing
- Real-time với subscriptions

### Nhược điểm
- Learning curve cao hơn
- Caching phức tạp
- Query complexity

## Khi nào dùng REST?
- API đơn giản
- Cần caching tốt
- Team nhỏ

## Khi nào dùng GraphQL?
- Data relationships phức tạp
- Mobile apps (tiết kiệm bandwidth)
- Cần flexibility cao

Không có câu trả lời đúng sai, tùy vào use case!`,
    tags: ['graphql', 'rest', 'api', 'backend'],
    status: 'published',
    authorId: 'admin-001',
    authorName: 'Nguyễn Văn A',
  },
  {
    title: 'Microservices Architecture - Kiến trúc cho ứng dụng lớn',
    slug: 'microservices-architecture',
    summary: 'Tìm hiểu về kiến trúc microservices và khi nào nên áp dụng.',
    content: `# Microservices Architecture

Microservices là pattern chia ứng dụng thành các services nhỏ, độc lập.

## Đặc điểm

- **Loosely coupled**: Services độc lập
- **Independently deployable**: Deploy riêng từng service
- **Organized around business capabilities**: Mỗi service một business domain

## Ưu điểm

1. **Scalability**: Scale từng service riêng
2. **Technology diversity**: Mỗi service dùng tech stack khác nhau
3. **Fault isolation**: Lỗi một service không ảnh hưởng toàn bộ
4. **Easy to understand**: Code base nhỏ hơn

## Nhược điểm

1. **Complexity**: Distributed system phức tạp
2. **Network latency**: Communication giữa services
3. **Data consistency**: Distributed transactions khó
4. **Testing**: Integration testing phức tạp

## Khi nào nên dùng?

- Ứng dụng lớn, nhiều teams
- Cần scale khác nhau cho từng phần
- Có resources để maintain

## Khi nào KHÔNG nên dùng?

- Ứng dụng nhỏ, startup
- Team nhỏ
- Chưa rõ requirements

Start with monolith, chuyển sang microservices khi cần!`,
    tags: ['microservices', 'architecture', 'backend', 'scalability'],
    status: 'draft',
    authorId: 'admin-002',
    authorName: 'Trần Thị B',
  },
  {
    title: 'Git Workflow cho team - Best practices',
    slug: 'git-workflow-cho-team',
    summary: 'Các Git workflow phổ biến và best practices khi làm việc nhóm.',
    content: `# Git Workflow cho team

Git workflow giúp team collaborate hiệu quả và tránh conflicts.

## Git Flow

Workflow phổ biến nhất với các branches:

- **main**: Production code
- **develop**: Development code
- **feature/***: Tính năng mới
- **release/***: Chuẩn bị release
- **hotfix/***: Fix bugs khẩn cấp

## GitHub Flow

Đơn giản hơn Git Flow:

1. Create branch từ main
2. Commit changes
3. Open Pull Request
4. Review và merge

## Best Practices

### Commit Messages
\`\`\`
feat: Add user authentication
fix: Fix login bug
docs: Update README
\`\`\`

### Branch Naming
\`\`\`
feature/user-authentication
bugfix/login-error
hotfix/critical-security-patch
\`\`\`

### Pull Requests
- Mô tả rõ ràng changes
- Link đến issue/ticket
- Request review từ teammates
- Resolve conflicts trước khi merge

## Tips
1. Commit thường xuyên
2. Pull trước khi push
3. Rebase thay vì merge (tuỳ team)
4. Sử dụng .gitignore đúng cách

Git workflow tốt giúp team work smoother!`,
    tags: ['git', 'workflow', 'collaboration', 'best-practices'],
    status: 'published',
    authorId: 'admin-003',
    authorName: 'Lê Văn C',
  },
  {
    title: 'Testing trong JavaScript - Unit, Integration, E2E',
    slug: 'testing-trong-javascript',
    summary: 'Hướng dẫn về các loại testing và tools phổ biến trong JavaScript ecosystem.',
    content: `# Testing trong JavaScript

Testing là phần quan trọng của software development.

## Các loại Testing

### Unit Testing
Test từng function/component riêng lẻ.

\`\`\`typescript
describe('Calculator', () => {
  it('should add two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });
});
\`\`\`

### Integration Testing
Test sự tương tác giữa các modules.

### E2E Testing
Test toàn bộ user flow.

## Testing Tools

### Jest
Framework testing phổ biến nhất.

### React Testing Library
Test React components theo user perspective.

### Playwright/Cypress
E2E testing tools.

## Best Practices

1. **AAA Pattern**: Arrange, Act, Assert
2. **Test behavior, not implementation**
3. **Keep tests simple và readable**
4. **Mock external dependencies**
5. **Aim for high coverage, but not 100%**

## Example với React Testing Library

\`\`\`typescript
test('renders button and handles click', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  const button = screen.getByText('Click me');
  fireEvent.click(button);
  
  expect(handleClick).toHaveBeenCalledTimes(1);
});
\`\`\`

Testing giúp code quality tốt hơn và refactor tự tin hơn!`,
    tags: ['testing', 'javascript', 'jest', 'quality-assurance'],
    status: 'published',
    authorId: 'admin-001',
    authorName: 'Nguyễn Văn A',
  },
];

async function seedPosts() {
  console.log('🌱 Bắt đầu seed sample posts...\n');
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const post of samplePosts) {
    try {
      const now = new Date();
      
      const postData = {
        ...post,
        createdAt: now,
        updatedAt: now,
        publishedAt: post.status === 'published' ? now : null,
        views: Math.floor(Math.random() * 1000),
        likes: Math.floor(Math.random() * 100),
      };
      
      // Lưu vào Firestore
      const docRef = await adminDb.collection('posts').add(postData);
      
      console.log(`✅ Created: ${post.title}`);
      console.log(`   ID: ${docRef.id}`);
      console.log(`   Status: ${post.status}`);
      
      // Sync lên Algolia nếu published
      if (post.status === 'published') {
        try {
          await syncPostToAlgolia({
            id: docRef.id,
            ...postData,
          } as any);
          console.log(`   🔍 Synced to Algolia`);
        } catch (algoliaError) {
          console.log(`   ⚠️  Algolia sync failed (non-critical)`);
        }
      }
      
      console.log('');
      successCount++;
      
    } catch (error) {
      console.error(`❌ Failed to create: ${post.title}`);
      console.error(`   Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      console.log('');
      errorCount++;
    }
  }
  
  console.log('='.repeat(60));
  console.log('\n📊 KẾT QUẢ SEED:\n');
  console.log(`✅ Thành công: ${successCount} posts`);
  console.log(`❌ Thất bại: ${errorCount} posts`);
  console.log(`📝 Tổng cộng: ${samplePosts.length} posts`);
  console.log('\n🎉 Seed hoàn tất!');
  console.log('\n💡 Bước tiếp theo:');
  console.log('   - Chạy: npm run list:all-posts để xem danh sách');
  console.log('   - Truy cập: http://localhost:3000 để xem trên frontend');
}

seedPosts();
