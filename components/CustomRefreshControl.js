// CustomRefreshControl.js
// Component tùy chỉnh cho RefreshControl để tránh lỗi hook

import React from 'react';
import { RefreshControl } from 'react-native';

// Tạo component riêng để tránh lỗi hook
function CustomRefreshControl({ refreshing, onRefresh, colors, tintColor }) {
  return (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={colors}
      tintColor={tintColor}
    />
  );
}

export default CustomRefreshControl;