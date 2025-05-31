import React from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import styles from '../styles/ModalAuthenStyles';

const VerifyEmailScreen = () => {
  const { isDarkMode } = useTheme();
  const isDark = isDarkMode;

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerText, isDark && styles.headerTextDark]}>Tiếp Tục</Text>
      </View>
      <TextInput
        style={[styles.input, isDark && styles.inputDark]}
        placeholder="Địa Chỉ Email"
        keyboardType="email-address"
        placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
      />
      <TextInput
        style={[styles.input, isDark && styles.inputDark]}
        placeholder="Nhập Mã Xác Nhận"
        placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
      />
      <TouchableOpacity style={styles.sendBtn}>
        <Text style={styles.sendBtnText}>Gửi Mã Xác Nhận</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerifyEmailScreen;


