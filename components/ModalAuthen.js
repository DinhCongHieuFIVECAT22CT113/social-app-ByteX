import React from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';

const Container = styled(View);
const InputField = styled(TextInput);
const Button = styled(TouchableOpacity);

const VerifyEmailScreen = () => {
  return (
    <Container className="flex-1 justify-center items-center p-4 bg-white">
      <View className="flex-row items-center w-full mb-4">
        <TouchableOpacity className="bg-green-500 rounded p-2">
          <Text className="text-white">←</Text>
        </TouchableOpacity>
        <Text className="flex-1 text-center font-semibold text-lg">Tiếp Tục</Text>
      </View>
      
      <InputField
        className="border border-gray-300 rounded p-2 w-full mb-4"
        placeholder="Địa Chỉ Email"
        keyboardType="email-address"
      />
      
      <InputField
        className="border border-gray-300 rounded p-2 w-full mb-4"
        placeholder="Nhập Mã Xác Nhận"
      />
      
      <Button className="bg-green-500 rounded p-3 w-full">
        <Text className="text-white text-center font-semibold">Gửi Mã Xác Nhận</Text>
      </Button>
    </Container>
  );
};

export default VerifyEmailScreen;


