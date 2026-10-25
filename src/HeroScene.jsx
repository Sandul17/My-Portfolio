import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Lightformer, Sparkles } from '@react-three/drei';

function Sculpture() {
  const group = useRef(null);
  useFrame((state, delta) => {
    const step = Math.min(delta, .05);
    group.current.rotation.y += step * .12;
    group.current.rotation.x += (state.pointer.y * .18 - group.current.rotation.x) * .025;
    group.current.position.x += (state.pointer.x * .12 - group.current.position.x) * .035;
  });
  return <group ref={group}>
    <Float speed={1.2} rotationIntensity={.2} floatIntensity={.3}>
      <mesh rotation={[.3, .2, -.4]}>
        <torusKnotGeometry args={[1, .31, 160, 24, 2, 3]}/>
        <meshPhysicalMaterial color="#a8a0fa" metalness={.82} roughness={.2} clearcoat={1} clearcoatRoughness={.15} iridescence={1} iridescenceIOR={1.4} iridescenceThicknessRange={[100,500]}/>
      </mesh>
    </Float>
    <mesh rotation={[1.25,.35,.4]}><torusGeometry args={[1.86,.008,8,128]}/><meshBasicMaterial color="#8fcaf3" transparent opacity={.5}/></mesh>
    <mesh rotation={[.25,.45,-.3]}><torusGeometry args={[1.7,.006,8,128]}/><meshBasicMaterial color="#b7a4ff" transparent opacity={.32}/></mesh>
    <Sparkles count={24} scale={5} size={1.3} speed={.15} opacity={.65} color="#c6c6ff"/>
  </group>;
}

function SceneLifecycle({ onReady, onUnavailable }) {
  const { gl } = useThree();
  useEffect(() => {
    const canvas = gl.domElement;
    const lost = event => { event.preventDefault(); onUnavailable(); };
    canvas.addEventListener('webglcontextlost', lost);
    onReady();
    return () => canvas.removeEventListener('webglcontextlost', lost);
  }, [gl, onReady, onUnavailable]);
  return null;
}

export default function HeroScene({ active, onReady, onUnavailable }) {
  return <Canvas className="three-canvas" camera={{ position: [0,0,6.7], fov: 39 }} dpr={[1,1.5]} frameloop={active ? 'always' : 'never'}
    gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }} fallback={null}>
    <Suspense fallback={null}>
      <ambientLight intensity={.4}/><directionalLight position={[3,4,5]} intensity={2.2} color="#dce9ff"/>
      <pointLight position={[-3,-2,3]} intensity={18} color="#7ba6ff"/>
      <Environment resolution={128} frames={1}>
        <Lightformer position={[-4,3,4]} intensity={4} color="#d7eaff" scale={[4,4,1]} target={[0,0,0]}/>
        <Lightformer position={[3,-2,2]} intensity={3} color="#b391ff" scale={[3,5,1]} target={[0,0,0]}/>
        <Lightformer position={[0,4,-2]} intensity={5} color="#85d9e3" scale={[5,2,1]} target={[0,0,0]}/>
      </Environment>
      <Sculpture/><SceneLifecycle onReady={onReady} onUnavailable={onUnavailable}/>
    </Suspense>
  </Canvas>;
}
