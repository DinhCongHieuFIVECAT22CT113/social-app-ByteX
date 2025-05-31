import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, useColorScheme, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { register, login } from '../services/AuthService';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/LoginScreenStyles';

// LoginScreen.js
// Màn hình đăng nhập tài khoản người dùng

export default function ByteXLogin() {
  const [username, setUsername] = useState('abc123');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleLogin = async () => {
    setError('');
    try {
      // Đăng nhập bằng email và password
      await login(email, password);
      navigation.replace('Home');
    } catch (e) {
      setError('Sai email hoặc mật khẩu!');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ backgroundColor: isDark ? '#18181b' : '#fff' }}
    >
      <View style={styles.container}>
        <TouchableOpacity
          accessibilityLabel="Back"
          style={styles.backBtn}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <FontAwesomeIcon icon={faArrowLeft} size={20} color="white" />
        </TouchableOpacity>
        {/* Logo Section */}
        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 24 }}>
          <Image
            source={require('../assets/logobytex-2.png')}
            style={{ width: 160, height: 80, resizeMode: 'contain' }}
          />
        </View>
        {/* End Logo Section */}
        <Text style={[styles.subtitle, { color: isDark ? '#d1d5db' : '#6b7280', textAlign: 'center', marginBottom: 32, fontSize: 14 }]}>Đăng Nhập Tài Khoản</Text>
        <View style={styles.formGroup}>
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, isDark ? styles.inputDark : styles.inputLight]}
              value={email}
              onChangeText={setEmail}
              autoComplete="off"
              autoCapitalize="none"
              placeholder="Nhập email của bạn"
              placeholderTextColor={isDark ? '#d1d5db' : '#000'}
            />
          </View>
          <View>
            <Text style={styles.label}>Mật khẩu</Text>
            <TextInput
              style={[styles.input, isDark ? styles.inputDark : styles.inputLight]}
              value={password}
              onChangeText={setPassword}
              placeholder="Nhập Mật Khẩu của Bạn"
              placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
              secureTextEntry
              autoComplete="off"
              autoCapitalize="none"
            />
          </View>
          {error ? <Text style={{ color: 'red', marginBottom: 8 }}>{error}</Text> : null}
          <TouchableOpacity onPress={() => Alert.alert('Thông báo', 'Tính năng quên mật khẩu sẽ sớm có!')}>
            <Text style={styles.forgotText}>Quên Mật Khẩu ?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginBtn}
            activeOpacity={0.8}
            onPress={handleLogin}
          >
            <Text style={styles.loginText}>Đăng Nhập</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.orRow}>
          <View style={[styles.orLine, { borderColor: isDark ? '#374151' : '#d1d5db' }]} />
          <Text style={[styles.orText, { color: isDark ? '#6b7280' : '#9ca3af' }]}>Hoặc</Text>
          <View style={[styles.orLine, { borderColor: isDark ? '#374151' : '#d1d5db' }]} />
        </View>
        <TouchableOpacity
          style={[styles.googleBtn, { borderColor: isDark ? '#374151' : '#d1d5db' }]}
          activeOpacity={0.7}
          onPress={() => Alert.alert('Thông báo', 'Tính năng đăng nhập Google sẽ sớm có!')}
        >
          <Image
            source={{ uri: 'https://placehold.co/20x20/png?text=G' }}
            style={styles.googleLogo}
          />
          <Text style={[styles.googleText, { color: isDark ? '#fff' : '#000' }]}>Đăng Nhập với Google</Text>
        </TouchableOpacity>
        <Text style={[styles.registerRow, { color: isDark ? '#6b7280' : '#9ca3af' }]}>Chưa Có Tài Khoản{' '}
          <Text style={styles.registerLink} onPress={() => navigation.replace('Register')}>Đăng Ký</Text>
        </Text>
      </View>
    </ScrollView>
  );
}

