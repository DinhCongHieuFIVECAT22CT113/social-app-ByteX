import { db } from '../config/firebaseConfig';
import { collection, addDoc, getDocs, query, orderBy, limit, startAfter } from 'firebase/firestore';

// Thêm post mới
export async function addPost(postData) {
  const postsRef = collection(db, 'posts');
  const docRef = await addDoc(postsRef, {
    ...postData,
    createdAt: Date.now(),
  });
  return docRef.id;
}

// Lấy toàn bộ post (không phân trang)
export async function getPosts() {
  const postsRef = collection(db, 'posts');
  const snapshot = await getDocs(postsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Lấy danh sách post phân trang (lazy load)
export async function getPostsPaginated(pageSize = 5, lastDoc = null) {
  let q = query(
    collection(db, 'posts'),
    orderBy('createdAt', 'desc'),
    limit(pageSize)
  );
  if (lastDoc) {
    q = query(
      collection(db, 'posts'),
      orderBy('createdAt', 'desc'),
      startAfter(lastDoc),
      limit(pageSize)
    );
  }
  const snapshot = await getDocs(q);
  const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const lastVisible = snapshot.docs[snapshot.docs.length - 1];
  return { posts, lastVisible };
}