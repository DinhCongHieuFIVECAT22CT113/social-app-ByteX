import { auth } from '../config/firebaseConfig';
import { updateProfile } from 'firebase/auth';
import { db } from '../config/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

// UserService.js
// Dịch vụ cập nhật thông tin người dùng (profile, bio) trên Firebase Auth và Firestore

// =======================
// Cập nhật thông tin profile trên Firebase Auth (displayName, avatar)
// Tham số: object chứa displayName và photoURL mới
// Nếu chưa đăng nhập, ném lỗi
// =======================
export async function updateUserProfile({ displayName, photoURL }) {
  if (!auth.currentUser) throw new Error('No user logged in'); // Kiểm tra người dùng đã đăng nhập chưa
  await updateProfile(auth.currentUser, { displayName, photoURL }); // Cập nhật thông tin trên Firebase Auth
}

// =======================
// Cập nhật thông tin mở rộng (bio, v.v.) trên Firestore
// uid: id người dùng
// Tham số: object chứa các trường cần cập nhật (ví dụ: bio)
// =======================
export async function updateUserFirestore(uid, { bio }) {
  const userRef = doc(db, 'users', uid); // Tham chiếu đến document user theo uid
  await updateDoc(userRef, { bio }); // Cập nhật trường bio trên Firestore
}