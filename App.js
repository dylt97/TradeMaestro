import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import ContractorSignup from './ContractorSignup';
import CustomerSignup from './CustomerSignup';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ContractorSignup" component={ContractorSignup} />
        <Stack.Screen name="CustomerSignup" component={CustomerSignup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}