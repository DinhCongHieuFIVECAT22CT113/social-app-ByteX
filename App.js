import React from 'react';
import { View, Text } from 'react-native';
import AppNavigator from './navigation/navigation';
import UpdateUserScreen from './screens/UpdateUserScreen';
import LikeButton from './components/LikeButton';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <AppNavigator />
      {/* Nếu muốn hiển thị LikeButton và tiêu đề ở ngoài navigation */}
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Social App ByteX</Text>
        <LikeButton />
      </View>
    </View>
  );
}