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
    // Kiểm tra xem postId và userId có hợp lệ không
    if (!postId || postId === 'testPostId') {
      console.error("Invalid postId:", postId);
      throw new Error("ID bài viết không hợp lệ");
    }
    if (!userId) {
      console.error("Invalid userId:", userId);
      throw new Error("ID người dùng không hợp lệ");
    }
    console.log(`Attempting to like post: ${postId} by user: ${userId}`);
    // Kiểm tra xem người dùng đã like bài viết này chưa
    const likesRef = collection(db, 'posts', postId, 'likes');
    const q = query(likesRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    // Nếu chưa like, thêm like mới
    if (snapshot.empty) {
      const likeData = { 
        userId, 
        createdAt: Date.now() 
      };
      // Thêm like vào subcollection 'likes' của post
      const docRef = await addDoc(likesRef, likeData);
      console.log("Like added with ID:", docRef.id);
      try {
        // Cập nhật số lượng like trong document post (tăng 1)
        const postRef = doc(db, 'posts', postId);
        // Kiểm tra xem document có tồn tại không trước khi cập nhật
        const postSnap = await getDoc(postRef);
        if (postSnap.exists()) {
          await updateDoc(postRef, {
            likes: increment(1)
          });
        } else {
          console.error("Post document does not exist:", postId);
        }
      } catch (updateError) {
        // Nếu cập nhật số lượng like thất bại, chỉ log lỗi, không throw vì like đã được thêm thành công
        console.error("Error updating like count:", updateError);
      }
      return true;
    } else {
      // Nếu user đã like rồi thì không thêm nữa
      console.log("User already liked this post");
      return false;
    }
  } catch (error) {
    // Ghi log lỗi nếu có vấn đề khi like
    console.error("Error liking post:", error);
    throw error;
  }
}

// Bỏ like khỏi một bài viết
export async function unlikePost(postId, userId) {
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
      // Kiểm tra xem document có tồn tại không trước khi cập nhật
      const postSnap = await getDoc(postRef);
      if (postSnap.exists()) {
        await updateDoc(postRef, {
          likes: increment(-1)
        });
      } else {
        console.error("Post document does not exist:", postId);
      }
      return true;
    }
    // Nếu không tìm thấy like, trả về false
    return false;
  } catch (error) {
    // Ghi log lỗi nếu có vấn đề khi unlike
    console.error("Error unliking post:", error);
    throw error;
  }
}

// Kiểm tra xem người dùng đã like bài viết chưa
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

// Lấy danh sách like của một bài viết
export async function getLikes(postId) {
  try {
    // Lấy tất cả like trong subcollection 'likes', sắp xếp theo thời gian giảm dần
    const likesRef = collection(db, 'posts', postId, 'likes');
    const q = query(likesRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    // Trả về mảng các like (id và data)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    // Ghi log lỗi nếu có vấn đề khi lấy danh sách like
    console.error("Error getting likes:", error);
    return [];
  }
}

// Thêm comment vào một bài viết
export async function addComment(postId, userId, content, displayName, avatar) {
  try {
    // Tạo tham chiếu đến subcollection 'comments' của post
    const commentsRef = collection(db, 'posts', postId, 'comments');
    // Tạo dữ liệu comment
    const commentData = {
      userId,
      text: content,
      createdAt: Date.now(),
    };
    // Thêm thông tin người dùng nếu có
    if (displayName) commentData.displayName = displayName;
    if (avatar) commentData.avatar = avatar;
    // Thêm comment vào Firestore
    const docRef = await addDoc(commentsRef, commentData);
    // Cập nhật số lượng comment trong document post (tăng 1)
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      comments: increment(1)
    });
    // Trả về id của comment vừa thêm
    return docRef.id;
  } catch (error) {
    // Ghi log lỗi nếu có vấn đề khi thêm comment
    console.error("Error adding comment:", error);
    throw error;
  }
}

// Lấy danh sách comment của một bài viết (mới nhất trước)
export async function getComments(postId) {
  try {
    // Lấy tất cả comment trong subcollection 'comments', sắp xếp theo thời gian giảm dần
    const commentsRef = collection(db, 'posts', postId, 'comments');
    const q = query(commentsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    // Trả về mảng các comment (id và data)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    // Ghi log lỗi nếu có vấn đề khi lấy danh sách comment
    console.error("Error getting comments:", error);
    return [];
  }
}

// Lắng nghe likes realtime của một bài viết
export function listenLikes(postId, callback) {
  try {
    // Lắng nghe realtime subcollection 'likes' của post
    const likesRef = collection(db, 'posts', postId, 'likes');
    const q = query(likesRef, orderBy('createdAt', 'desc'));
    
    return onSnapshot(q, (snapshot) => {
      // Khi có thay đổi, trả về danh sách likes mới nhất
      const likes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(likes);
    }, (error) => {
      // Ghi log lỗi nếu có vấn đề khi lắng nghe
      console.error("Error listening to likes:", error);
      callback([]);
    });
  } catch (error) {
    // Ghi log lỗi nếu không thể thiết lập listener
    console.error("Error setting up likes listener:", error);
    return () => {};
  }
}

// Lắng nghe số lượng comment realtime của một bài viết
export function listenCommentCount(postId, callback) {
  try {
    // Lắng nghe realtime subcollection 'comments' của post
    const commentsRef = collection(db, 'posts', postId, 'comments');
    return onSnapshot(commentsRef, (snapshot) => {
      // Khi có thay đổi, trả về số lượng comment mới nhất
      callback(snapshot.size); // snapshot.size là số lượng comment
    }, (error) => {
      // Ghi log lỗi nếu có vấn đề khi lắng nghe
      console.error("Error listening to comment count:", error);
      callback(0);
    });
  } catch (error) {
    // Ghi log lỗi nếu không thể thiết lập listener
    console.error("Error setting up comment count listener:", error);
    return () => {};
  }
}

// Lắng nghe danh sách comment realtime của một bài viết
export function listenComments(postId, callback) {
  try {
    // Lắng nghe realtime subcollection 'comments' của post
    const commentsRef = collection(db, 'posts', postId, 'comments');
    const q = query(commentsRef, orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      // Khi có thay đổi, trả về danh sách comment mới nhất
      const comments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(comments);
    }, (error) => {
      // Ghi log lỗi nếu có vấn đề khi lắng nghe
      console.error("Error listening to comments:", error);
      callback([]);
    });
  } catch (error) {
    // Ghi log lỗi nếu không thể thiết lập listener
    console.error("Error setting up comments listener:", error);
    return () => {};
  }
}

// Lấy thông tin chi tiết của một bài viết
export async function getPostDetails(postId) {
  try {
    // Lấy document post từ Firestore
    const postRef = doc(db, 'posts', postId);
    const postSnap = await getDoc(postRef);
    if (postSnap.exists()) {
      const postData = { id: postSnap.id, ...postSnap.data() };
      // Lấy số lượng like và comment
      const likes = await getLikes(postId);
      const comments = await getComments(postId);
      // Trả về dữ liệu post kèm số lượng like/comment và dữ liệu chi tiết
      return {
        ...postData,
        likes: likes.length,
        comments: comments.length,
        likesData: likes,
        commentsData: comments
      };
    } else {
      // Nếu không tìm thấy post, throw lỗi
      throw new Error("Bài viết không tồn tại");
    }
  } catch (error) {
    // Ghi log lỗi nếu có vấn đề khi lấy chi tiết bài viết
    console.error("Error getting post details:", error);
    throw error;
  }
}