import React from 'react';
import { View, TextInput, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { styled } from 'nativewind';

const Container = styled(View);
const InputField = styled(TextInput);
const Button = styled(TouchableOpacity);

const VerifyEmailScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Container className={`flex-1 justify-center items-center p-4 ${isDark ? 'bg-[#18181b]' : 'bg-white'}`}>
      <View className="flex-row items-center w-full mb-4">
        <TouchableOpacity className="bg-green-500 rounded p-2">
          <Text className="text-white">←</Text>
        </TouchableOpacity>
        <Text className={`flex-1 text-center font-semibold text-lg ${isDark ? 'text-white' : 'text-black'}`}>Tiếp Tục</Text>
      </View>
      
      <InputField
        className={`border rounded p-2 w-full mb-4 ${isDark ? 'border-gray-700 text-white bg-[#232326]' : 'border-gray-300 text-black bg-white'}`}
        placeholder="Địa Chỉ Email"
        keyboardType="email-address"
        placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
      />
      
      <InputField
        className={`border rounded p-2 w-full mb-4 ${isDark ? 'border-gray-700 text-white bg-[#232326]' : 'border-gray-300 text-black bg-white'}`}
        placeholder="Nhập Mã Xác Nhận"
        placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
      />
      
      <Button className="bg-green-500 rounded p-3 w-full">
        <Text className="text-white text-center font-semibold">Gửi Mã Xác Nhận</Text>
      </Button>
    </Container>
  );
};

export default VerifyEmailScreen;

// ModalAuthen.js
// Modal xác thực email (gửi mã xác nhận)


