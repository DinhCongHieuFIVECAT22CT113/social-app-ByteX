// PostService.js
// Dịch vụ xử lý CRUD cho bài viết, phân trang, lắng nghe comment realtime

// Import các hàm cần thiết từ Firebase Firestore và cấu hình database
import { db } from '../config/firebaseConfig';
import { 
  collection, addDoc, getDocs, query, orderBy, limit, startAfter, 
  doc, updateDoc, deleteDoc, onSnapshot, where, getDoc
} from 'firebase/firestore';

// =======================
// Thêm post mới vào Firestore
// postData: object chứa thông tin bài viết (author, content, image, ...)
// Trả về: id của post vừa tạo
// =======================
export async function addPost(postData) {
  try {
    // Tạo tham chiếu đến collection 'posts'
    const postsRef = collection(db, 'posts');
    // Thêm document mới với dữ liệu postData và trường createdAt
    const docRef = await addDoc(postsRef, {
      ...postData, // Truyền toàn bộ dữ liệu bài viết từ tham số
      createdAt: Date.now(), // Thời gian tạo bài viết (timestamp)
      likes: 0, // Khởi tạo số lượt thích là 0
      comments: 0, // Khởi tạo số comment là 0
    });
    // Trả về id của document vừa tạo
    return docRef.id;
  } catch (error) {
    console.error("Error adding post:", error);
    throw error;
  }
}

// =======================
// Lấy thông tin chi tiết của một post
// postId: id của bài viết cần lấy
// Trả về: thông tin chi tiết của post
// =======================
export async function getPostById(postId) {
  try {
    // Tạo tham chiếu đến document post theo id
    const postRef = doc(db, 'posts', postId);
    // Lấy dữ liệu document từ Firestore
    const postSnap = await getDoc(postRef);
    // Kiểm tra document có tồn tại không
    if (postSnap.exists()) {
      // Trả về object gồm id và dữ liệu post
      return { id: postSnap.id, ...postSnap.data() };
    } else {
      throw new Error("Post không tồn tại");
    }
  } catch (error) {
    console.error("Error getting post:", error);
    throw error;
  }
}

// =======================
// Lấy toàn bộ post (không phân trang)
// Trả về: mảng các post
// =======================
export async function getPosts() {
  try {
    // Lấy tất cả document trong collection 'posts'
    const postsRef = collection(db, 'posts');
    // Sắp xếp theo thời gian tạo mới nhất
    const q = query(postsRef, orderBy('createdAt', 'desc'));
    // Lấy snapshot dữ liệu từ Firestore
    const snapshot = await getDocs(q);
    // Trả về mảng các post với id và dữ liệu
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting posts:", error);
    return [];
  }
}

// =======================
// Lấy danh sách post phân trang (lazy load)
// pageSize: số lượng post mỗi trang (mặc định 5)
// lastDoc: document cuối cùng của trang trước (dùng cho phân trang)
// Trả về: { posts, lastVisible } - posts là mảng post, lastVisible là doc cuối cùng
// =======================
export async function getPostsPaginated(pageSize = 5, lastDoc = null) {
  try {
    // Tạo query lấy post theo thứ tự mới nhất, giới hạn pageSize
    let q = query(
      collection(db, 'posts'),
      orderBy('createdAt', 'desc'),
      limit(pageSize)
    );
    // Nếu có lastDoc thì phân trang tiếp theo sau lastDoc
    if (lastDoc) {
      q = query(
        collection(db, 'posts'),
        orderBy('createdAt', 'desc'),
        startAfter(lastDoc),
        limit(pageSize)
      );
    }
    // Lấy dữ liệu từ Firestore
    const snapshot = await getDocs(q);
    // Map dữ liệu trả về thành mảng post
    const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // Lấy document cuối cùng để phân trang tiếp
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
    return { posts, lastVisible };
  } catch (error) {
    console.error("Error getting paginated posts:", error);
    return { posts: [], lastVisible: null };
  }
}

// =======================
// Lắng nghe danh sách bài viết realtime
// callback: hàm callback nhận vào danh sách bài viết mới nhất
// limit: số lượng bài viết tối đa muốn lắng nghe
// Trả về: hàm unsubscribe để hủy lắng nghe khi không cần nữa
// =======================
export function listenToPosts(callback, limitCount = 10) {
  try {
    // Tạo tham chiếu đến collection 'posts'
    const postsRef = collection(db, 'posts');
    // Tạo query lấy post mới nhất, giới hạn số lượng
    const q = query(
      postsRef,
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    // Đăng ký lắng nghe realtime với onSnapshot
    return onSnapshot(q, (snapshot) => {
      // Khi có thay đổi, map dữ liệu thành mảng post
      const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(posts);
    }, (error) => {
      // Xử lý lỗi khi lắng nghe
      console.error("Error listening to posts:", error);
      callback([]);
    });
  } catch (error) {
    console.error("Error setting up posts listener:", error);
    return () => {};
  }
}

// =======================
// Cập nhật post theo postId
// postId: id của bài viết cần cập nhật
// updatedData: object chứa các trường cần cập nhật
// =======================
export async function updatePost(postId, updatedData) {
  try {
    // Tạo tham chiếu đến document cần cập nhật
    const postRef = doc(db, 'posts', postId);
    // Cập nhật dữ liệu với updatedData
    await updateDoc(postRef, updatedData);
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}

// =======================
// Xóa post theo postId
// postId: id của bài viết cần xóa
// =======================
export async function deletePost(postId) {
  try {
    // Tạo tham chiếu đến document cần xóa
    const postRef = doc(db, 'posts', postId);
    // Xóa document khỏi Firestore
    await deleteDoc(postRef);
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}

// =======================
// Lắng nghe số comment của một post (auto update realtime)
// postId: id của bài viết cần lắng nghe
// callback: hàm callback nhận vào số lượng comment mới nhất
// Trả về: hàm unsubscribe để hủy lắng nghe khi không cần nữa
// =======================
export function listenCommentCount(postId, callback) {
  try {
    // Tạo query đến collection 'comments' với điều kiện postId
    const commentsRef = collection(db, 'comments');
    const q = query(commentsRef, where('postId', '==', postId));
    // Lắng nghe realtime số lượng comment
    return onSnapshot(q, (snapshot) => {
      // snapshot.size là số comment hiện tại
      callback(snapshot.size);
    }, (error) => {
      // Xử lý lỗi khi lắng nghe
      console.error("Error listening to comment count:", error);
      callback(0);
    });
  } catch (error) {
    console.error("Error setting up comment count listener:", error);
    return () => {};
  }
}