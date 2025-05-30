// App.js
// Điểm khởi đầu của ứng dụng, cấu hình navigation và các màn hình chính

import React from 'react';
import AppNavigator from './navigation/navigation';
import UpdateUserScreen from './screens/UpdateUserScreen';
// Import LikeButton từ đúng đường dẫn
import LikeButton from './components/LikeButton';

export default function App() {
  return (
    <AppNavigator>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="UpdateUser" component={UpdateUserScreen} />
      </Stack.Navigator>
      <div>
        <h1>Social App ByteX</h1>
        {/* Sử dụng nút Like */}
        <LikeButton />
      </div>
    </AppNavigator>
  );
}
