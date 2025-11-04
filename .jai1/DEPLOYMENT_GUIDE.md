# Deployment Guide - Vercel

## ✅ Đã hoàn thành

Hướng dẫn deploy dự án lên Vercel với đầy đủ cấu hình.

---

## 📋 Chuẩn bị trước deploy

### 1. Kiểm tra các yêu cầu
- ✅ Node.js >= 18.x
- ✅ Git repository (GitHub)
- ✅ Firebase project đã setup
- ✅ Algolia account đã setup

### 2. Files cần có
```
├── package.json          # Dependencies và scripts
├── next.config.js        # Next.js config
├── .gitignore            # Git ignore rules
├── .env.production       # Environment variables (không commit)
└── public/               # Static assets
```

### 3. Kiểm tra build
```bash
# Install dependencies
npm install

# Build project
npm run build

# Start production server
npm start
```

---

## 🚀 Deploy lên Vercel

### Bước 1: Tạo Vercel Account
1. Truy cập [vercel.com](https://vercel.com)
2. Sign up với GitHub account
3. Verify email

### Bước 2: Import Project
1. Click "Add New..." > "Project"
2. Click "Continue with GitHub"
3. Install Vercel for GitHub (nếu chưa)
4. Chọn repository `jai98-news`
5. Click "Import"

### Bước 3: Configure Project

**Project Settings:**
- **Framework Preset:** `Next.js`
- **Root Directory:** `/` (root)
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`
- **Development Command:** `npm run dev`

### Bước 4: Environment Variables

**Quan trọng:** Thêm các environment variables sau trong Vercel Dashboard:

1. Vào: `Project` > `Settings` > `Environment Variables`
2. Thêm từng variable:

#### Firebase Client Config
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD5mQ6BPXYYJU5qex6KIkop-6-MnWWm-Mc
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=jai98-news.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=jai98-news
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=jai98-news.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=627934466739
NEXT_PUBLIC_FIREBASE_APP_ID=1:627934466739:web:your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-H3L021MYYT
```

#### Firebase Admin SDK
```
FIREBASE_ADMIN_PROJECT_ID=jai98-news
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-fbsvc@jai98-news.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCh7OovMY3s6vE+\n+siUe4287xiF///yBAMtmKN5jXEKQz6PIfIvHS/q5oSoHq7Kha6Gh0gfXoyXfMOG\nsForTqp9W7O26oKECgqh9vSWtdXD3XXUs4jVG/712o5K+nBMnlXS39RveMHAtSaS\n3WtGnmWLvIdFreuhJOW0IGd1eJjFsimh1EV0g+A8XVZJ3A5x7R5SrtrLdbwRnMSv\nsc1uJUaIpkxKhAWBoVOq5NFZB6eEIgu7NZnz83TPtvqL7Guv8SbJeT/qZrxEv2CR\nLQ6SXSkVhOIc6tJo4cZzDP0PBdH5XirYEzI+gO8o4+B82YoSVDwliVxFgt3+WuLd\nRT+p2WF9AgMBAAECggEAEeMRZYA0XNkBKENct+ZEHHxO+bJzTAE8dqN3X3yL4aXW\n+cm2rpSrT+gB/G5TQaTtyAeWpHx1zGAoWy8M7t7EP4/LNOgH3d0cGpMkpqdUg0vp\n8cKZWW07x13KvSaYFCajdWVrWpr80DRSnAOgj478yahcSwqwzj68rx6rPxNA0Qm1\nvnpqQD1sDsiiTPVGISWGhSMZIWaXgMOwpHnRVtH46lpM7J7PMAKbyCpGug3UXslF\nxWrruOQgGXnf2aucaOCel9b2tMh+t4Y+Gk64d1WVhKra+4NeoW3GNvhlQXiiqguU\nblxlLphiOzKkqgZrNndzQvVQozI/VPfp7lmcRoxEwwKBgQDVb1wvRIivkwdcp9MF\nlDkZ+JXgXL0XXUg77nGl44+tW2+gXHAONIh90JS6jpMddPGJCJFqI2VmdN9yp47z\nryetqYrjpN+p/0eX0TU3E78i+UnhDa2SuQw7nqs3+blAkBrvNfuSjS5mhdlZtMec\n0+IhrAeukmb0ie3INX1VBWMH7wKBgQDCN82VM16rV1Na+uVwrDWO5I0zxXSO3605\nalVTLDF/xoicujG/S3pDiN+E8rZeFUjIwpCge7XSCsjGBU5HNFxduJE3aobAzDJm\nenQcPEt+xc+xtnyqJmMbcyI8HWsdmH8+CjPt4J28eVqyLpAEhBEdxDkK4H/p1gz+\ntd78TMghUwKBgQCqps9eO73OJBDO1KC05T6CtW+gZIYMGFmZEZ1stfY69dDatw4h\nTX+UmSFRyI14D/jPSDp8UrDQqsG+Oprh3DotcFHMkhcDJUlo6a1SzEcW/5tChl0x\n4yMUyFi9+L1WEeJ3QQJUuu1Oq9aNEy5HBmLX6WR7ADOxclbcrWf4gsYboQKBgQCm\nuosVS604wFXBo+O2D1BHJDOHvznpsWGfCYbISQcRXxlGGp28UApc0bK5Cje+mt0J\n4+WOr8UN1M45GLLzc6LbniekACJAfsvBp9vnpWdWJHDBahypYRzxoqxAGS0skg6h\n7tZXnt0qwK84ibp+9fVPrXUevk1xK52qR+1ugGfKGwKBgHKBm1DgofjhFeA2Io3R\nNudxjeuL77C/weOZgGX89J7r63A651B3hewrZBDMQJrpPgKXtz60f8pxpgrGguqT\ncq6kc61Hf1T7hdsDVsHY6bJ6cJVNn1TmXBICBW6vBZ71hrjcKjb3PipP7zfXxIIG\nOK/4OO3Wdx+Onoe+M7oX1Orj\n-----END PRIVATE KEY-----\n"
```

#### Algolia Config
```
NEXT_PUBLIC_ALGOLIA_APP_ID=4O5LDHYJ36
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=1614fe9ec3d78083a2ee9dcd3b42676a
ALGOLIA_ADMIN_KEY=d6a687bcfb841e7cada491d4fe5182c0
```

#### Site Config
```
NEXT_PUBLIC_SITE_URL=https://your-project-name.vercel.app
NEXT_PUBLIC_APP_URL=https://your-project-name.vercel.app
NODE_ENV=production
```

**Lưu ý quan trọng:**
- Đặt Environment Variables cho cả `Production` và `Preview`
- `FIREBASE_ADMIN_PRIVATE_KEY` phải giữ nguyên format với `\n`
- Không commit keys vào Git

### Bước 5: Deploy
1. Click "Deploy"
2. Chờ build hoàn tất (~2-5 phút)
3. Truy cập URL được cung cấp

---

## 🧪 Sau khi deploy

### 1. Kiểm tra các chức năng
- ✅ Trang chủ (`/`)
- ✅ Blog listing (`/blog`)
- ✅ Blog detail (`/blog/:slug`)
- ✅ Search (`/search`)
- ✅ Admin dashboard (`/admin`)

### 2. Test API endpoints
```bash
# Test Firebase API
curl https://your-site.vercel.app/api/firebase/posts

# Test Algolia search
curl "https://your-site.vercel.app/api/search?q=react"
```

### 3. Sync Algolia index
```bash
# Chạy script để sync posts lên Algolia
npm run sync:algolia
```

---

## 🔧 Troubleshooting

### Lỗi: "Failed to compile"
**Nguyên nhân:** Thiếu environment variables
**Giải pháp:**
1. Kiểm tra Vercel Environment Variables
2. Đảm bảo tất cả keys đã được thêm
3. Redeploy project

### Lỗi: "Firebase config not found"
**Nguyên nhân:** NEXT_PUBLIC_FIREBASE_* variables chưa được set
**Giải pháp:**
1. Thêm Firebase config vào Vercel
2. Chọn đúng environment (Production/Preview)
3. Redeploy

### Lỗi: "Algolia search failed"
**Nguyên nhân:** Algolia keys không đúng
**Giải pháp:**
1. Kiểm tra Algolia App ID và Search Key
2. Đảm bảo keys có quyền đọc
3. Redeploy

### Lỗi: "API 500 Internal Server Error"
**Nguyên nhân:** Firebase Admin SDK không hợp lệ
**Giải pháp:**
1. Kiểm tra FIREBASE_ADMIN_PRIVATE_KEY format
2. Đảm bảo giữ nguyên `\n` characters
3. Verify client email và project ID

---

## 🔄 Update & Redeploy

### Khi có code mới
```bash
# Push code lên GitHub
git add .
git commit -m "Update: New features"
git push origin main
```

### Vercel sẽ tự động deploy
- GitHub integration sẽ trigger deploy
- Xem progress tại Vercel Dashboard

### Manual deploy
1. Vào Vercel Dashboard
2. Chọn Project
3. Click "Deployments"
4. Click "Redeploy"

---

## 🛡️ Security Best Practices

### 1. Environment Variables
- ✅ Chỉ set cần thiết cho Production/Preview
- ✅ Không commit secrets vào Git
- ✅ Regenerate keys khi bị expose

### 2. Firebase Security
- ✅ Sử dụng Firebase Rules
- ✅ Limit API key permissions
- ✅ Monitor usage

### 3. Algolia Security
- ✅ Sử dụng Search-only key cho client
- ✅ Admin key chỉ dùng server-side
- ✅ Regular key rotation

---

## 📊 Monitoring

### Vercel Analytics
- Tự động được enable
- Xem tại Dashboard > Analytics
- Metrics: Visitors, Performance, etc.

### Firebase Monitoring
- Firebase Console > Analytics
- Track user engagement
- Monitor API usage

### Algolia Monitoring
- Algolia Dashboard > Analytics
- Track search queries
- Monitor performance

---

## 🚀 Production Tips

### 1. Custom Domain
1. Mua domain (hoặc dùng hiện có)
2. Vào Vercel Dashboard > Project > Settings > Domains
3. Thêm domain
4. Cập nhật DNS records

### 2. SSL Certificate
- Tự động được cấp bởi Vercel
- Không cần cấu hình thêm

### 3. Performance Optimization
- Next.js Image Optimization tự động
- ISR (Incremental Static Regeneration)
- CDN caching

### 4. Backup Strategy
- Git repository là backup chính
- Regular database exports
- Environment variables documentation

---

## 📈 Scaling Considerations

### Traffic Increase
- Vercel tự động scale
- Firebase có generous free tier
- Algolia có usage-based pricing

### Database Growth
- Firestore scales automatically
- Monitor document counts
- Consider composite indexes

### Search Performance
- Algolia handles millions of records
- Configure replicas for better performance
- Use caching strategies

---

## 🎯 Next Steps

### Immediate
1. ✅ Deploy to Vercel
2. ✅ Test all functionalities
3. ✅ Sync Algolia index

### Short Term
4. ⏳ Add custom domain
5. ⏳ Setup monitoring alerts
6. ⏳ Configure backup strategy

### Long Term
7. ⏳ Add CI/CD pipeline
8. ⏳ Implement performance monitoring
9. ⏳ Setup staging environment

---

## 📚 Resources

### Vercel Documentation
```
https://vercel.com/docs
```

### Next.js Deployment
```
https://nextjs.org/docs/deployment
```

### Firebase Security
```
https://firebase.google.com/docs/security
```

### Algolia Search
```
https://www.algolia.com/doc/
```

---

## 💡 Tips

### Deployment Checklist
- [ ] Environment variables added
- [ ] Firebase config verified
- [ ] Algolia keys verified
- [ ] Custom domain (nếu có)
- [ ] All APIs tested
- [ ] Search functionality working

### Post-Deployment
- [ ] Sync Algolia index
- [ ] Test admin dashboard
- [ ] Monitor logs
- [ ] Setup analytics

### Security
- [ ] Regenerate exposed keys
- [ ] Limit API key scopes
- [ ] Enable Firebase rules

---

**Created:** 2025-11-04  
**Status:** ✅ Deployment guide hoàn thành - Ready to deploy!
