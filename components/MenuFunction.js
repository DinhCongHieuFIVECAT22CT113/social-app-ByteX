import React from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { TailwindProvider } from 'nativewind';

const App = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const toggleSwitch = () => setIsDarkMode(previousState => !previousState);

  return (
    <TailwindProvider>
      <View className={`flex-1 justify-center items-center p-5 ${isDarkMode ? 'bg-[#18181b]' : 'bg-white'}`}>
        
        {/* Danh Sách Bài Đăng */}
        <View className={`flex-row justify-between items-center w-full border-b py-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <Text className={`text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>Danh Sách Bài Đăng</Text>
          <TouchableOpacity>
            <Text className="text-blue-500"></Text>
          </TouchableOpacity>
        </View>

        {/* Thay Ảnh Avatar */}
        <View className={`flex-row justify-between items-center w-full border-b py-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <Text className={`text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>Thay Ảnh Avatar</Text>
          <TouchableOpacity>
            <Text className="text-blue-500"></Text>
          </TouchableOpacity>
        </View>

        {/* Chế Độ Sáng/Tối */}
        <View className={`flex-row justify-between items-center w-full border-b py-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <Text className={`text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>Chế Độ Sáng/Tối</Text>
          <Switch
            onValueChange={toggleSwitch}
            value={isDarkMode}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
          />
        </View>

        {/* Nút Đăng Xuất */}
        <TouchableOpacity className="mt-5 bg-green-500 rounded-lg px-4 py-2">
          <Text className="text-white text-lg text-center">Đăng Xuất</Text>
        </TouchableOpacity>

        {/* Nút Quay Lại */}
        <TouchableOpacity className={`mt-5 rounded-lg px-4 py-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <Text className={`text-lg text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>←</Text>
        </TouchableOpacity>
        
      </View>
    </TailwindProvider>
  );
};

export default App;


