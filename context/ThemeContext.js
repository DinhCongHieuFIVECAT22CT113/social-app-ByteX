import React, { createContext, useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tạo context cho theme
export const ThemeContext = createContext();

// Tạo provider component
export function ThemeProvider({ children }) {
  // Lấy chế độ màu từ hệ thống
  const systemColorScheme = useColorScheme();
  
  // State để lưu chế độ dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);
  // State để lưu chế độ theo hệ thống hay tùy chỉnh
  const [isSystemTheme, setIsSystemTheme] = useState(true);
  
  // Lấy theme từ AsyncStorage khi component mount
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const themeData = await AsyncStorage.getItem('themePreference');
        if (themeData !== null) {
          const { isDark, isSystem } = JSON.parse(themeData);
          setIsSystemTheme(isSystem);
          setIsDarkMode(isSystem ? systemColorScheme === 'dark' : isDark);
        } else {
          // Mặc định theo hệ thống
          setIsSystemTheme(true);
          setIsDarkMode(systemColorScheme === 'dark');
        }
      } catch (error) {
        console.error('Error loading theme preference:', error);
      }
    };
    
    loadThemePreference();
  }, [systemColorScheme]);
  
  // Cập nhật theme khi systemColorScheme thay đổi và đang ở chế độ theo hệ thống
  useEffect(() => {
    if (isSystemTheme) {
      setIsDarkMode(systemColorScheme === 'dark');
    }
  }, [systemColorScheme, isSystemTheme]);
  
  // Hàm toggle dark mode
  const toggleDarkMode = useCallback(async () => {
    try {
      const newDarkMode = !isDarkMode;
      setIsDarkMode(newDarkMode);
      setIsSystemTheme(false);
      await AsyncStorage.setItem('themePreference', JSON.stringify({
        isDark: newDarkMode,
        isSystem: false
      }));
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  }, [isDarkMode]);
  
  // Hàm chuyển sang chế độ theo hệ thống
  const setSystemTheme = useCallback(async () => {
    try {
      setIsSystemTheme(true);
      setIsDarkMode(systemColorScheme === 'dark');
      await AsyncStorage.setItem('themePreference', JSON.stringify({
        isDark: systemColorScheme === 'dark',
        isSystem: true
      }));
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  }, [systemColorScheme]);
  
  // Giá trị context
  const themeContextValue = useMemo(() => ({
    isDarkMode,
    isSystemTheme,
    toggleDarkMode,
    setSystemTheme
  }), [isDarkMode, isSystemTheme, toggleDarkMode, setSystemTheme]);
  
  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook để sử dụng theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}