// src/screens/Home/HomeScreen.tsx
import React from "react";
import { View, Text, Button, Alert } from "react-native";
import { supabase } from "../../services/supabase";
import { useAuthStore } from "../../store/authStore";

export default function HomeScreen({ navigation }: any) {
  const profile = useAuthStore((s) => s.profile);
  const resetAuth = useAuthStore((s) => s.resetAuth); // ✅ match store

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    resetAuth(); // ✅ clear Zustand state
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
        Welcome {profile?.display_name || profile?.username || profile?.email}
      </Text>
      <Button
        title="Create DOTvatar"
        onPress={() => navigation.navigate("DOTvatar")
}
      />
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}
