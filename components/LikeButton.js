// LikeButton.js
// Nút Like, có hiệu ứng rung khi nhấn, đổi màu khi đã like, nhận props từ cha
// 🎓 Đề thi: Tương tác bài viết (Like)

import React from 'react';
import { TouchableOpacity, Text, Vibration } from 'react-native';

/**
 * LikeButton component
 * @param {string} postId - ID bài viết
 * @param {string} userId - ID người dùng
 * @param {boolean} liked - Đã like chưa
 * @param {number} likeCount - Số lượt like
 * @param {function} onToggleLike - Callback khi nhấn like/unlike
 */
function LikeButton({ postId, userId, liked, likeCount, onToggleLike }) {
  // Xử lý khi nhấn nút Like
  const handleLike = async () => {
    if (!userId) return; // Yêu cầu đăng nhập
    try {
      await onToggleLike(); // Gọi callback từ cha để xử lý like/unlike
      Vibration.vibrate(100); // Rung khi like
    } catch (e) {
      // Có thể show thông báo lỗi nếu cần
    }
  };

  return (
    <TouchableOpacity
      onPress={handleLike}
      style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}
      accessibilityLabel={liked ? 'Bỏ thích bài viết' : 'Thích bài viết'}
    >
      <Text style={{ fontSize: 18, color: liked ? '#e11d48' : '#2563eb', fontWeight: 'bold' }}>
        {liked ? '❤️' : '🤍'}
      </Text>
      <Text style={{ marginLeft: 6, fontSize: 16, color: liked ? '#e11d48' : '#111827' }}>
        {likeCount} Like
      </Text>
    </TouchableOpacity>
  );
}

export default LikeButton;