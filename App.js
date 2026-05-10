import './firebase';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen';
import ContractorSignup from './ContractorSignup';
import CustomerSignup from './CustomerSignup';
import ContractorProfile from './ContractorProfile';
import JobSearch from './JobSearch';
import CustomerSearch from './CustomerSearch';
import PostJob from './PostJob';
import CustomerProfile from './CustomerProfile';
import LoginScreen from './LoginScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function ContractorTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#1a2f4e', borderTopColor: '#2e4a6e' },
        tabBarActiveTintColor: '#2e86de',
        tabBarInactiveTintColor: '#a0b4c8',
      }}
    >
      <Tab.Screen name="My Profile" component={ContractorProfile} />
      <Tab.Screen name="Find Jobs" component={JobSearch} />
    </Tab.Navigator>
  );
}

function CustomerTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#1a2f4e', borderTopColor: '#2e4a6e' },
        tabBarActiveTintColor: '#2e86de',
        tabBarInactiveTintColor: '#a0b4c8',
      }}
    >
      <Tab.Screen name="Find Contractors" component={CustomerSearch} />
      <Tab.Screen name="Post a Job" component={PostJob} />
      <Tab.Screen name="My Profile" component={CustomerProfile} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ContractorSignup" component={ContractorSignup} />
        <Stack.Screen name="CustomerSignup" component={CustomerSignup} />
        <Stack.Screen name="ContractorTabs" component={ContractorTabs} />
        <Stack.Screen name="CustomerTabs" component={CustomerTabs} />
        <Stack.Screen name="ContractorProfile" component={ContractorProfile} />
        <Stack.Screen name="CustomerProfile" component={CustomerProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}