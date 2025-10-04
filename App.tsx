// App.tsx
import React from "react";
import { SafeAreaView } from "react-native";
import { AuthProvider } from "./src/hooks/useAuth";
import Router from "./app/router";
import { styles } from "./AppStyles";

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaView style={styles.safeArea}>
        <Router />
      </SafeAreaView>
    </AuthProvider>
  );
}
