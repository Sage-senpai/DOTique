import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import "./dotvatar.scss";

function DOTvatarCanvas() {
  return (
    <mesh>
      <boxGeometry args={[1.2, 1.8, 0.5]} />
      <meshStandardMaterial color="#60519B" />
    </mesh>
  );
}

export default function DOTvatarScreen() {
  return (
    <div className="dotvatar-container">
      <h2 className="dotvatar-title">DOTvatar Editor</h2>
      <div className="dotvatar-canvas">
        <Suspense fallback={<div className="loading">Loading 3D Model...</div>}>
          <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <DOTvatarCanvas />
          </Canvas>
        </Suspense>
      </div>
    </div>
  );
}
