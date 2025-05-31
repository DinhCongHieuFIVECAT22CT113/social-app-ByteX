import React from 'react';
import { View, StatusBar, useColorScheme } from 'react-native';
import AppNavigator from './navigation/navigation';
import { ThemeProvider, useTheme } from './context/ThemeContext';

// Wrapper component to use the theme context
const AppContent = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: isDarkMode ? '#121212' : '#f5f5f5' 
    }}>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
        backgroundColor={isDarkMode ? '#121212' : '#f5f5f5'}
      />
      <AppNavigator />
    </View>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}