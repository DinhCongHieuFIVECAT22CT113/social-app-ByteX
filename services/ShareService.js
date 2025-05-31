import { collection, addDoc, query, where, getDocs, deleteDoc, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

// ShareService.js
// Service để xử lý chia sẻ bài viết

// Chia sẻ bài viết về trang cá nhân
export const sharePost = async (postId, userId, originalAuthorId) => {
  try {
    console.log('Sharing post:', { postId, userId, originalAuthorId });

    if (!postId || !userId) {
      throw new Error('Thiếu thông tin bài viết hoặc người dùng');
    }

    // Kiểm tra xem đã chia sẻ bài này chưa
    const existingShare = await hasUserShared(postId, userId);
    if (existingShare) {
      throw new Error('Bạn đã chia sẻ bài viết này rồi');
    }

    // Tạo bản ghi chia sẻ
    const shareData = {
      postId: String(postId),
      userId: String(userId), // Người chia sẻ
      originalAuthorId: String(originalAuthorId || userId), // Tác giả gốc
      createdAt: Date.now(),
      type: 'share'
    };

    console.log('Creating share with data:', shareData);

    // Thêm vào collection shares
    const shareRef = await addDoc(collection(db, 'shares'), shareData);

    // Cập nhật số lượng share trong bài viết gốc
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      shares: increment(1)
    });

    console.log('Post shared successfully:', shareRef.id);
    return { success: true, shareId: shareRef.id };

  } catch (error) {
    console.error('Error sharing post:', error);

    // Xử lý lỗi cụ thể
    if (error.code === 'permission-denied') {
      throw new Error('Không có quyền chia sẻ bài viết. Vui lòng kiểm tra cài đặt bảo mật.');
    } else if (error.code === 'not-found') {
      throw new Error('Không tìm thấy bài viết để chia sẻ.');
    } else {
      throw new Error(error.message || 'Không thể chia sẻ bài viết. Vui lòng thử lại.');
    }
  }
};

// Hủy chia sẻ bài viết
export const unsharePost = async (postId, userId) => {
  try {
    console.log('Unsharing post:', { postId, userId });
    
    // Tìm bản ghi chia sẻ
    const sharesRef = collection(db, 'shares');
    const q = query(
      sharesRef,
      where('postId', '==', postId),
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      throw new Error('Không tìm thấy bản ghi chia sẻ');
    }
    
    // Xóa bản ghi chia sẻ
    const shareDoc = querySnapshot.docs[0];
    await deleteDoc(shareDoc.ref);
    
    // Giảm số lượng share trong bài viết gốc
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      shares: increment(-1)
    });
    
    console.log('Post unshared successfully');
    return { success: true };
    
  } catch (error) {
    console.error('Error unsharing post:', error);
    throw error;
  }
};

// Kiểm tra xem user đã chia sẻ bài viết chưa
export const hasUserShared = async (postId, userId) => {
  try {
    if (!postId || !userId) {
      console.log('Missing postId or userId for share check');
      return false;
    }

    const sharesRef = collection(db, 'shares');
    const q = query(
      sharesRef,
      where('postId', '==', postId),
      where('userId', '==', userId)
    );

    const querySnapshot = await getDocs(q);
    const hasShared = !querySnapshot.empty;
    console.log(`User ${userId} has shared post ${postId}: ${hasShared}`);
    return hasShared;

  } catch (error) {
    console.error('Error checking if user shared:', error);

    // Xử lý lỗi permissions cụ thể
    if (error.code === 'permission-denied') {
      console.error('Permission denied for shares collection. Please check Firestore rules.');
    }

    return false;
  }
};

// Lấy danh sách bài viết đã chia sẻ của user
export const getUserSharedPosts = async (userId) => {
  try {
    const sharesRef = collection(db, 'shares');
    const q = query(
      sharesRef,
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    const sharedPosts = [];
    
    querySnapshot.forEach((doc) => {
      sharedPosts.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    console.log('User shared posts retrieved:', sharedPosts.length);
    return sharedPosts;
    
  } catch (error) {
    console.error('Error getting user shared posts:', error);
    return [];
  }
};

// Lấy số lượng share của một bài viết
export const getShareCount = async (postId) => {
  try {
    const sharesRef = collection(db, 'shares');
    const q = query(sharesRef, where('postId', '==', postId));
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
    
  } catch (error) {
    console.error('Error getting share count:', error);
    return 0;
  }
};

// Toggle share/unshare
export const toggleShare = async (postId, userId, originalAuthorId) => {
  try {
    const hasShared = await hasUserShared(postId, userId);
    
    if (hasShared) {
      await unsharePost(postId, userId);
      return { action: 'unshared', shared: false };
    } else {
      await sharePost(postId, userId, originalAuthorId);
      return { action: 'shared', shared: true };
    }
    
  } catch (error) {
    console.error('Error toggling share:', error);
    throw error;
  }
};
