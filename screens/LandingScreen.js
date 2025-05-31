import React from 'react';
import { Text, View, TouchableOpacity, Image, useColorScheme } from 'react-native';
import styles from '../styles/LandingScreenStyles';

// Màn hình chào mừng/giới thiệu ứng dụng ByteX

const LandingScreen = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

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
