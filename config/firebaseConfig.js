// firebaseConfig.js
// Cấu hình và khởi tạo Firebase cho toàn bộ app

// Import các hàm cần thiết từ Firebase SDK
import { initializeApp, getApps } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// Cấu hình Firebase của bạn (copy từ Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyAkIzQopZ8NMootzAUBfv95rP1Mtadti-E",
  authDomain: "social-app-bytex.firebaseapp.com",
  projectId: "social-app-bytex",
  storageBucket: "social-app-bytex.appspot.com", // Sửa lại domain đúng
  messagingSenderId: "417194317011",
  appId: "1:417194317011:web:b49abb4a0bd67155f73026",
  measurementId: "G-SLN164DJ65"
};

// Khởi tạo app Firebase với config ở trên, chỉ khi chưa có app nào
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Sử dụng initializeAuth để lưu trạng thái đăng nhập với AsyncStorage
// Kiểm tra xem auth đã được khởi tạo chưa để tránh lỗi already-initialized
import { getAuth } from "firebase/auth";

let auth;
try {
  // Thử lấy auth instance hiện có
  auth = getAuth(app);
} catch (error) {
  // Nếu chưa có, khởi tạo mới với persistence
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
}

export { auth };
export const db = getFirestore(app);        // Firestore database
// Firebase Storage đã được thay thế bằng Supabase Storage

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
