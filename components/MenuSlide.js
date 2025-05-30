import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const App = () => {
  return (
    <View className="flex-1 bg-white p-5">
      <View className="flex-row justify-between items-center border-b border-gray-200 py-4">
        <Text className="text-lg">Tài Khoản</Text>
        <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-200 justify-center items-center">
          <Text className="text-xl"></Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-between items-center border-b border-gray-200 py-4">
        <Text className="text-lg">Thông Báo</Text>
        <View className="flex-row items-center">
          <Text className="text-green-500 font-bold">0</Text>
          <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-200 justify-center items-center">
            <Text className="text-xl"></Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row justify-between items-center border-b border-gray-200 py-4">
        <Text className="text-lg">Yêu Thích</Text>
        <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-200 justify-center items-center">
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


