import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
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

  return (
    <StyledSafeAreaView className="flex-1 bg-white px-6 items-center justify-center">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }} showsVerticalScrollIndicator={false}>

        <StyledTouchableOpacity className="mb-6 w-12 h-12 rounded-lg bg-gradient-to-b from-[#3ED14F] to-[#2DBE3B] flex items-center justify-center shadow-md">
          <StyledText className="text-white text-lg">←</StyledText>
        </StyledTouchableOpacity>

        <StyledImage
          source={{ uri: 'https://placehold.co/320x128?text=BYTE+X+Logo+Placeholder' }}
          className="mb-2 w-40 h-16"
          accessibilityLabel="BYTE X logo with black BYTE text and green X letter"
        />

        <StyledText className="text-gray-500 text-sm mb-8">Đăng Ký Tài Khoản</StyledText>

        <StyledView className="w-full max-w-md space-y-4">
          <StyledTextInput
            className="w-full border border-green-400 rounded-md px-3 py-2 text-green-500 placeholder-green-400"
            placeholder="Tên Tài Khoản"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#86efac"
          />

          <StyledTextInput
            className="w-full border border-green-400 rounded-md px-3 py-2 text-green-500 placeholder-green-400"
            placeholder="Địa Chỉ Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#86efac"
          />

          <StyledTextInput
            className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder-gray-400"
            placeholder="Nhập Mật Khẩu của Bạn"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#9ca3af"
          />

          <StyledTextInput
            className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder-gray-400"
            placeholder="Nhập Lại Mật Khẩu của Bạn"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholderTextColor="#9ca3af"
          />

          <StyledTouchableOpacity className="w-full bg-gradient-to-b from-[#3ED14F] to-[#2DBE3B] rounded-md py-3 mt-2 items-center">
            <StyledText className="text-white text-lg font-medium">Đăng Ký</StyledText>
          </StyledTouchableOpacity>
        </StyledView>

        <StyledView className="flex-row items-center w-full max-w-md my-6">
          <StyledView className="flex-1 border-t border-gray-300"/>
          <StyledText className="mx-3 text-gray-400 text-sm">Hoặc</StyledText>
          <StyledView className="flex-1 border-t border-gray-300"/>
        </StyledView>

        <StyledTouchableOpacity className="w-full max-w-md flex-row items-center justify-center gap-3 border border-gray-300 rounded-full py-3 px-6">
          <StyledImage
            source={{ uri: 'https://storage.googleapis.com/a1aa/image/1c2726f5-44c4-4523-0dcb-575a4e12b488.jpg' }}
            className="w-5 h-5"
            accessibilityLabel="Google logo with red, yellow, green and blue colors"
          />
          <StyledText className="text-base text-gray-900">Tiếp tục với Google</StyledText>
        </StyledTouchableOpacity>

        <StyledText className="text-gray-500 text-sm mt-8">
          Đã Có Tài Khoản
          <StyledText className="text-green-500 ml-1 underline">Đăng Nhập</StyledText>
        </StyledText>

      </ScrollView>
    </StyledSafeAreaView>
  );
}

