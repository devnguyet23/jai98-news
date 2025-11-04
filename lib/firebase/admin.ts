import * as admin from 'firebase-admin';

/**
 * Firebase Admin SDK configuration
 * Sử dụng cho server-side operations (API routes, Cloud Functions)
 */

if (!admin.apps.length) {
  // Xử lý private key - loại bỏ quotes và replace \\n thành newline thực
  let privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY || '';
  
  // Loại bỏ quotes nếu có
  if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
    privateKey = privateKey.slice(1, -1);
  }
  
  // Replace escaped newlines
  privateKey = privateKey.replace(/\\n/g, '\n');

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: privateKey,
    }),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();
export const adminStorage = admin.storage();

export default admin;
