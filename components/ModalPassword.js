import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

const ConfirmPasswordScreen = () => {
  return (
    <View className="flex-1 justify-center items-center p-4 bg-white">
      <TouchableOpacity className="flex-row items-center mb-6">
        <Text className="text-green-500 text-lg">&lt;</Text>
      </TouchableOpacity>
      
      <View className="w-full mb-4">
        <TextInput 
          placeholder="Nhập Mật Khẩu của Bạn" 
          secureTextEntry 
          className="border border-gray-300 rounded-lg p-2"
        />
      </View>
      
      <View className="w-full mb-4">
        <TextInput 
          placeholder="Nhập Lại Mật Khẩu của Bạn" 
          secureTextEntry 
          className="border border-gray-300 rounded-lg p-2"
        />
      </View>
      
      <TouchableOpacity className="bg-green-500 w-full rounded-lg p-2">
        <Text className="text-white text-center text-lg">Xác Nhận</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmPasswordScreen;


