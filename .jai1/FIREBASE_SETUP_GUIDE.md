# Hướng dẫn Setup Firebase cho Jai98 News

## 📋 Bước 1: Tạo Firebase Project

### 1.1 Truy cập Firebase Console
1. Đi tới [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" hoặc "Create a project"
3. Nhập tên project: `jai98-news` (hoặc tên bạn muốn)
4. Chọn có/không enable Google Analytics (recommended: Yes)
5. Click "Create project"

### 1.2 Lấy Firebase Configuration
1. Trong Firebase Console, click vào icon ⚙️ (Settings) → Project settings
2. Scroll xuống phần "Your apps"
3. Click vào icon Web (</>) để add web app
4. Nhập app nickname: `jai98-news-web`
5. Check "Also set up Firebase Hosting" (optional)
6. Click "Register app"
7. Copy Firebase configuration object:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "jai98-news.firebaseapp.com",
  projectId: "jai98-news",
  storageBucket: "jai98-news.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

8. Paste vào file `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=jai98-news.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=jai98-news
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=jai98-news.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

---

## 📊 Bước 2: Setup Firestore Database

### 2.1 Enable Firestore
1. Trong Firebase Console, click "Firestore Database" trong sidebar
2. Click "Create database"
3. Chọn location: `asia-southeast1` (Singapore) hoặc gần nhất
4. Chọn mode: **Production mode** (recommended)
5. Click "Enable"

### 2.2 Tạo Collections

Tạo 3 collections chính:

#### Collection: `users`
```
users/
  {userId}/
    - email: string
    - displayName: string
    - photoURL: string (optional)
    - role: string ("admin" | "editor" | "viewer")
    - createdAt: timestamp
    - updatedAt: timestamp
```

#### Collection: `posts`
```
posts/
  {postId}/
    - title: string
    - slug: string
    - summary: string
    - content: string (Markdown)
    - coverImageUrl: string (optional)
    - authorId: string
    - authorName: string
    - authorPhotoURL: string (optional)
    - tags: array<string>
    - status: string ("draft" | "published" | "archived")
    - publishedAt: timestamp (optional)
    - createdAt: timestamp
    - updatedAt: timestamp
    - views: number
    - likes: number
```

#### Collection: `comments` (optional)
```
comments/
  {commentId}/
    - postId: string
    - userId: string
    - userName: string
    - userPhotoURL: string (optional)
    - content: string
    - createdAt: timestamp
    - updatedAt: timestamp
```

### 2.3 Tạo Indexes

Trong Firestore Console → Indexes tab, tạo composite indexes:

**Index 1: Posts by status and publishedAt**
```
Collection: posts
Fields:
  - status (Ascending)
  - publishedAt (Descending)
```

**Index 2: Posts by tags and publishedAt**
```
Collection: posts
Fields:
  - tags (Array)
  - status (Ascending)
  - publishedAt (Descending)
```

**Index 3: Posts by authorId and publishedAt**
```
Collection: posts
Fields:
  - authorId (Ascending)
  - status (Ascending)
  - publishedAt (Descending)
```

### 2.4 Security Rules

Click vào "Rules" tab và paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    function isEditor() {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'editor'];
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if isAdmin();
      allow update: if isAdmin() || isOwner(userId);
      allow delete: if isAdmin();
    }
    
    // Posts collection
    match /posts/{postId} {
      // Anyone can read published posts
      allow read: if resource.data.status == 'published' || isEditor();
      
      // Only editors and admins can create posts
      allow create: if isEditor();
      
      // Only author or admin can update
      allow update: if isAdmin() || 
                       (isEditor() && resource.data.authorId == request.auth.uid);
      
      // Only admin can delete
      allow delete: if isAdmin();
    }
    
    // Comments collection
    match /comments/{commentId} {
      allow read: if true; // Anyone can read comments
      allow create: if isAuthenticated();
      allow update: if isOwner(resource.data.userId) || isAdmin();
      allow delete: if isOwner(resource.data.userId) || isAdmin();
    }
  }
}
```

Click "Publish"

---

## 🔐 Bước 3: Setup Firebase Authentication

### 3.1 Enable Authentication
1. Click "Authentication" trong sidebar
2. Click "Get started"
3. Click tab "Sign-in method"

### 3.2 Enable Sign-in Providers

**Email/Password:**
1. Click "Email/Password"
2. Enable "Email/Password"
3. Click "Save"

**Google (Optional):**
1. Click "Google"
2. Enable
3. Nhập Project support email
4. Click "Save"

### 3.3 Tạo Admin User đầu tiên

1. Click tab "Users"
2. Click "Add user"
3. Nhập email và password
4. Click "Add user"
5. Copy User UID
6. Vào Firestore → `users` collection
7. Tạo document với ID = User UID:
```json
{
  "email": "admin@jai98news.com",
  "displayName": "Admin",
  "role": "admin",
  "createdAt": [current timestamp],
  "updatedAt": [current timestamp]
}
```

---

## 💾 Bước 4: Setup Firebase Storage

### 4.1 Enable Storage
1. Click "Storage" trong sidebar
2. Click "Get started"
3. Chọn location: `asia-southeast1`
4. Click "Done"

### 4.2 Storage Rules

Click "Rules" tab và paste:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isEditor() {
      return isAuthenticated() && 
             firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data.role in ['admin', 'editor'];
    }
    
    function isValidImage() {
      return request.resource.size < 5 * 1024 * 1024 && // Max 5MB
             request.resource.contentType.matches('image/.*');
    }
    
    // Post images
    match /posts/{postId}/{allPaths=**} {
      allow read: if true; // Anyone can read
      allow write: if isEditor() && isValidImage();
      allow delete: if isEditor();
    }
    
    // User avatars
    match /users/{userId}/avatar.{ext} {
      allow read: if true;
      allow write: if isAuthenticated() && 
                      (request.auth.uid == userId || isEditor()) &&
                      isValidImage();
      allow delete: if isAuthenticated() && request.auth.uid == userId;
    }
  }
}
```

Click "Publish"

### 4.3 Tạo Folder Structure

Trong Storage, tạo folders:
- `/posts/` - Chứa ảnh bài viết
- `/users/` - Chứa avatar users

---

## 🔑 Bước 5: Setup Firebase Admin SDK

### 5.1 Tạo Service Account
1. Click ⚙️ → Project settings
2. Click tab "Service accounts"
3. Click "Generate new private key"
4. Click "Generate key"
5. File JSON sẽ được download

### 5.2 Cấu hình Environment Variables

Mở file JSON vừa download, copy các giá trị:

```json
{
  "type": "service_account",
  "project_id": "jai98-news",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxx@jai98-news.iam.gserviceaccount.com",
  ...
}
```

Paste vào `.env.local`:

```env
FIREBASE_ADMIN_PROJECT_ID=jai98-news
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxx@jai98-news.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

