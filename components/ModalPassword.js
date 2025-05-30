import React from 'react';
import { View, TextInput, TouchableOpacity, Text, useColorScheme } from 'react-native';

const ConfirmPasswordScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className={`flex-1 justify-center items-center p-4 ${isDark ? 'bg-[#18181b]' : 'bg-white'}`}>
      <TouchableOpacity className="flex-row items-center mb-6">
        <Text className="text-green-500 text-lg">&lt;</Text>
      </TouchableOpacity>
      
      <View className="w-full mb-4">
        <TextInput 
          placeholder="Nhập Mật Khẩu của Bạn" 
          secureTextEntry 
          className={`border rounded-lg p-2 ${isDark ? 'border-gray-700 text-white bg-[#232326]' : 'border-gray-300 text-black bg-white'}`}
          placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
        />
      </View>
      
      <View className="w-full mb-4">
        <TextInput 
          placeholder="Nhập Lại Mật Khẩu của Bạn" 
          secureTextEntry 
          className={`border rounded-lg p-2 ${isDark ? 'border-gray-700 text-white bg-[#232326]' : 'border-gray-300 text-black bg-white'}`}
          placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
        />
      </View>
      
      <TouchableOpacity className="bg-green-500 w-full rounded-lg p-2">
        <Text className="text-white text-center text-lg">Xác Nhận</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmPasswordScreen;


