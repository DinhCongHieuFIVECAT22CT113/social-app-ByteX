import React from 'react';
import { View } from 'react-native';
import AppNavigator from './navigation/navigation';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <AppNavigator />
    </View>
  );
}