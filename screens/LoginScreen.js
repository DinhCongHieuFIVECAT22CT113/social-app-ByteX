import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, useColorScheme } from 'react-native';
import { styled } from 'nativewind';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

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
      className={`${isDark ? 'bg-[#18181b]' : 'bg-white'} flex justify-center items-center px-6`}
    >
      <StyledView className="w-full max-w-xs">
        <StyledTouchableOpacity
          accessibilityLabel="Back"
          className="mb-10 bg-[#2ecc71] rounded-md w-12 h-12 flex items-center justify-center shadow-md"
          activeOpacity={0.7}
        >
          <FontAwesomeIcon icon={faArrowLeft} size={20} color="white" />
        </StyledTouchableOpacity>

        <StyledView className="flex justify-center mb-6">
          <StyledText className={`font-extrabold text-4xl ${isDark ? 'text-white' : 'text-black'} flex flex-row items-center`}>
            BYTE
            <StyledText className="text-[#2ecc71] ml-1">X</StyledText>
          </StyledText>
        </StyledView>

        <StyledText className={`text-center mb-8 text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>Đăng Nhập Tài Khoản</StyledText>

        <StyledView className="space-y-4">
          <StyledView>
            <StyledText className="text-[#2ecc71] text-xs font-medium mb-1">Tên Tài Khoản</StyledText>
            <StyledTextInput
              className={`w-full border rounded-md px-4 py-2 text-sm ${isDark ? 'border-[#2ecc71] text-white' : 'border-[#2ecc71] text-black'}`}
              value={username}
              onChangeText={setUsername}
              autoComplete="off"
              autoCapitalize="none"
              placeholder=""
              placeholderTextColor={isDark ? "#d1d5db" : "#000000"}
            />
          </StyledView>

          <StyledView>
            <StyledTextInput
              className={`w-full border rounded-md px-4 py-2 text-sm ${isDark ? 'border-gray-700 text-gray-200' : 'border-gray-200 text-gray-400'}`}
              value={password}
              onChangeText={setPassword}
              placeholder="Nhập Mật Khẩu của Bạn"
              placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
              secureTextEntry
              autoComplete="off"
              autoCapitalize="none"
            />
          </StyledView>

          <TouchableOpacity>
            <StyledText className="text-[#2ecc71] text-xs font-normal mb-4 underline">Quên Mật Khẩu ?</StyledText>
          </TouchableOpacity>

          <StyledTouchableOpacity
            className="w-full bg-gradient-to-r from-[#2ecc71] to-[#27ae60] rounded-md py-3"
            activeOpacity={0.8}
          >
            <StyledText className="text-white font-semibold text-base text-center">Đăng Nhập</StyledText>
          </StyledTouchableOpacity>
        </StyledView>

        <StyledView className="flex flex-row items-center my-6">
          <StyledView className={`flex-grow border-t ${isDark ? 'border-gray-700' : 'border-gray-300'}`} />
          <StyledText className={`mx-3 text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Hoặc</StyledText>
          <StyledView className={`flex-grow border-t ${isDark ? 'border-gray-700' : 'border-gray-300'}`} />
        </StyledView>

        <StyledTouchableOpacity
          className={`w-full border rounded-full py-2 flex flex-row items-center justify-center space-x-3 ${isDark ? 'border-gray-700' : 'border-gray-300'}`}
          activeOpacity={0.7}
        >
          <StyledImage
            source={{ uri: 'https://placehold.co/20x20/png?text=G' }}
            alt="Google logo, multicolor G letter on white background"
            className="w-5 h-5"
          />
          <StyledText className={`${isDark ? 'text-white' : 'text-black'} text-sm font-normal`}>Đăng Nhập với Google</StyledText>
        </StyledTouchableOpacity>

        <StyledText className={`text-center text-xs mt-6 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          Chưa Có Tài Khoản
          <StyledText className="text-[#2ecc71] font-normal ml-1 underline">Đăng Ký</StyledText>
        </StyledText>
      </StyledView>
    </ScrollView>
  );
}

