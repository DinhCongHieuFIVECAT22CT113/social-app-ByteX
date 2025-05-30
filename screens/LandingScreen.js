import React from 'react';
import { Text, View, TouchableOpacity, Image, useColorScheme } from 'react-native';
import styles from '../styles/LandingScreenStyles';

// Màn hình chào mừng/giới thiệu ứng dụng ByteX

const LandingScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View
      style={[
        styles.root,
        isDark ? styles.rootDark : styles.rootLight
      ]}
    >
      {/* Logo Section */}
      <View style={styles.logoRow}>
        <Text style={[
          styles.logoText,
          isDark ? styles.logoTextDark : styles.logoTextLight
        ]}>BYTE</Text>
        <Text style={styles.logoX}>X</Text>
      </View>
      
      {/* Hands Image */}
      <Image
        source={{ uri: 'https://example.com/handshake-image.jpg' }} // Thay link ảnh thực tế nếu cần
        style={styles.image}
      />
      
      {/* Text Section */}
      <Text
        style={[
          styles.title,
          isDark ? styles.titleDark : styles.titleLight
        ]}
      >
        Nơi Kết Nối Mọi Người Với Nhau
      </Text>
      
      {/* Button */}
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Bắt Đầu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LandingScreen;
