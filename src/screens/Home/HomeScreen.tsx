import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../../hooks/useAuth';

export default function HomeScreen({ navigation }: any) {
  const { signOut, user } = useAuth();
  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <Text style={{fontSize:18, marginBottom:12}}>Welcome {user?.display_name ?? '—'}</Text>
      <Button title="Open DOTvatar" onPress={() => navigation.navigate('DOTvatar')} />
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}
