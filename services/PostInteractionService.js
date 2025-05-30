// PostInteractionService.js
// Dịch vụ xử lý tương tác bài viết: like, unlike, comment, lắng nghe comment realtime
import { db } from '../config/firebaseConfig';
import { collection, addDoc, deleteDoc, doc, getDocs, query, orderBy, serverTimestamp, onSnapshot } from 'firebase/firestore';

// Thêm like vào một bài viết
export async function likePost(postId, userId) {
  const likesRef = collection(db, 'posts', postId, 'likes');
  await addDoc(likesRef, { userId, createdAt: serverTimestamp() });
}

// Bỏ like khỏi một bài viết
export async function unlikePost(postId, likeDocId) {
  const likeRef = doc(db, 'posts', postId, 'likes', likeDocId);
  await deleteDoc(likeRef);
}

// Lấy danh sách like của một bài viết
export async function getLikes(postId) {
  const likesRef = collection(db, 'posts', postId, 'likes');
  const snapshot = await getDocs(likesRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Thêm comment vào một bài viết
export async function addComment(postId, userId, content) {
  const commentsRef = collection(db, 'posts', postId, 'comments');
  await addDoc(commentsRef, {
    userId,
    content,
    createdAt: serverTimestamp(),
  });
}

// Lấy danh sách comment của một bài viết (mới nhất trước)
export async function getComments(postId) {
  const commentsRef = collection(db, 'posts', postId, 'comments');
  const q = query(commentsRef, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Lắng nghe số lượng comment realtime của một bài viết
export function listenCommentCount(postId, callback) {
  const commentsRef = collection(db, 'posts', postId, 'comments');
  return onSnapshot(commentsRef, (snapshot) => {
    callback(snapshot.size); // snapshot.size là số lượng comment
  });
}