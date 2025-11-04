#!/bin/bash

# Script tự động cập nhật Firebase Admin credentials vào file .env
# Chạy: bash scripts/update-firebase-credentials.sh

echo "🔧 Đang cập nhật Firebase Admin credentials..."

# Backup file .env hiện tại
if [ -f .env ]; then
    cp .env .env.backup
    echo "✅ Đã backup file .env hiện tại -> .env.backup"
fi

# Xóa các dòng Firebase Admin cũ nếu có
sed -i.tmp '/^FIREBASE_ADMIN_PROJECT_ID=/d' .env 2>/dev/null
sed -i.tmp '/^FIREBASE_ADMIN_CLIENT_EMAIL=/d' .env 2>/dev/null
sed -i.tmp '/^FIREBASE_ADMIN_PRIVATE_KEY=/d' .env 2>/dev/null
rm -f .env.tmp 2>/dev/null

# Thêm credentials mới từ file .env.firebase-update
if [ -f .env.firebase-update ]; then
    echo "" >> .env
    echo "# Firebase Admin SDK - Updated $(date)" >> .env
    grep "^FIREBASE_ADMIN" .env.firebase-update >> .env
    echo "✅ Đã cập nhật Firebase Admin credentials vào .env"
    echo ""
    echo "📝 Các credentials đã được thêm:"
    grep "^FIREBASE_ADMIN" .env | sed 's/=.*/=***/' 
    echo ""
    echo "🔄 Bước tiếp theo:"
    echo "   1. Restart dev server: npm run dev"
    echo "   2. Test API: npm run test:api:simple"
else
    echo "❌ Không tìm thấy file .env.firebase-update"
    exit 1
fi
