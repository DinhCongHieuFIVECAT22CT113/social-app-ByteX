import { db } from '../config/firebaseConfig';
import { collection, addDoc, getDocs, doc } from 'firebase/firestore';

// Thêm post mới
export async function addPost(postData) {
  const postsRef = collection(db, 'posts');
  const docRef = await addDoc(postsRef, {
    ...postData,
    createdAt: Date.now(),
  });
  return docRef.id;
}

// Lấy danh sách post
export async function getPosts() {
  const postsRef = collection(db, 'posts');
  const snapshot = await getDocs(postsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}