import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { NativeWindStyleSheet } from 'nativewind';

const App = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      {/* Logo Section */}
      <View className="flex-row items-center">
        <Text className="text-5xl font-bold text-black">BYTE</Text>
        <Text className="text-5xl font-bold text-green-500">X</Text>
      </View>
      
      {/* Hands Image */}
      <Image
        source={{ uri: 'https://example.com/handshake-image.jpg' }} // Replace with actual image URL
        className="w-24 h-24 my-4"
      />
      
      {/* Text Section */}
      <Text className="text-2xl text-center font-semibold text-black mb-4">
        Nơi Kết Nối Mọi Người Với Nhau
      </Text>
      
      {/* Button */}
      <TouchableOpacity className="bg-green-500 rounded-lg px-8 py-2">
        <Text className="text-white text-lg">Bắt Đầu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
