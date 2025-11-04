# Firebase Authentication Guide

## ✅ Đã hoàn thành

Firebase Authentication đã được implement thành công với Email/Password và Google Sign-in.

---

## 🎯 Tính năng

### 1. Authentication Methods
- **Email/Password** - Đăng ký và đăng nhập truyền thống
- **Google Sign-in** - Đăng nhập nhanh với Google account
- **Auto Sign-out** - Tự động đăng xuất khi cần

### 2. Protected Routes
- **Admin Dashboard** - Chỉ user đã đăng nhập mới truy cập được
- **Redirect** - Tự động redirect đến `/login` nếu chưa đăng nhập
- **Loading State** - Hiển thị loading khi check authentication

### 3. User Interface
- **Header Menu** - Dropdown menu với user info
- **Login Page** - Form đăng nhập với validation
- **Signup Page** - Form đăng ký với confirm password
- **User Avatar** - Avatar với initial của user

---

## 📁 Files đã tạo

```
contexts/
└── AuthContext.tsx              # Auth context và provider

components/
├── header.tsx                   # Updated với user menu
└── ProtectedRoute.tsx           # HOC để protect routes

app/
├── layout.tsx                   # Wrapped với AuthProvider
├── login/
│   └── page.tsx                # Login page
├── signup/
│   └── page.tsx                # Signup page
└── admin/
    └── layout.tsx              # Protected với ProtectedRoute
```

---

## 🚀 Cách sử dụng

### Đăng ký tài khoản mới

1. **Truy cập trang đăng ký:**
   ```
   http://localhost:3000/signup
   ```

2. **Điền thông tin:**
   - Tên hiển thị
   - Email
   - Mật khẩu (tối thiểu 6 ký tự)
   - Xác nhận mật khẩu

3. **Hoặc đăng ký với Google:**
   - Click "Đăng ký với Google"
   - Chọn Google account

### Đăng nhập

1. **Truy cập trang đăng nhập:**
   ```
   http://localhost:3000/login
   ```

2. **Đăng nhập với Email/Password:**
   - Nhập email
   - Nhập mật khẩu
   - Click "Đăng nhập"

3. **Hoặc đăng nhập với Google:**
   - Click "Đăng nhập với Google"
   - Chọn Google account

### Truy cập Admin Dashboard

1. **Sau khi đăng nhập:**
   - Tự động redirect đến `/admin`
   - Hoặc click "Admin Dashboard" trong user menu

2. **Nếu chưa đăng nhập:**
   - Truy cập `/admin` sẽ redirect đến `/login`
   - Sau khi đăng nhập thành công, quay lại `/admin`

### Đăng xuất

1. **Click vào avatar** ở header
2. **Click "Đăng xuất"**
3. **Tự động redirect về trang chủ**

---

## 🔧 Technical Details

### AuthContext API

```typescript
interface AuthContextType {
  user: User | null;              // Current user
  loading: boolean;               // Loading state
  signIn: (email, password) => Promise<void>;
  signUp: (email, password, displayName) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}
```

### Usage Example

```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, loading, signIn, signOut } = useAuth();

  if (loading) return <div>Loading...</div>;
  
  if (user) {
    return <div>Welcome {user.displayName}</div>;
  }
  
  return <button onClick={() => signIn(email, password)}>Login</button>;
}
```

### Protected Route Example

```typescript
import ProtectedRoute from '@/components/ProtectedRoute';

export default function AdminLayout({ children }) {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  );
}
```

---

## 🎨 UI Components

### Login Page
- Email input với icon
- Password input với icon
- Submit button với loading state
- Google sign-in button
- Link to signup page
- Error message display

### Signup Page
- Display name input
- Email input
- Password input
- Confirm password input
- Validation (password match, min length)
- Google sign-in button
- Link to login page

### Header User Menu
- User avatar với initial
- Display name
- Email
- Link to Admin Dashboard
- Sign out button
- Dropdown animation
- Click outside to close

---

## 🔒 Security

