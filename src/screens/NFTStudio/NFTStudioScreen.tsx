import React from 'react';
import { View, Text, Button } from 'react-native';

export default function NFTStudioScreen() {
  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <Text style={{fontSize:18, marginBottom:12}}>NFT Design Studio (Skia)</Text>
      <Text style={{marginBottom:8}}>Canvas (placeholder) — integrate react-native-skia here</Text>
      <Button title="Export & Mint" onPress={() => alert('export/mint flow not implemented yet')} />
    </View>
  );
}
