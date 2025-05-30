import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, useColorScheme } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/LoginScreenStyles';

// LoginScreen.js
// Màn hình đăng nhập tài khoản người dùng

export default function ByteXLogin() {
  const [username, setUsername] = useState('abc123');
  const [password, setPassword] = useState('');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

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
        >
          <FontAwesomeIcon icon={faArrowLeft} size={20} color="white" />
        </TouchableOpacity>
        <View style={styles.logoRow}>
          <Text style={[styles.logoText, { color: isDark ? '#fff' : '#000' }]}>BYTE
            <Text style={{ color: '#2ecc71', marginLeft: 4 }}>X</Text>
          </Text>
        </View>
        <Text style={[styles.subtitle, { color: isDark ? '#d1d5db' : '#6b7280' }]}>Đăng Nhập Tài Khoản</Text>
        <View style={styles.formGroup}>
          <View>
            <Text style={styles.label}>Tên Tài Khoản</Text>
            <TextInput
              style={[styles.input, isDark ? styles.inputDark : styles.inputLight]}
              value={username}
              onChangeText={setUsername}
              autoComplete="off"
              autoCapitalize="none"
              placeholder=""
              placeholderTextColor={isDark ? '#d1d5db' : '#000'}
            />
          </View>
          <View>
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
          <TouchableOpacity>
            <Text style={styles.forgotText}>Quên Mật Khẩu ?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginBtn}
            activeOpacity={0.8}
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
        >
          <Image
            source={{ uri: 'https://placehold.co/20x20/png?text=G' }}
            style={styles.googleLogo}
          />
          <Text style={[styles.googleText, { color: isDark ? '#fff' : '#000' }]}>Đăng Nhập với Google</Text>
        </TouchableOpacity>
        <Text style={[styles.registerRow, { color: isDark ? '#6b7280' : '#9ca3af' }]}>Chưa Có Tài Khoản
          <Text style={styles.registerLink}>Đăng Ký</Text>
        </Text>
      </View>
    </ScrollView>
  );
}

