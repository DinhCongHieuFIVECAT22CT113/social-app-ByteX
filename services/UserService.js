import { auth } from '../config/firebaseConfig';
import { updateProfile } from 'firebase/auth';
import { db } from '../config/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

// UserService.js
// Dịch vụ cập nhật thông tin người dùng (profile, bio) trên Firebase Auth và Firestore

// Cập nhật thông tin profile trên Firebase Auth (displayName, avatar)
export async function updateUserProfile({ displayName, photoURL }) {
  if (!auth.currentUser) throw new Error('No user logged in');
  await updateProfile(auth.currentUser, { displayName, photoURL });
}

// Cập nhật thông tin mở rộng (bio, v.v.) trên Firestore
export async function updateUserFirestore(uid, { bio }) {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, { bio });
}