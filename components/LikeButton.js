// LikeButton.js
// Nút Like, có hiệu ứng rung khi nhấn (dành cho web, ví dụ minh họa)

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

function LikeButton() {
  // Hàm xử lý khi người dùng nhấn nút Like
  const handleLike = () => {
    // Nếu chạy trên thiết bị thật, có thể dùng Vibration từ 'react-native'
    // Có thể thêm các logic khác khi Like ở đây
  };

  return (
    <TouchableOpacity onPress={handleLike} style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}>
      <Text style={{ fontSize: 18 }}>👍 Like</Text>
    </TouchableOpacity>
  );
}

export default LikeButton;