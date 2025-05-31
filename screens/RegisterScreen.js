import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { register } from '../services/AuthService';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/RegisterScreenStyles';

// RegisterScreen.js
// Màn hình đăng ký tài khoản người dùng mới

export default function ByteXRegister() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const isDark = isDarkMode;

  const handleRegister = async () => {
    setError('');
    if (!email || !password || !username) {
      setError('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp!');
      return;
    }
    try {
      await register(email, password, username);
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      // Thông báo đăng ký thành công
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      navigation.replace('Login');
    } catch (e) {
      setError('Email đã tồn tại hoặc có lỗi!');
    }
  };

  return (
    <SafeAreaView style={[
      styles.root,
      isDark ? styles.rootDark : styles.rootLight
    ]}> 
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Welcome')}>
          <Text style={{ color: '#fff', fontSize: 20 }}>←</Text>
        </TouchableOpacity>
        <Image
          source={require('../assets/logobytex-2.png')}
          style={styles.logo}
        />
        <Text style={[
          styles.subtitle,
          isDark ? styles.subtitleDark : styles.subtitleLight
        ]}>Đăng Ký Tài Khoản</Text>
        <View style={styles.formGroup}>
          <TextInput
            style={[
              styles.input,
              isDark ? styles.inputGreenDark : styles.inputGreenLight
            ]}
            placeholder="Tên Tài Khoản"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#86efac"
          />
          <TextInput
            style={[
              styles.input,
              isDark ? styles.inputGreenDark : styles.inputGreenLight
            ]}
            placeholder="Địa Chỉ Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#86efac"
          />
          <TextInput
            style={[
              styles.input,
              isDark ? styles.inputGrayDark : styles.inputGrayLight
            ]}
            placeholder="Nhập Mật Khẩu của Bạn"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#9ca3af"
          />
          <TextInput
            style={[
              styles.input,
              isDark ? styles.inputGrayDark : styles.inputGrayLight
            ]}
            placeholder="Nhập Lại Mật Khẩu của Bạn"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholderTextColor="#9ca3af"
          />
          {error ? <Text style={{ color: 'red', marginBottom: 8 }}>{error}</Text> : null}
          <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
            <Text style={styles.registerBtnText}>Đăng Ký</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.orRow}>
          <View style={[
            styles.orLine,
            isDark ? styles.orLineDark : styles.orLineLight
          ]} />
          <Text style={[
            styles.orText,
            isDark ? styles.orTextDark : styles.orTextLight
          ]}>Hoặc</Text>
          <View style={[
            styles.orLine,
            isDark ? styles.orLineDark : styles.orLineLight
          ]} />
        </View>
        <TouchableOpacity style={[
          styles.googleBtn,
          isDark ? styles.googleBtnDark : styles.googleBtnLight
        ]} onPress={() => alert('Tính năng Google sẽ sớm có!')}>
          <Image
            source={{ uri: 'https://storage.googleapis.com/a1aa/image/1c2726f5-44c4-4523-0dcb-575a4e12b488.jpg' }}
            style={styles.googleLogo}
            accessibilityLabel="Google logo with red, yellow, green and blue colors"
          />
          <Text style={[
            styles.googleText,
            isDark ? styles.googleTextDark : styles.googleTextLight
          ]}>Tiếp tục với Google</Text>
        </TouchableOpacity>
        <Text style={[
          styles.registerRow,
          isDark ? styles.registerRowDark : styles.registerRowLight
        ]}>
          Đã Có Tài Khoản{' '}
          <Text style={styles.registerLink} onPress={() => navigation.replace('Login')}>Đăng Nhập</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

