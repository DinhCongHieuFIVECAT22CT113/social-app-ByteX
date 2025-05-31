// theme.js
// Định nghĩa các màu sắc và style chung cho toàn bộ ứng dụng

// Màu sắc chung
export const colors = {
  // Màu chính
  primary: '#22c55e',
  primaryDark: '#16a34a',
  primaryLight: '#4ade80',
  accent: '#3b82f6',
  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#0ea5e9',
  
  // Màu nền
  background: {
    light: '#f3f4f6',
    dark: '#18181b',
  },
  
  // Màu thẻ, card
  card: {
    light: '#fff',
    dark: '#23272e',
  },
  
  // Màu văn bản
  text: {
    light: {
      primary: '#111827',
      secondary: '#6b7280',
      tertiary: '#9ca3af',
    },
    dark: {
      primary: '#f3f4f6',
      secondary: '#d1d5db',
      tertiary: '#9ca3af',
    },
  },
  
  // Màu viền
  border: {
    light: '#e5e7eb',
    dark: '#374151',
    accent: '#22c55e',
  },
  
  // Màu thông báo
  notification: {
    success: '#22c55e',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
  },
  
  // Màu tương tác
  interaction: {
    like: '#e11d48',
    comment: '#3b82f6',
    share: '#8b5cf6',
  },
};

// Spacing (khoảng cách)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  section: 56,
};

// Typography (kiểu chữ)
export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    display: 40,
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
    extraBold: '800',
  },
};

// Shadows (đổ bóng)
export const shadows = {
  light: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  },
  dark: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 3,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 5,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 9,
    },
  },
};

// Border radius (bo góc)
export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  round: 9999,
};

// Hàm lấy theme dựa trên chế độ sáng/tối
export const getTheme = (isDarkMode) => {
  return {
    colors: {
      primary: isDarkMode ? colors.primaryLight : colors.primary,
      background: isDarkMode ? colors.background.dark : colors.background.light,
      card: isDarkMode ? colors.card.dark : colors.card.light,
      text: {
        primary: isDarkMode ? colors.text.dark.primary : colors.text.light.primary,
        secondary: isDarkMode ? colors.text.dark.secondary : colors.text.light.secondary,
        tertiary: isDarkMode ? colors.text.dark.tertiary : colors.text.light.tertiary,
      },
      border: isDarkMode ? colors.border.dark : colors.border.light,
      notification: colors.notification,
      interaction: colors.interaction,
    },
    spacing,
    typography,
    shadows: isDarkMode ? shadows.dark : shadows.light,
    borderRadius,
  };
};