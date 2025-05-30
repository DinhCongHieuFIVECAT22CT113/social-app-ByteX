import { db } from '../config/firebaseConfig';
import { 
  collection, 
  addDoc, 
  getDocs, 
  onSnapshot, 
  query, 
  orderBy, 
  doc, 
  updateDoc, 
  increment,
  where,
  deleteDoc,
  getDoc
} from 'firebase/firestore';

// Dịch vụ xử lý comment và like cho bài viết (Firestore)

// Thêm like vào post
export async function addLike(postId, userId) {
  try {
    // Kiểm tra xem người dùng đã like bài viết này chưa
    const likesRef = collection(db, 'posts', postId, 'likes');
    const q = query(likesRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    
    // Nếu chưa like, thêm like mới
    if (snapshot.empty) {
      await addDoc(likesRef, { 
        userId, 
        createdAt: Date.now() 
      });
      
      // Cập nhật số lượng like trong document post
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        likes: increment(1)
      });
    }
  } catch (error) {
    console.error("Error adding like:", error);
    throw error;
  }
}

// Bỏ like bài viết
export async function removeLike(postId, userId) {
  try {
    // Tìm like của người dùng
    const likesRef = collection(db, 'posts', postId, 'likes');
    const q = query(likesRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    
    // Nếu tìm thấy, xóa like
    if (!snapshot.empty) {
      const likeDoc = snapshot.docs[0];
      await deleteDoc(doc(db, 'posts', postId, 'likes', likeDoc.id));
      
      // Cập nhật số lượng like trong document post
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        likes: increment(-1)
      });
    }
  } catch (error) {
    console.error("Error removing like:", error);
    throw error;
  }
}

// Kiểm tra xem người dùng đã like bài viết chưa
export async function hasUserLiked(postId, userId) {
  try {
    const likesRef = collection(db, 'posts', postId, 'likes');
    const q = query(likesRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  } catch (error) {
    console.error("Error checking if user liked post:", error);
    return false;
  }
}

// Lấy danh sách like của post
export async function getLikes(postId) {
  try {
    const likeRef = collection(db, 'posts', postId, 'likes');
    const q = query(likeRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting likes:", error);
    return [];
  }
}

// Lắng nghe like realtime cho một post
export function listenLikes(postId, callback, errorCallback) {
  try {
    const likeRef = collection(db, 'posts', postId, 'likes');
    const q = query(likeRef, orderBy('createdAt', 'desc'));
    
    return onSnapshot(
      q,
      (snapshot) => {
        const likes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(likes);
      },
      (error) => {
        console.error("Error listening to likes:", error);
        if (errorCallback) errorCallback(error);
      }
    );
  } catch (error) {
    console.error("Error setting up likes listener:", error);
    return () => {};
  }
}

// Thêm comment vào post
export async function addComment(postId, comment) {
  try {
    const commentRef = collection(db, 'posts', postId, 'comments');
    await addDoc(commentRef, { 
      ...comment, 
      createdAt: Date.now() 
    });
    
    // Cập nhật số lượng comment trong document post
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      comments: increment(1)
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
}

// Lấy danh sách comment của post
export async function getComments(postId) {
  try {
    const commentRef = collection(db, 'posts', postId, 'comments');
    const q = query(commentRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting comments:", error);
    return [];
  }
}

// Lắng nghe comment realtime cho một post
export function listenComments(postId, callback, errorCallback) {
  try {
    const commentRef = collection(db, 'posts', postId, 'comments');
    const q = query(commentRef, orderBy('createdAt', 'desc'));
    
    return onSnapshot(
      q,
      (snapshot) => {
        const comments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(comments);
      },
      (error) => {
        console.error("Error listening to comments:", error);
        if (errorCallback) errorCallback(error);
      }
    );
  } catch (error) {
    console.error("Error setting up comments listener:", error);
    return () => {};
  }
}