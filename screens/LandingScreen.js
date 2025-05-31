import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import styles from '../styles/LandingScreenStyles';

// Màn hình chào mừng/giới thiệu ứng dụng ByteX

const LandingScreen = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const isDark = isDarkMode;

  const handleStart = () => {
    navigation.replace('Login');
  };

  return (
    <View
      style={[
        styles.root,
        isDark ? styles.rootDark : styles.rootLight
      ]}
    >
      {/* Logo Section */}
      <View style={styles.logoRow}>
        <Image
          source={require('../assets/logobytex-1.png')}
          style={styles.logoImage}
        />
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
      <TouchableOpacity style={styles.btn} onPress={handleStart}>
        <Text style={styles.btnText}>Bắt Đầu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LandingScreen;
