# Troubleshooting Guide

## ❌ Lỗi: "Failed to parse private key: Invalid PEM formatted message"

### Nguyên nhân
Firebase Admin SDK không thể parse private key từ file `.env`. Điều này thường xảy ra khi:
1. Private key không được format đúng
2. Private key bị thiếu hoặc bị cắt
3. Escape characters (`\n`) không được xử lý đúng

### Giải pháp

#### Bước 1: Lấy Service Account Key mới từ Firebase Console

1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Chọn project `jai98-news`
3. Click vào icon ⚙️ (Settings) → **Project settings**
4. Chuyển sang tab **Service accounts**
5. Click **Generate new private key**
6. Click **Generate key** để download file JSON

#### Bước 2: Cập nhật file `.env`

Mở file JSON vừa download, bạn sẽ thấy cấu trúc như sau:

```json
{
  "type": "service_account",
  "project_id": "jai98-news",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxx@jai98-news.iam.gserviceaccount.com",
  ...
}
```

**QUAN TRỌNG:** Khi copy private key vào `.env`, bạn cần:

1. **Giữ nguyên các `\n`** (không thay thế bằng newline thực)
2. **Bọc trong dấu ngoặc kép**
3. **Copy toàn bộ** từ `-----BEGIN` đến `-----END`

Ví dụ trong file `.env`:

```env
FIREBASE_ADMIN_PROJECT_ID=jai98-news
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxx@jai98-news.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

#### Bước 3: Restart Dev Server

Sau khi cập nhật `.env`:

```bash
# Dừng dev server (Ctrl+C hoặc)
lsof -ti:3000 | xargs kill -9

# Khởi động lại
npm run dev
```

#### Bước 4: Kiểm tra lại

```bash
npm run test:api:simple
```

---

## ❌ Lỗi: "PERMISSION_DENIED" khi test Firebase

### Nguyên nhân
Đây KHÔNG phải là lỗi! Đây là kết quả mong đợi khi:
- Kết nối Firebase thành công
- Security Rules đang hoạt động đúng
- Script không có quyền ghi vào Firestore (vì không authenticate)

### Giải pháp
Không cần làm gì. Đây là kết quả **PASSED** ✅

---

## ❌ Lỗi: "Algolia credentials not found"

### Nguyên nhân
Thiếu Algolia API keys trong file `.env`

### Giải pháp

#### Bước 1: Lấy Algolia API Keys

1. Truy cập [Algolia Dashboard](https://www.algolia.com/dashboard)
2. Chọn application của bạn
3. Vào **Settings** → **API Keys**
4. Copy:
   - Application ID
   - Search-Only API Key  
   - Admin API Key

#### Bước 2: Cập nhật `.env`

```env
NEXT_PUBLIC_ALGOLIA_APP_ID=YOUR_APP_ID
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=YOUR_SEARCH_ONLY_KEY
ALGOLIA_ADMIN_KEY=YOUR_ADMIN_KEY
```

#### Bước 3: Restart và test

```bash
npm run dev
npm run test:algolia
```

---

## 🔧 Các lệnh hữu ích

### Kiểm tra environment variables
```bash
# Xem tất cả Firebase vars
cat .env | grep FIREBASE

# Xem tất cả Algolia vars
cat .env | grep ALGOLIA
```

### Xóa cache Next.js
```bash
rm -rf .next
npm run dev
```

### Kiểm tra port 3000
```bash
# Xem process đang chạy trên port 3000
lsof -i:3000

# Kill process
lsof -ti:3000 | xargs kill -9
```

---

## 📞 Cần trợ giúp thêm?

Nếu vẫn gặp vấn đề, hãy kiểm tra:

1. **Firebase Console** - Đảm bảo project tồn tại và active
2. **Algolia Dashboard** - Đảm bảo index `posts_production` đã được tạo
3. **File `.env`** - Đảm bảo không có khoảng trắng thừa, quotes sai
4. **Node version** - Đảm bảo đang dùng Node.js >= 18

---

**Last Updated:** 2025-11-04
