import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../../hooks/useAuth';

export default function LoginScreen() {
  const { signInWithZkLogin } = useAuth();

  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <Text style={{fontSize:20, marginBottom:14}}>Sign in to DOTique</Text>
      <Button title="Sign in (zkLogin / Google)" onPress={() => signInWithZkLogin()} />
    </View>
  );
}
