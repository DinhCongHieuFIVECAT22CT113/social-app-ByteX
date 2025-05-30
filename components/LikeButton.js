import React from 'react';

function LikeButton() {
  // Hàm xử lý khi người dùng nhấn nút Like
  const handleLike = () => {
    // Kiểm tra xem trình duyệt có hỗ trợ Vibration API không
    if ('vibrate' in navigator) {
      // Rung thiết bị trong 200 mili giây
      navigator.vibrate(200);
    }
    // Có thể thêm các logic khác khi Like ở đây
  };

  return (
    <button onClick={handleLike}>
      👍 Like
    </button>
  );
}

export default LikeButton;