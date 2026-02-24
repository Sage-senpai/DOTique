import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import BottomTabNavigator from "../components/BottomNav";

import LoginScreen from "../screens/Auth/LoginScreen";
import SignupScreen from "../screens/Auth/SignupScreen";
import ForgotPasswordScreen from "../screens/Auth/ForgotPasswordScreen";

import OnboardingScreen from "../screens/Onboarding/OnboardingScreen";

import HomeScreen from "../screens/Home/HomeScreen";
import MarketplaceScreen from "../screens/Marketplace/MarketplaceScreen";
import NFTStudioScreen from "../screens/NFTstudio/NFTStudioScreen";
import MessagesScreen from "../screens/Messages/MessageScreen";
import CommunitiesScreen from "../screens/Communities/CommunitiesScreen";
import CommunityDetailScreen from "../screens/Communities/CommunityDetailScreen";

import OtherUserProfile from "../screens/Profile/OtherUserProfile";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import ProfileWardrobe from "../screens/Profile/ProfileWardrobe";
import ProfileStyleCV from "../screens/Profile/ProfileStyleCV";
import ProfileGovernance from "../screens/Profile/ProfileGovernance";
import EditProfileScreen from "../screens/Profile/EditProfileScreen";
import SettingsScreen from "../screens/Profile/SettingsScreen";
import DOTvatarScreen from "../screens/DOTvatar/DOTvatarScreen";
import FollowerScreen from "../screens/Profile/FollowerScreen";

import NFTDetail from "../screens/Marketplace/NFTDetails";
import BuyNFT from "../screens/Marketplace/BuyNFT";
import { DonateNFT } from "../screens/Marketplace/DonateNFT";
import { RepostNFT } from "../screens/Marketplace/RepostNFT";

import { UploadDevice } from "../screens/Marketplace/uploads/UploadDevice";
import { UploadStudio } from "../screens/Marketplace/uploads/UploadStudio";
import { UploadWallet } from "../screens/Marketplace/uploads/UploadWallet";
import { UploadExternal } from "../screens/Marketplace/uploads/UploadExternal";

import { useAuthStore } from "../stores/authStore";
import { getHasSeenOnboarding } from "../services/preferencesService";

export default function Router() {
  const session = useAuthStore((s) => s.session);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const seen = await getHasSeenOnboarding();
        if (mounted) setHasSeenOnboarding(seen);
      } catch (error) {
        console.warn("Failed to load onboarding preference:", error);
        if (mounted) setHasSeenOnboarding(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  if (hasSeenOnboarding === null) return null;

  if (hasSeenOnboarding === false) {
    return (
      <Routes>
        <Route path="*" element={<OnboardingScreen />} />
      </Routes>
    );
  }

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

  return (
    <Routes>
      <Route element={<BottomTabNavigator />}>
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/explore" element={<HomeScreen />} />
        <Route path="/bookmarks" element={<HomeScreen />} />
        <Route path="/marketplace" element={<MarketplaceScreen />} />
        <Route path="/communities" element={<CommunitiesScreen />} />
        <Route path="/messages" element={<MessagesScreen />} />
        <Route path="/nft-studio" element={<NFTStudioScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/profile/other" element={<OtherUserProfile />} />
      </Route>

      <Route path="/communities/:id" element={<CommunityDetailScreen />} />

      <Route path="/marketplace/nft/:id" element={<NFTDetail />} />
      <Route path="/marketplace/buy/:id" element={<BuyNFT />} />
      <Route path="/marketplace/donate/:id" element={<DonateNFT />} />
      <Route path="/repost/:id" element={<RepostNFT />} />

      <Route path="/marketplace/upload/device" element={<UploadDevice />} />
      <Route path="/marketplace/upload/studio" element={<UploadStudio />} />
      <Route path="/marketplace/upload/wallet" element={<UploadWallet />} />
      <Route path="/marketplace/upload/external" element={<UploadExternal />} />

      <Route path="/profile/wardrobe" element={<ProfileWardrobe />} />
      <Route path="/profile/stylecv" element={<ProfileStyleCV />} />
      <Route path="/profile/governance" element={<ProfileGovernance />} />
      <Route path="/profile/edit" element={<EditProfileScreen />} />
      <Route path="/dotvatar" element={<DOTvatarScreen />} />
      <Route path="/settings" element={<SettingsScreen />} />

      <Route path="/followers" element={<FollowerScreen />} />

      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
