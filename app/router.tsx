import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeScreen from "../src/screens/Home/HomeScreen";
import LoginScreen from "../src/screens/Auth/LoginScreen";
import SignupScreen from "../src/screens/Auth/SignupScreen";
import ForgotPasswordScreen from "../src/screens/Auth/ForgotPasswordScreen";

import DOTvatarScreen from "../src/screens/DOTvatar/DOTvatarScreen";
import NFTStudioScreen from "../src/screens/NFTStudio/NFTStudioScreen";
import TestSupabase from "../src/screens/TestSupabase";
import OnboardingScreen from "../src/screens/Onboarding/OnboardingScreen";

import { useAuthStore } from "../src/store/authStore";

const Stack = createNativeStackNavigator();

export default function Router() {
  const { session } = useAuthStore();
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    const checkOnboarding = async () => {
      const seen = await AsyncStorage.getItem("hasSeenOnboarding");
      setHasSeenOnboarding(seen === "true");
    };
    checkOnboarding();
  }, []);

  if (hasSeenOnboarding === null) return null; // loader placeholder

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
            {/* Onboarding after signup or first login */}
            {!hasSeenOnboarding && (
              <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            )}
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
