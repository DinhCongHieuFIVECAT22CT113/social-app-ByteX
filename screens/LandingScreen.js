import React from 'react';
import { Text, View, TouchableOpacity, Image, useColorScheme } from 'react-native';

const App = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View
      className={`flex-1 items-center justify-center ${
        isDark ? 'bg-black' : 'bg-white'
      }`}
    >
      {/* Logo Section */}
      <View className="flex-row items-center">
        <Text className={`text-5xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>BYTE</Text>
        <Text className="text-5xl font-bold text-green-500">X</Text>
      </View>
      
      {/* Hands Image */}
      <Image
        source={{ uri: 'https://example.com/handshake-image.jpg' }} // Replace with actual image URL
        className="w-24 h-24 my-4"
      />
      
      {/* Text Section */}
      <Text
        className={`text-2xl text-center font-semibold mb-4 ${
          isDark ? 'text-white' : 'text-black'
        }`}
      >
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
