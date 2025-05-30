import React from 'react';
import AppNavigator from './navigation/navigation';
import UpdateUserScreen from './screens/UpdateUserScreen';

export default function App() {
  return (
    <AppNavigator>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="UpdateUser" component={UpdateUserScreen} />
      </Stack.Navigator>
    </AppNavigator>
  );
}
