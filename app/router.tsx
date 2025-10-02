import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../src/screens/Home/HomeScreen';
import LoginScreen from '../src/screens/Auth/LoginScreen';
import DOTvatarScreen from '../src/screens/DOTvatar/DOTvatarScreen';
import NFTStudioScreen from '../src/screens/NFTStudio/NFTStudioScreen';
import TestSupabase from '../src/screens/TestSupabase';




const Stack = createNativeStackNavigator();

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="TestSupabase" component={TestSupabase} />
        <Stack.Screen name="Auth" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="DOTvatar" component={DOTvatarScreen} />
        <Stack.Screen name="NFTStudio" component={NFTStudioScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
