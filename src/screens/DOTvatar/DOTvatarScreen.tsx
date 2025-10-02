import React, { Suspense } from 'react';
import { View, Text } from 'react-native';
import { Canvas } from '@react-three/fiber/native';
import { ActivityIndicator } from 'react-native';

function DOTvatarCanvas() {
  // placeholder — replace with actual model loader
  return (
    <mesh>
      <boxBufferGeometry args={[1.2, 1.8, 0.5]} />
      <meshStandardMaterial color="#E6007A" />
    </mesh>
  );
}

export default function DOTvatarScreen() {
  return (
    <View style={{flex:1}}>
      <Text style={{textAlign:'center', marginTop:12, fontSize:18}}>DOTvatar Editor</Text>
      <View style={{flex:1}}>
        <Suspense fallback={<ActivityIndicator />}>
          <Canvas style={{flex:1}}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <DOTvatarCanvas />
          </Canvas>
        </Suspense>
      </View>
    </View>
  );
}
