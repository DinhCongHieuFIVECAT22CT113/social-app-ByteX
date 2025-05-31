import * as React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemeContext';
import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import PostScreen from '../screens/PostScreen';
import CommentsScreen from '../screens/CommentsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UpdateUserScreen from '../screens/UpdateUserScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PersonalInfoScreen from '../screens/PersonalInfoScreen';
import AboutScreen from '../screens/AboutScreen';

// navigation.js
// Cấu hình navigation cho các màn hình chính của app bằng React Navigation

// Tùy chỉnh theme sáng
const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#22c55e',
    background: '#f5f5f5',
    card: '#ffffff',
    text: '#111827',
    border: '#e5e7eb',
    notification: '#ef4444',
  },
};

// Tùy chỉnh theme tối
const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#4ade80',
    background: '#121212',
    card: '#1f1f1f',
    text: '#f3f4f6',
    border: '#374151',
    notification: '#f87171',
  },
};

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  // Sử dụng theme từ context
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? CustomDarkTheme : CustomLightTheme;
  
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={LandingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Post" component={PostScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Comments" component={CommentsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UpdateUser" component={UpdateUserScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="About" component={AboutScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}