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

// =======================
// Thêm like vào post
// =======================
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
      
      // Cập nhật số lượng like trong document post (tăng 1)
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        likes: increment(1)
      });
    }
  } catch (error) {
    // Ghi log lỗi nếu có vấn đề khi thêm like
    console.error("Error adding like:", error);
    throw error;
  }
}

// =======================
// Bỏ like bài viết
// =======================
export async function removeLike(postId, userId) {
  try {
    // Tìm like của người dùng trong subcollection 'likes'
    const likesRef = collection(db, 'posts', postId, 'likes');
    const q = query(likesRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    
    // Nếu tìm thấy, xóa like
    if (!snapshot.empty) {
      const likeDoc = snapshot.docs[0];
      await deleteDoc(doc(db, 'posts', postId, 'likes', likeDoc.id));
      
      // Cập nhật số lượng like trong document post (giảm 1)
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        likes: increment(-1)
      });
    }
  } catch (error) {
    // Ghi log lỗi nếu có vấn đề khi bỏ like
    console.error("Error removing like:", error);
    throw error;
  }
}

// =======================
// Kiểm tra xem người dùng đã like bài viết chưa
// =======================
export async function hasUserLiked(postId, userId) {
  try {
    // Truy vấn subcollection 'likes' để kiểm tra userId
    const likesRef = collection(db, 'posts', postId, 'likes');
    const q = query(likesRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    // Nếu có kết quả, trả về true
    return !snapshot.empty;
  } catch (error) {
    // Ghi log lỗi nếu có vấn đề khi kiểm tra
    console.error("Error checking if user liked post:", error);
    return false;
  }
}

// =======================
// Lấy danh sách like của post
// =======================
export async function getLikes(postId) {
  try {
    // Lấy tất cả like trong subcollection 'likes', sắp xếp theo thời gian giảm dần
    const likeRef = collection(db, 'posts', postId, 'likes');
    const q = query(likeRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    // Trả về mảng các like (id và data)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    // Ghi log lỗi nếu có vấn đề khi lấy danh sách like
    console.error("Error getting likes:", error);
    return [];
  }
}

// =======================
// Lắng nghe like realtime cho một post
// =======================
export function listenLikes(postId, callback, errorCallback) {
  try {
    // Lắng nghe realtime subcollection 'likes' của post
    const likeRef = collection(db, 'posts', postId, 'likes');
    const q = query(likeRef, orderBy('createdAt', 'desc'));
    
    // Đăng ký listener onSnapshot
    return onSnapshot(
      q,
      (snapshot) => {
        // Khi có thay đổi, trả về danh sách like mới nhất
        const likes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(likes);
      },
      (error) => {
        // Ghi log lỗi và gọi callback lỗi nếu có
        console.error("Error listening to likes:", error);
        if (errorCallback) errorCallback(error);
      }
    );
  } catch (error) {
    // Ghi log lỗi nếu không thể thiết lập listener
    console.error("Error setting up likes listener:", error);
    return () => {};
  }
}

// =======================
// Thêm comment vào post
// =======================
export async function addComment(postId, comment) {
  try {
    // Kiểm tra xem postId có hợp lệ không
    if (!postId || postId === 'testPostId') {
      console.error("Invalid postId:", postId);
      throw new Error("ID bài viết không hợp lệ");
    }
    
    // Kiểm tra xem comment có đầy đủ thông tin không
    if (!comment || !comment.userId || !comment.text) {
      console.error("Invalid comment data:", comment);
      throw new Error("Dữ liệu bình luận không hợp lệ");
    }
    
    // Thêm comment vào subcollection 'comments' của post
    const commentRef = collection(db, 'posts', postId, 'comments');
    const commentData = { 
      ...comment,
      createdAt: comment.createdAt || Date.now()
    };
    
    const docRef = await addDoc(commentRef, commentData);
    console.log("Comment added with ID:", docRef.id);
    
    try {
      // Cập nhật số lượng comment trong document post (tăng 1)
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        comments: increment(1)
      });
    } catch (updateError) {
      // Ghi log lỗi nếu không thể cập nhật số lượng comment, nhưng không throw vì comment đã được thêm
      console.error("Error updating comment count:", updateError);
    }
    
    // Trả về id của comment vừa thêm
    return docRef.id;
  } catch (error) {
    // Ghi log lỗi nếu có vấn đề khi thêm comment
    console.error("Error adding comment:", error);
    throw error;
  }
}

// =======================
// Lấy danh sách comment của post
// =======================
export async function getComments(postId) {
  try {
    // Lấy tất cả comment trong subcollection 'comments', sắp xếp theo thời gian giảm dần
    const commentRef = collection(db, 'posts', postId, 'comments');
    const q = query(commentRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    // Trả về mảng các comment (id và data)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    // Ghi log lỗi nếu có vấn đề khi lấy danh sách comment
    console.error("Error getting comments:", error);
    return [];
  }
}

// =======================
// Lắng nghe comment realtime cho một post
// =======================
export function listenComments(postId, callback, errorCallback) {
  try {
    // Lắng nghe realtime subcollection 'comments' của post
    const commentRef = collection(db, 'posts', postId, 'comments');
    const q = query(commentRef, orderBy('createdAt', 'desc'));
    
    // Đăng ký listener onSnapshot
    return onSnapshot(
      q,
      (snapshot) => {
        // Khi có thay đổi, trả về danh sách comment mới nhất
        const comments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(comments);
      },
      (error) => {
        // Ghi log lỗi và gọi callback lỗi nếu có
        console.error("Error listening to comments:", error);
        if (errorCallback) errorCallback(error);
      }
    );
  } catch (error) {
    // Ghi log lỗi nếu không thể thiết lập listener
    console.error("Error setting up comments listener:", error);
    return () => {};
  }
}