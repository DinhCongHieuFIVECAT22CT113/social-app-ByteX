// LikeButton.js
// Nút Like, có hiệu ứng rung khi nhấn, đổi màu khi đã like, nhận props từ cha
// 🎓 Đề thi: Tương tác bài viết (Like)

import React from 'react';
import { TouchableOpacity, Text, Vibration } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

/**
 * Component Nút Like
 * @param {string} postId - ID bài viết
 * @param {string} userId - ID người dùng
 * @param {boolean} liked - Đã like chưa
 * @param {number} likeCount - Số lượt like
 * @param {function} onToggleLike - Hàm callback khi nhấn like/bỏ like
 * @param {boolean} isDark - Chế độ tối
 */
function LikeButton({ postId, userId, liked, likeCount, onToggleLike, isDark = false }) {
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

  // Đảm bảo likeCount luôn là số
  const displayCount = typeof likeCount === 'number' ? likeCount : 
                      (Array.isArray(likeCount) ? likeCount.length : 0);
                      
  return (
    <TouchableOpacity
      onPress={handleLike}
      style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 8,
        backgroundColor: liked ? 'rgba(225, 29, 72, 0.1)' : 'transparent',
        borderRadius: 8,
      }}
      accessibilityLabel={liked ? 'Bỏ thích bài viết' : 'Thích bài viết'}
    >
      <FontAwesomeIcon 
        icon={faThumbsUp} 
        size={18} 
        color={liked ? '#e11d48' : isDark ? '#fff' : '#111827'} 
      />
      <Text style={{ 
        marginLeft: 6, 
        fontSize: 16, 
        color: liked ? '#e11d48' : isDark ? '#f3f4f6' : '#111827',
        fontWeight: liked ? '600' : 'normal'
      }}>
        {displayCount} {liked ? 'Đã thích' : 'Thích'}
      </Text>
    </TouchableOpacity>
  );
}

export default LikeButton;