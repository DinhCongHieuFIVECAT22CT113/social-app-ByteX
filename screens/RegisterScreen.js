import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, ScrollView, useColorScheme } from 'react-native';
import { styled } from 'nativewind';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

export default function ByteXRegister() {
  const [username, setUsername] = useState('abc123');
  const [email, setEmail] = useState('info@yourmail.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <StyledSafeAreaView className={`flex-1 px-6 items-center justify-center ${isDark ? 'bg-[#18181b]' : 'bg-white'}`}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        <StyledTouchableOpacity className="mb-6 w-12 h-12 rounded-lg bg-gradient-to-b from-[#3ED14F] to-[#2DBE3B] flex items-center justify-center shadow-md">
          <StyledText className="text-white text-lg">←</StyledText>
        </StyledTouchableOpacity>

        <StyledImage
          source={{ uri: 'https://placehold.co/320x128?text=BYTE+X+Logo+Placeholder' }}
          className="mb-2 w-40 h-16"
          accessibilityLabel="BYTE X logo with black BYTE text and green X letter"
        />

        <StyledText className={`text-sm mb-8 ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>Đăng Ký Tài Khoản</StyledText>

        <StyledView className="w-full max-w-md space-y-4">
          <StyledTextInput
            className={`w-full border rounded-md px-3 py-2 ${isDark ? 'border-green-400 text-green-400 placeholder-green-400 bg-[#232326]' : 'border-green-400 text-green-500 placeholder-green-400 bg-white'}`}
            placeholder="Tên Tài Khoản"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor={isDark ? "#86efac" : "#86efac"}
          />

          <StyledTextInput
            className={`w-full border rounded-md px-3 py-2 ${isDark ? 'border-green-400 text-green-400 placeholder-green-400 bg-[#232326]' : 'border-green-400 text-green-500 placeholder-green-400 bg-white'}`}
            placeholder="Địa Chỉ Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={isDark ? "#86efac" : "#86efac"}
          />

          <StyledTextInput
            className={`w-full border rounded-md px-3 py-2 ${isDark ? 'border-gray-700 text-gray-200 placeholder-gray-400 bg-[#232326]' : 'border-gray-300 text-gray-900 placeholder-gray-400 bg-white'}`}
            placeholder="Nhập Mật Khẩu của Bạn"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor={isDark ? "#9ca3af" : "#9ca3af"}
          />

          <StyledTextInput
            className={`w-full border rounded-md px-3 py-2 ${isDark ? 'border-gray-700 text-gray-200 placeholder-gray-400 bg-[#232326]' : 'border-gray-300 text-gray-900 placeholder-gray-400 bg-white'}`}
            placeholder="Nhập Lại Mật Khẩu của Bạn"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholderTextColor={isDark ? "#9ca3af" : "#9ca3af"}
          />

          <StyledTouchableOpacity className="w-full bg-gradient-to-b from-[#3ED14F] to-[#2DBE3B] rounded-md py-3 mt-2 items-center">
            <StyledText className="text-white text-lg font-medium">Đăng Ký</StyledText>
          </StyledTouchableOpacity>
        </StyledView>

        <StyledView className="flex-row items-center w-full max-w-md my-6">
          <StyledView className={`flex-1 border-t ${isDark ? 'border-gray-700' : 'border-gray-300'}`} />
          <StyledText className={`mx-3 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Hoặc</StyledText>
          <StyledView className={`flex-1 border-t ${isDark ? 'border-gray-700' : 'border-gray-300'}`} />
        </StyledView>

        <StyledTouchableOpacity className={`w-full max-w-md flex-row items-center justify-center gap-3 border rounded-full py-3 px-6 ${isDark ? 'border-gray-700' : 'border-gray-300'}`}>
          <StyledImage
            source={{ uri: 'https://storage.googleapis.com/a1aa/image/1c2726f5-44c4-4523-0dcb-575a4e12b488.jpg' }}
            className="w-5 h-5"
            accessibilityLabel="Google logo with red, yellow, green and blue colors"
          />
          <StyledText className={`text-base ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Tiếp tục với Google</StyledText>
        </StyledTouchableOpacity>

        <StyledText className={`text-sm mt-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Đã Có Tài Khoản
          <StyledText className="text-green-500 ml-1 underline">Đăng Nhập</StyledText>
        </StyledText>
      </ScrollView>
    </StyledSafeAreaView>
  );
}

