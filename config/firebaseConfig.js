// firebaseConfig.js
// Cấu hình và khởi tạo Firebase cho toàn bộ app

// Import các hàm cần thiết từ Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Cấu hình Firebase của bạn (copy từ Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyAkIzQopZ8NMootzAUBfv95rP1Mtadti-E",
  authDomain: "social-app-bytex.firebaseapp.com",
  projectId: "social-app-bytex",
  storageBucket: "social-app-bytex.firebasestorage.app",
  messagingSenderId: "417194317011",
  appId: "1:417194317011:web:b49abb4a0bd67155f73026",
  measurementId: "G-SLN164DJ65"
};

// Khởi tạo app Firebase với config ở trên
const app = initializeApp(firebaseConfig);


// Khởi tạo các service Firebase bạn sẽ dùng
export const auth = getAuth(app);          // Xác thực người dùng (Auth)
export const db = getFirestore(app);        // Firestore database
export const storage = getStorage(app);     // Firebase Storage (upload ảnh) nhưng đang không dùng vì chưa update tài khoản lên pro

// Nếu bạn không dùng Analytics thì không cần xuất nó
// Nếu muốn dùng, bạn import getAnalytics và export ở đây luôn
// import { getAnalytics } from "firebase/analytics";
// export const analytics = getAnalytics(app);

export default app;



// Giải thích:
// initializeApp(firebaseConfig): khởi tạo app Firebase với cấu hình bạn cung cấp.

// getAuth(app): dùng để thao tác với đăng nhập, đăng ký (Firebase Authentication).

// getFirestore(app): thao tác với Firestore database để lưu bài đăng, comment,...

// getStorage(app): upload ảnh lên Firebase Storage.

// Export từng phần để các file khác có thể import dùng trực tiếp, ví dụ:


// import { auth, db, storage } from './firebaseConfig';
