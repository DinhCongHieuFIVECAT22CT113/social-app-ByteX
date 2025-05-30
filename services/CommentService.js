import { db } from '../config/firebaseConfig';
import { collection, addDoc, getDocs, onSnapshot } from 'firebase/firestore';

// Dịch vụ xử lý comment và like cho bài viết (Firestore)

// Thêm like vào post
export async function addLike(postId, userId) {
  const likeRef = collection(db, 'posts', postId, 'likes');
  await addDoc(likeRef, { userId, createdAt: Date.now() });
}

// Lấy danh sách like của post
export async function getLikes(postId) {
  const likeRef = collection(db, 'posts', postId, 'likes');
  const snapshot = await getDocs(likeRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Thêm comment vào post
export async function addComment(postId, comment) {
  const commentRef = collection(db, 'posts', postId, 'comments');
  await addDoc(commentRef, { ...comment, createdAt: Date.now() });
}

// Lấy danh sách comment của post
export async function getComments(postId) {
  const commentRef = collection(db, 'posts', postId, 'comments');
  const snapshot = await getDocs(commentRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Lắng nghe comment realtime cho một post
export function listenComments(postId, callback, errorCallback) {
  const commentRef = collection(db, 'posts', postId, 'comments');
  return onSnapshot(
    commentRef,
    (snapshot) => {
      const comments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(comments);
    },
    (error) => {
      if (errorCallback) errorCallback(error);
    }
  );
}