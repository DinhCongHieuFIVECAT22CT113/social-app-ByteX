import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, ScrollView, useColorScheme } from 'react-native';
import styles from '../styles/RegisterScreenStyles';

// RegisterScreen.js
// Màn hình đăng ký tài khoản người dùng mới

export default function ByteXRegister() {
  const [username, setUsername] = useState('abc123');
  const [email, setEmail] = useState('info@yourmail.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView style={[
      styles.root,
      isDark ? styles.rootDark : styles.rootLight
    ]}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={styles.backBtn}>
          <Text style={{ color: '#fff', fontSize: 20 }}>←</Text>
        </TouchableOpacity>
        <Image
          source={{ uri: 'https://placehold.co/320x128?text=BYTE+X+Logo+Placeholder' }}
          style={styles.logo}
          accessibilityLabel="BYTE X logo with black BYTE text and green X letter"
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
          <TouchableOpacity style={styles.registerBtn}>
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
        ]}>
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
          Đã Có Tài Khoản
          <Text style={styles.registerLink}>Đăng Nhập</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

