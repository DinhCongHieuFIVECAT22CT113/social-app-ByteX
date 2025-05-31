import React from 'react';
import { View, StatusBar } from 'react-native';
import AppNavigator from './navigation/navigation';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <StatusBar 
          barStyle={'dark-content'} 
          backgroundColor={'#f5f5f5'}
        />
        <AppNavigator />
      </View>
    </ThemeProvider>
  );
}