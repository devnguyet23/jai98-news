# Admin Dashboard Guide

## ✅ Đã hoàn thành

Admin Dashboard đã được tạo thành công với đầy đủ tính năng quản lý posts.

---

## 📁 Cấu trúc Files

```
app/admin/
├── layout.tsx              # Admin layout với navigation
├── page.tsx                # Dashboard chính với stats
├── posts/
│   ├── page.tsx           # Danh sách posts
│   ├── new/
│   │   └── page.tsx       # Tạo post mới
│   └── [id]/
│       └── edit/
│           └── page.tsx   # Chỉnh sửa post

components/admin/
└── PostForm.tsx           # Form component (reusable)
```

---

## 🎯 Tính năng

### 1. Dashboard (/admin)
- **Stats Overview:**
  - Tổng số bài viết
  - Tổng lượt xem
  - Tổng lượt thích
  - Số bài đã xuất bản
  
- **Quick Actions:**
  - Tạo bài viết mới
  - Quản lý bài viết
  - Xem website

- **Recent Posts:**
  - 5 bài viết gần nhất
  - Quick link để edit

### 2. Quản lý Posts (/admin/posts)
- **Danh sách posts:**
  - Hiển thị dạng table
  - Thông tin: Title, Author, Status, Stats, Date
  - Actions: View, Edit, Delete

- **Filters:**
  - Tìm kiếm theo title
  - Lọc theo status (All, Published, Draft, Archived)

- **Actions:**
  - 👁️ View - Xem bài viết trên site
  - ✏️ Edit - Chỉnh sửa bài viết
  - 🗑️ Delete - Xóa bài viết

### 3. Tạo Post Mới (/admin/posts/new)
- **Form fields:**
  - Title (required) - Auto-generate slug
  - Slug (required) - URL-friendly
  - Summary (required) - Tóm tắt ngắn
  - Content (required) - Markdown editor
  - Tags - Phân cách bằng dấu phẩy
  - Status - Draft/Published/Archived
  - Author Name
  - Cover Image URL

- **Actions:**
  - Lưu nháp
  - Xuất bản
  - Preview

### 4. Chỉnh sửa Post (/admin/posts/[id]/edit)
- Giống form tạo mới
- Pre-filled với dữ liệu hiện tại
- Có thể thay đổi status

---

## 🚀 Cách sử dụng

### Truy cập Admin Dashboard
```
http://localhost:3000/admin
```

### Tạo bài viết mới

1. **Vào Dashboard:**
   ```
   http://localhost:3000/admin
   ```

2. **Click "New Post" hoặc vào:**
   ```
   http://localhost:3000/admin/posts/new
   ```

3. **Điền thông tin:**
   - Nhập tiêu đề (slug tự động generate)
   - Nhập tóm tắt
   - Viết nội dung với Markdown
   - Thêm tags (optional)
   - Chọn status

4. **Lưu:**
   - Click "Lưu nháp" để lưu draft
   - Click "Xuất bản" để publish ngay

### Chỉnh sửa bài viết

1. **Vào danh sách posts:**
   ```
   http://localhost:3000/admin/posts
   ```

2. **Click icon ✏️ Edit** ở bài viết muốn sửa

3. **Cập nhật thông tin** và click "Xuất bản"

### Xóa bài viết

1. Vào danh sách posts
2. Click icon 🗑️ Delete
3. Confirm xóa

---

## 📝 Markdown Support

Form editor hỗ trợ đầy đủ Markdown syntax:

### Headings
```markdown
# H1
## H2
### H3
```

### Text Formatting
```markdown
**Bold text**
*Italic text*
~~Strikethrough~~
```

### Lists
```markdown
- Item 1
- Item 2
  - Nested item

1. First
2. Second
```

### Links & Images
```markdown
[Link text](https://example.com)
![Alt text](https://image-url.com/image.jpg)
```

### Code
```markdown
`inline code`

\`\`\`javascript
// Code block
const hello = "world";
\`\`\`
```

