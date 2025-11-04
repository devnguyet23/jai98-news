# Test Scripts

Thư mục này chứa các script để kiểm tra và verify các thành phần của hệ thống.

## 📋 Danh sách Scripts

### 1. Test Firebase Connection
```bash
npm run test:firebase
```
Kiểm tra kết nối tới Firebase Firestore.

**Kết quả mong đợi:** `PERMISSION_DENIED` (chứng tỏ kết nối thành công, Security Rules hoạt động)

---

### 2. Test Algolia Connection
```bash
npm run test:algolia
```
Kiểm tra kết nối tới Algolia search service.

**Kết quả mong đợi:** Kết nối thành công, trả về số lượng hits (có thể là 0 nếu chưa có dữ liệu)

---

### 3. Test API Endpoints (Simple)
```bash
npm run test:api:simple
```
Kiểm tra nhanh API endpoint GET /api/firebase/posts.

**Yêu cầu:** Dev server phải đang chạy (`npm run dev`)

---

### 4. Test API Endpoints (Full)
```bash
npm run test:api
```
Kiểm tra toàn diện tất cả API endpoints:
- ✅ POST /api/firebase/posts - Tạo bài viết
- ✅ GET /api/firebase/posts - Lấy danh sách
- ✅ GET /api/firebase/posts/[id] - Lấy chi tiết
- ✅ PUT /api/firebase/posts/[id] - Cập nhật
- ✅ DELETE /api/firebase/posts/[id] - Xóa
- ✅ Pagination
- ✅ Filter by status
- ✅ Validation

**Yêu cầu:** Dev server phải đang chạy (`npm run dev`)

---

### 5. Test All
```bash
npm run test:all
```
Chạy tất cả tests: Firebase + Algolia + API endpoints

---

## 🚀 Quy trình Test Đầy Đủ

### Bước 1: Chuẩn bị
```bash
# Đảm bảo đã cài đặt dependencies
npm install

# Kiểm tra file .env có đầy đủ credentials
cat .env
```

### Bước 2: Test Infrastructure
```bash
# Test Firebase
npm run test:firebase

# Test Algolia
npm run test:algolia
```

### Bước 3: Khởi động Dev Server
```bash
# Terminal 1
npm run dev
```

### Bước 4: Test API Endpoints
```bash
# Terminal 2
npm run test:api:simple  # Test nhanh
npm run test:api         # Test đầy đủ
```

---

## 📊 Hiểu Kết Quả Test

### Firebase Test
- ✅ **PASSED:** Lỗi `PERMISSION_DENIED` - Kết nối OK, Security Rules hoạt động
- ❌ **FAILED:** Lỗi `invalid-api-key` - Kiểm tra Firebase credentials trong `.env`

### Algolia Test
- ✅ **PASSED:** Kết nối thành công, hiển thị số hits
- ❌ **FAILED:** Lỗi credentials - Kiểm tra Algolia keys trong `.env`

### API Test
- ✅ **PASSED:** Tất cả operations hoạt động đúng
- ❌ **FAILED:** Kiểm tra:
  - Dev server có đang chạy?
  - Firebase credentials có đúng?
  - Security Rules có được deploy?

---

## 🔧 Troubleshooting

### Lỗi: "Cannot connect to localhost:3000"
```bash
# Khởi động dev server
npm run dev
```

### Lỗi: "Firebase invalid-api-key"
```bash
# Kiểm tra .env file
cat .env | grep FIREBASE

# Đảm bảo có các keys:
# NEXT_PUBLIC_FIREBASE_API_KEY
# NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
# NEXT_PUBLIC_FIREBASE_PROJECT_ID
# ...
```

### Lỗi: "Algolia credentials not found"
```bash
# Kiểm tra .env file
cat .env | grep ALGOLIA

# Đảm bảo có:
# NEXT_PUBLIC_ALGOLIA_APP_ID
# NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
# ALGOLIA_ADMIN_KEY
```

---

## 📝 Notes

- Tất cả scripts đều tự động load environment variables từ `.env` file
- Scripts sử dụng `tsx` để chạy TypeScript trực tiếp
- API tests tạo và xóa dữ liệu test tự động (cleanup)
- Lỗi TypeScript về `BASE_URL` redeclaration có thể bỏ qua (không ảnh hưởng runtime)

---

**Last Updated:** 2025-11-04
