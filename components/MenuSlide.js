import React from 'react';
import { View, Text, TouchableOpacity, useColorScheme } from 'react-native';

// MenuSlide.js
// Menu trượt hiển thị các mục tài khoản, thông báo, yêu thích

const App = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className={`flex-1 p-5 ${isDark ? 'bg-[#18181b]' : 'bg-white'}`}>
      <View className={`flex-row justify-between items-center border-b py-4 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <Text className={`text-lg ${isDark ? 'text-white' : 'text-black'}`}>Tài Khoản</Text>
        <TouchableOpacity className={`${isDark ? 'bg-gray-700' : 'bg-gray-200'} w-10 h-10 rounded-full justify-center items-center`}>
          <Text className="text-xl"></Text>
        </TouchableOpacity>
      </View>

      <View className={`flex-row justify-between items-center border-b py-4 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <Text className={`text-lg ${isDark ? 'text-white' : 'text-black'}`}>Thông Báo</Text>
        <View className="flex-row items-center">
          <Text className="text-green-500 font-bold">0</Text>
          <TouchableOpacity className={`${isDark ? 'bg-gray-700' : 'bg-gray-200'} w-10 h-10 rounded-full justify-center items-center`}>
            <Text className="text-xl"></Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className={`flex-row justify-between items-center border-b py-4 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <Text className={`text-lg ${isDark ? 'text-white' : 'text-black'}`}>Yêu Thích</Text>
        <TouchableOpacity className={`${isDark ? 'bg-gray-700' : 'bg-gray-200'} w-10 h-10 rounded-full justify-center items-center`}>
          <Text className="text-xl"></Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity className="mt-5 flex-row items-center bg-green-500 p-3 rounded-full justify-center">
        <Text className="text-white">←</Text>
      </TouchableOpacity>
    </View>
  );
}

export default App;


