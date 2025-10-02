import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthProvider } from './src/hooks/useAuth';
import Router from './app/router';

export default function App() {
  return (
    <AuthProvider>
      <View style={styles.container}>
        <Text style={styles.text}>DOTique App</Text>
        <Router />
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB6C1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
});