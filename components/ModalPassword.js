import React from 'react';
import { View, TextInput, TouchableOpacity, Text, useColorScheme } from 'react-native';
import styles from '../styles/ModalPasswordStyles';

// Modal xác nhận mật khẩu mới

const ConfirmPasswordScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <TouchableOpacity style={styles.backBtn}>
        <Text style={styles.backIcon}>&lt;</Text>
      </TouchableOpacity>
      
      <View style={styles.inputWrapper}>
        <TextInput 
          placeholder="Nhập Mật Khẩu của Bạn" 
          secureTextEntry 
          style={[styles.input, isDark && styles.inputDark]}
          placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
        />
      </View>
      
      <View style={styles.inputWrapper}>
        <TextInput 
          placeholder="Nhập Lại Mật Khẩu của Bạn" 
          secureTextEntry 
          style={[styles.input, isDark && styles.inputDark]}
          placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
        />
      </View>
      
      <TouchableOpacity style={styles.confirmBtn}>
        <Text style={styles.confirmBtnText}>Xác Nhận</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmPasswordScreen;