### Firebase Rules (Cần setup)

**Firestore Rules:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Posts collection
    match /posts/{postId} {
      // Anyone can read published posts
      allow read: if resource.data.status == 'published';
      
      // Only authenticated users can create/update/delete
      allow create, update, delete: if request.auth != null;
    }
    
    // Users collection
    match /users/{userId} {
      // Users can read their own data
      allow read: if request.auth != null && request.auth.uid == userId;
      
      // Users can update their own data
      allow update: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

**Storage Rules:**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /images/{allPaths=**} {
      // Anyone can read
      allow read;
      
      // Only authenticated users can upload
      allow write: if request.auth != null;
    }
  }
}
```

### Best Practices

1. **Password Requirements:**
   - Minimum 6 characters (Firebase default)
   - Consider adding: uppercase, lowercase, numbers, special chars

2. **Email Verification:**
   - Send verification email after signup
   - Require verification before admin access

3. **Session Management:**
   - Firebase handles session automatically
   - Token refresh every hour

4. **Error Handling:**
   - Display user-friendly error messages
   - Log errors for debugging
   - Don't expose sensitive info

---

## 🐛 Troubleshooting

### Lỗi: "Firebase config not found"
**Nguyên nhân:** Environment variables chưa được set

**Giải pháp:**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

### Lỗi: "Google sign-in failed"
**Nguyên nhân:** Google provider chưa được enable

**Giải pháp:**
1. Vào Firebase Console
2. Authentication > Sign-in method
3. Enable Google provider
4. Add authorized domains

### Lỗi: "Redirect loop"
**Nguyên nhân:** ProtectedRoute và auth state conflict

**Giải pháp:**
- Check loading state trước khi redirect
- Đảm bảo AuthProvider wrap toàn bộ app

### Lỗi: "User not found after signup"
**Nguyên nhân:** Auth state chưa update

**Giải pháp:**
- Firebase tự động update auth state
- Chờ onAuthStateChanged callback

---

## 📊 User Flow

### Sign Up Flow
```
1. User visits /signup
2. Fills form (name, email, password)
3. Clicks "Đăng ký"
4. Firebase creates account
5. Updates profile with display name
6. Auto sign-in
7. Redirect to /admin
```

### Sign In Flow
```
1. User visits /login
2. Enters credentials
3. Clicks "Đăng nhập"
4. Firebase authenticates
5. Auth state updates
6. Redirect to /admin
```

### Protected Route Flow
```
1. User visits /admin
2. ProtectedRoute checks auth
3. If not authenticated:
   - Show loading
   - Redirect to /login
4. If authenticated:
   - Render admin content
```

---

## 🚀 Next Steps

### Immediate
1. ⏳ Enable Google Sign-in trong Firebase Console
2. ⏳ Setup Firestore Security Rules
3. ⏳ Test authentication flow

### Short Term
4. ⏳ Add email verification
5. ⏳ Add password reset
6. ⏳ Add user profile page
7. ⏳ Add role-based access control (admin, editor, viewer)

### Long Term
8. ⏳ Add more auth providers (Facebook, GitHub)
9. ⏳ Add 2FA (Two-Factor Authentication)
10. ⏳ Add session management
11. ⏳ Add audit logs

---

## 💡 Tips

### For Users
- Sử dụng strong password
- Enable 2FA khi available
- Đăng xuất khi dùng shared computer

### For Admins
- Monitor authentication logs
- Review security rules regularly
- Keep Firebase SDK updated
- Backup user data

### For Developers
- Test all auth flows
- Handle errors gracefully
- Implement rate limiting
- Add analytics

---

## 📚 Resources

### Firebase Auth Docs
```
https://firebase.google.com/docs/auth
```

### Next.js Authentication
```
https://nextjs.org/docs/authentication
```

### Security Best Practices
```
https://firebase.google.com/docs/auth/web/security
```

---

**Created:** 2025-11-04  
**Status:** ✅ Firebase Authentication hoàn thành - Ready to use!