**⚠️ QUAN TRỌNG:**
- Không commit file JSON hoặc `.env.local` lên Git
- Add vào `.gitignore`:
```
.env.local
firebase-service-account.json
```

---

## 🔍 Bước 6: Setup Algolia (Optional nhưng recommended)

### 6.1 Tạo Algolia Account
1. Đi tới [Algolia](https://www.algolia.com/)
2. Sign up (Free tier: 10K requests/month)
3. Tạo application mới: `jai98-news`

### 6.2 Tạo Index
1. Trong Algolia Dashboard, click "Indices"
2. Click "Create Index"
3. Nhập tên: `posts_production`
4. Click "Create"

### 6.3 Configure Index Settings
1. Click vào index `posts_production`
2. Click "Configuration" tab
3. Cấu hình:

**Searchable Attributes:**
```
1. title
2. summary
3. content
4. tags
```

**Attributes for Faceting:**
```
- tags
- authorName
```

**Custom Ranking:**
```
desc(publishedAt)
```

### 6.4 Lấy API Keys
1. Click "API Keys" trong sidebar
2. Copy:
   - Application ID
   - Search-Only API Key
   - Admin API Key

3. Paste vào `.env.local`:
```env
NEXT_PUBLIC_ALGOLIA_APP_ID=YOUR_APP_ID
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=YOUR_SEARCH_KEY
ALGOLIA_ADMIN_KEY=YOUR_ADMIN_KEY
```

---

## ✅ Bước 7: Verify Setup

### 7.1 Test Firebase Connection

Tạo file `scripts/test-firebase.ts`:

```typescript
import { db } from '@/lib/firebase/config';
import { collection, addDoc } from 'firebase/firestore';

async function testFirebase() {
  try {
    const docRef = await addDoc(collection(db, 'test'), {
      message: 'Hello Firebase!',
      timestamp: new Date(),
    });
    console.log('✅ Firebase connected! Document ID:', docRef.id);
  } catch (error) {
    console.error('❌ Firebase error:', error);
  }
}

testFirebase();
```

Run:
```bash
npx ts-node scripts/test-firebase.ts
```

### 7.2 Test Algolia Connection

Tạo file `scripts/test-algolia.ts`:

```typescript
import { searchClient } from '@/lib/algolia/config';

async function testAlgolia() {
  try {
    const { results } = await searchClient.search({
      requests: [
        {
          indexName: 'posts_production',
          query: 'test',
        },
      ],
    });
    console.log('✅ Algolia connected!');
    console.log('Results:', results);
  } catch (error) {
    console.error('❌ Algolia error:', error);
  }
}

testAlgolia();
```

---

## 📚 Next Steps

Sau khi setup xong Firebase và Algolia:

1. ✅ Test connections
2. ✅ Tạo admin user đầu tiên
3. ✅ Deploy Security Rules
4. ✅ Tạo sample posts để test
5. ➡️ Tiếp tục Phase 2: Frontend Development

---

## 🆘 Troubleshooting

### Lỗi: "Permission denied"
- Check Security Rules
- Verify user authentication
- Check user role trong Firestore

### Lỗi: "Firebase app already initialized"
- Đảm bảo chỉ initialize Firebase một lần
- Check file `lib/firebase/config.ts`

### Lỗi: "Invalid API key"
- Verify `.env.local` có đúng keys
- Restart dev server sau khi update env

### Lỗi: Algolia không tìm thấy results
- Check index name đúng chưa
- Verify có data trong index chưa
- Check API keys

---

## 📖 Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Storage Rules](https://firebase.google.com/docs/storage/security)
- [Algolia Documentation](https://www.algolia.com/doc/)
- [Next.js + Firebase Guide](https://firebase.google.com/docs/web/setup)

---

**Setup completed! 🎉**