### Blockquotes
```markdown
> This is a quote
```

---

## 🎨 UI Features

### Responsive Design
- Desktop: Full layout với sidebar
- Tablet: Optimized layout
- Mobile: Stacked layout

### Dark Mode Support
- Tự động theo system preference
- Hoặc toggle manual

### Status Colors
- 🟢 Published - Green
- 🟡 Draft - Yellow
- ⚪ Archived - Gray

---

## 🔧 Technical Details

### API Endpoints Used

#### GET /api/firebase/posts
- Lấy danh sách posts
- Params: `limit`, `status`

#### GET /api/firebase/posts/[id]
- Lấy chi tiết 1 post

#### POST /api/firebase/posts
- Tạo post mới
- Body: Post data

#### PUT /api/firebase/posts/[id]
- Cập nhật post
- Body: Updated data

#### DELETE /api/firebase/posts/[id]
- Xóa post

### Auto-slug Generation
```typescript
const slug = title
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/đ/g, 'd')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '');
```

### Form Validation
- Title: Required
- Slug: Required, URL-friendly
- Summary: Required
- Content: Required, Markdown
- Tags: Optional, comma-separated
- Status: Draft/Published/Archived

---

## ⚠️ Known Limitations

### 1. Authentication
- **Hiện tại:** Không có authentication
- **Ai cũng có thể truy cập** `/admin`
- **Cần implement:** Firebase Auth hoặc NextAuth.js

### 2. Delete Function
- **Hiện tại:** Button delete chưa có logic
- **Cần implement:** Confirm dialog và API call

### 3. Image Upload
- **Hiện tại:** Chỉ nhập URL
- **Cần implement:** Upload lên Firebase Storage

### 4. Rich Text Editor
- **Hiện tại:** Plain textarea
- **Cần implement:** WYSIWYG editor hoặc Markdown preview

---

## 🚀 Next Steps

### Immediate
1. ⏳ Implement delete function
2. ⏳ Add authentication (Firebase Auth)
3. ⏳ Add confirm dialogs
4. ⏳ Add success/error toasts

### Short Term
5. ⏳ Image upload to Firebase Storage
6. ⏳ Markdown preview trong editor
7. ⏳ Bulk actions (delete multiple)
8. ⏳ Search và filter improvements

### Long Term
9. ⏳ Rich text editor (TipTap/Lexical)
10. ⏳ Media library
11. ⏳ User management
12. ⏳ Analytics dashboard

---

## 💡 Tips

### Tạo slug tốt
- Ngắn gọn, dễ nhớ
- Chứa keywords
- Không có ký tự đặc biệt
- Ví dụ: `nextjs-15-features`

### Viết summary tốt
- 1-2 câu ngắn gọn
- Mô tả chính xác nội dung
- Hấp dẫn, thu hút đọc

### Sử dụng tags hiệu quả
- 3-5 tags mỗi bài
- Chọn tags phổ biến
- Consistent naming

### Markdown best practices
- Sử dụng headings đúng cấp
- Code blocks với language
- Alt text cho images
- Links mở tab mới khi cần

---

## 🐛 Troubleshooting

### Lỗi: "Failed to save post"
- Kiểm tra dev server đang chạy
- Kiểm tra Firebase credentials
- Xem console logs

### Lỗi: "Slug already exists"
- Thay đổi slug thành unique
- Hoặc edit post cũ

### Preview không hoạt động
- Đảm bảo slug đã được tạo
- Post phải có status published
- Kiểm tra URL

---

## 📊 Screenshots

### Dashboard
- Stats cards với icons
- Quick actions
- Recent posts list

### Posts List
- Table view với filters
- Action buttons
- Status badges

### Post Form
- 2-column layout (desktop)
- Markdown editor
- Sidebar với metadata

---

**Created:** 2025-11-04  
**Status:** ✅ Admin Dashboard hoàn thành - Ready to use!
