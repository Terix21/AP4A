import { OrthographicCamera, Environment } from '@react-three/drei';
import { useGameStore } from '../../store/gameStore';
import * as THREE from 'three';
import Drones from './Drones';

export default function Scene() {
  const threatLevel = useGameStore(state => state.threatLevel);

  // Danger lighting based on threat level
  const ambientIntensity = threatLevel > 50 ? 0.1 : 0.2;
  const directionalColor = threatLevel > 50 ? "#ffaa88" : "#ffffff";
  const neonTrim = threatLevel > 50 ? "#ff0000" : "#00ffff";

  return (
    <>
      <OrthographicCamera
        makeDefault
        position={[15, 15, 15]}
        rotation={[-Math.atan(1 / Math.sqrt(2)), Math.PI / 4, 0]} // Isometric angle
        zoom={30}
      />
      
      <ambientLight intensity={ambientIntensity} />
      <directionalLight 
        position={[5, 10, 5]} 
        intensity={1.5} 
        color={directionalColor}
        castShadow 
        shadow-mapSize={[1024, 1024]}
      />
      
      <Environment preset="night" background blur={0.8} />

      {/* Central Command Hub */}
      <mesh castShadow receiveShadow position={[0, 1.5, 0]}>
        <cylinderGeometry args={[2, 2.5, 3, 6]} />
        <meshStandardMaterial color="#222233" metalness={0.8} roughness={0.4} />
      </mesh>
      {/* Command Hub Neon Ring */}
      <mesh position={[0, 3.1, 0]}>
        <torusGeometry args={[1.5, 0.1, 16, 32]} />
        <meshStandardMaterial color={neonTrim} emissive={neonTrim} emissiveIntensity={1} />
      </mesh>

      {/* The Smelter */}
      <mesh castShadow receiveShadow position={[-5, 1, -2]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#332222" metalness={0.6} roughness={0.7} />
      </mesh>
      {/* Smelter Emissive Accent */}
      <mesh position={[-5, 2.1, -2]}>
        <boxGeometry args={[1.5, 0.2, 1.5]} />
        <meshStandardMaterial color="#ff5500" emissive="#ff5500" emissiveIntensity={2} />
      </mesh>

      {/* The SynthFarm */}
      <mesh castShadow receiveShadow position={[4, 0.5, -4]}>
        <cylinderGeometry args={[1.5, 1.5, 1, 16]} />
        <meshStandardMaterial color="#113311" metalness={0.3} roughness={0.9} />
      </mesh>
      {/* SynthFarm Dome */}
      <mesh position={[4, 1, -4]}>
        <sphereGeometry args={[1.4, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#00ff55" emissive="#00ff55" emissiveIntensity={0.5} transparent opacity={0.6} />
      </mesh>

      {/* The DataHub */}
      <mesh castShadow receiveShadow position={[3, 2, 5]}>
        <boxGeometry args={[1.5, 4, 1.5]} />
        <meshStandardMaterial color="#111122" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* DataHub Arrays */}
      <mesh position={[3, 4.1, 5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.5, 1.5]} />
        <meshStandardMaterial color="#0088ff" emissive="#0088ff" emissiveIntensity={1.5} side={THREE.DoubleSide} />
      </mesh>

      {/* Platform Base (Stylized metallic Sector Platform) */}
      <mesh receiveShadow position={[0, -0.5, 0]}>
        <cylinderGeometry args={[12, 14, 1, 6]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.8} metalness={0.5} />
      </mesh>

      {/* Platform Neon Trim */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[11.5, 12, 6]} />
        <meshStandardMaterial color={neonTrim} emissive={neonTrim} emissiveIntensity={0.5} side={THREE.DoubleSide} />
      </mesh>

      {/* Drones */}
      <Drones />
    </>
  );
}
