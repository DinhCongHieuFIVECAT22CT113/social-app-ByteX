// PostInteractionService.js
// Dịch vụ xử lý tương tác bài viết: like, unlike, comment, lắng nghe comment realtime
import { db } from '../config/firebaseConfig';
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  orderBy, 
  serverTimestamp, 
  onSnapshot, 
  where, 
  updateDoc,
  increment,
  getDoc
} from 'firebase/firestore';

// Thêm like vào một bài viết
export async function likePost(postId, userId) {
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
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error("Error liking post:", error);
    throw error;
  }
}

// Bỏ like khỏi một bài viết
export async function unlikePost(postId, userId) {
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
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error("Error unliking post:", error);
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

// Lấy danh sách like của một bài viết
export async function getLikes(postId) {
  try {
    const likesRef = collection(db, 'posts', postId, 'likes');
    const q = query(likesRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting likes:", error);
    return [];
  }
}

// Thêm comment vào một bài viết
export async function addComment(postId, userId, content, displayName, avatar) {
  try {
    const commentsRef = collection(db, 'posts', postId, 'comments');
    const commentData = {
      userId,
      text: content,
      createdAt: Date.now(),
    };
    
    // Thêm thông tin người dùng nếu có
    if (displayName) commentData.displayName = displayName;
    if (avatar) commentData.avatar = avatar;
    
    const docRef = await addDoc(commentsRef, commentData);
    
    // Cập nhật số lượng comment trong document post
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      comments: increment(1)
    });
    
    return docRef.id;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
}

// Lấy danh sách comment của một bài viết (mới nhất trước)
export async function getComments(postId) {
  try {
    const commentsRef = collection(db, 'posts', postId, 'comments');
    const q = query(commentsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting comments:", error);
    return [];
  }
}

// Lắng nghe số lượng comment realtime của một bài viết
export function listenCommentCount(postId, callback) {
  try {
    const commentsRef = collection(db, 'posts', postId, 'comments');
    return onSnapshot(commentsRef, (snapshot) => {
      callback(snapshot.size); // snapshot.size là số lượng comment
    }, (error) => {
      console.error("Error listening to comment count:", error);
      callback(0);
    });
  } catch (error) {
    console.error("Error setting up comment count listener:", error);
    return () => {};
  }
}

// Lắng nghe danh sách comment realtime của một bài viết
export function listenComments(postId, callback) {
  try {
    const commentsRef = collection(db, 'posts', postId, 'comments');
    const q = query(commentsRef, orderBy('createdAt', 'desc'));
    
    return onSnapshot(q, (snapshot) => {
      const comments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(comments);
    }, (error) => {
      console.error("Error listening to comments:", error);
      callback([]);
    });
  } catch (error) {
    console.error("Error setting up comments listener:", error);
    return () => {};
  }
}

// Lấy thông tin chi tiết của một bài viết
export async function getPostDetails(postId) {
  try {
    const postRef = doc(db, 'posts', postId);
    const postSnap = await getDoc(postRef);
    
    if (postSnap.exists()) {
      const postData = { id: postSnap.id, ...postSnap.data() };
      
      // Lấy số lượng like và comment
      const likes = await getLikes(postId);
      const comments = await getComments(postId);
      
      return {
        ...postData,
        likes: likes.length,
        comments: comments.length,
        likesData: likes,
        commentsData: comments
      };
    } else {
      throw new Error("Bài viết không tồn tại");
    }
  } catch (error) {
    console.error("Error getting post details:", error);
    throw error;
  }
}