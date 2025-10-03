// app/router.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../src/screens/Home/HomeScreen";
import LoginScreen from "../src/screens/Auth/LoginScreen";
import SignupScreen from "../src/screens/Auth/SignupScreen";
import ForgotPasswordScreen from "../src/screens/Auth/ForgotPasswordScreen";

import DOTvatarScreen from "../src/screens/DOTvatar/DOTvatarScreen";
import NFTStudioScreen from "../src/screens/NFTStudio/NFTStudioScreen";
import TestSupabase from "../src/screens/TestSupabase";

import { useAuth } from "../src/hooks/useAuth";

const Stack = createNativeStackNavigator();

export default function Router() {
  const { session } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!session ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="DOTvatar" component={DOTvatarScreen} />
            <Stack.Screen name="NFTStudio" component={NFTStudioScreen} />
            <Stack.Screen name="TestSupabase" component={TestSupabase} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
