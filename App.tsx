// App.tsx
import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { AuthProvider } from "./src/hooks/useAuth";
import Router from "./app/router";
import { styles } from "./AppStyles";

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerText}>DOTique App by sage</Text>
        </View>
        <View style={styles.content}>
          <Router />
        </View>
      </SafeAreaView>
    </AuthProvider>
  );
}
