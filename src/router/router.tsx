// src/router/router.tsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import BottomTabNavigator from "../components/BottomNav";
import LoginScreen from "../screens/Auth/LoginScreen";
import SignupScreen from "../screens/Auth/SignupScreen";
import ForgotPasswordScreen from "../screens/Auth/ForgotPasswordScreen";
import OnboardingScreen from "../screens/Onboarding/OnboardingScreen";
import DOTvatarScreen from "../screens/DOTvatar/DOTvatarScreen";
import TestSupabase from "../screens/TestSupabase/TestSupabase";

import ProfileScreen from "../screens/Profile/ProfileScreen";
import ProfileWardrobe from "../screens/Profile/ProfileWardrobe";
import ProfileStyleCV from "../screens/Profile/ProfileStyleCV";
import ProfileGovernance from "../screens/Profile/ProfileGovernance";
import EditProfileScreen from "../screens/Profile/EditProfileScreen";
import SettingsScreen from "../screens/Profile/SettingsScreen";

import { useAuthStore } from "../stores/authStore";

// Temporary placeholders for main tabs
const HomeScreen = () => <div className="screen">🏠 Home Screen</div>;
const MarketplaceScreen = () => <div className="screen">🛍️ Marketplace</div>;
const MintScreen = () => <div className="screen">➕ Mint</div>;
const MessagesScreen = () => <div className="screen">💬 Messages</div>;

export default function Router() {
  const session = useAuthStore((s) => s.session);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    const seen = localStorage.getItem("hasSeenOnboarding");
    setHasSeenOnboarding(seen === "true");
  }, []);

  if (hasSeenOnboarding === null) return null;

  // Onboarding not seen → show onboarding route only
  if (hasSeenOnboarding === false) {
    return (
      <Routes>
        <Route path="*" element={<OnboardingScreen />} />
      </Routes>
    );
  }

  // No session → show auth routes
  if (!session) {
    return (
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Logged in → full app with tabs
  return (
    <Routes>
      <Route path="/" element={<BottomTabNavigator />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={<HomeScreen />} />
        <Route path="marketplace" element={<MarketplaceScreen />} />
        <Route path="mint" element={<MintScreen />} />
        <Route path="messages" element={<MessagesScreen />} />
        <Route path="profile" element={<ProfileScreen />} />
      </Route>

      {/* Standalone pages */}
      <Route path="/dotvatar" element={<DOTvatarScreen />} />
      <Route path="/test-supabase" element={<TestSupabase />} />

      {/* Profile module routes */}
      <Route path="/profile/wardrobe" element={<ProfileWardrobe />} />
      <Route path="/profile/stylecv" element={<ProfileStyleCV />} />
      <Route path="/profile/governance" element={<ProfileGovernance />} />
      <Route path="/profile/edit" element={<EditProfileScreen />} />
      <Route path="/settings" element={<SettingsScreen />} />

      {/* Default fallback */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}