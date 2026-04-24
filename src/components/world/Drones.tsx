import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Instance, Instances } from '@react-three/drei';
import { useGameStore } from '../../store/gameStore';
import * as THREE from 'three';

export default function Drones() {
  const dronesCount = useGameStore(state => state.drones);
  const droneHealth = useGameStore(state => state.droneHealth);
  const activePath = useGameStore(state => state.activePath);
  const dronePosition = useGameStore(state => state.dronePosition);
  
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const progressRef = useRef(0);
  const curveRef = useRef<THREE.CatmullRomCurve3 | null>(null);

  // When activePath changes, reset progress and rebuild curve
  useMemo(() => {
    progressRef.current = 0;
    if (activePath && activePath.length > 1) {
      const points = [new THREE.Vector3(...dronePosition), ...activePath.map(p => new THREE.Vector3(p[0], 0, p[2]))];
      curveRef.current = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5);
    } else {
      curveRef.current = null;
    }
  }, [activePath, dronePosition]);

  const droneData = useMemo(() => {
    return Array.from({ length: Math.max(0, dronesCount) }).map((_, i) => {
      const angle = (i / Math.max(1, dronesCount)) * Math.PI * 2;
      const radius = 4 + Math.random() * 2;
      const yOffset = 2 + Math.random() * 2;
      return { angle, radius, yOffset, initialAngle: angle };
    });
  }, [dronesCount]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      
      if (curveRef.current && activePath) {
        // Move along curve
        progressRef.current += delta * 0.2; // Adjust speed
        if (progressRef.current >= 1) {
          progressRef.current = 1;
          const finalPos = curveRef.current.getPointAt(1);
          groupRef.current.position.copy(finalPos);
          useGameStore.getState().setDronePosition([finalPos.x, finalPos.y, finalPos.z]);
          useGameStore.getState().setActivePath(null);
        } else {
          const point = curveRef.current.getPointAt(progressRef.current);
          groupRef.current.position.copy(point);
        }
      } else {
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.2;
      }
    }
    if (materialRef.current) {
      if (droneHealth < 50) {
        // Flicker effect for damaged drones
        materialRef.current.emissiveIntensity = Math.random() > 0.5 ? 0.2 : 0.8;
      } else {
        materialRef.current.emissiveIntensity = 0.8;
      }
    }
  });

  const isDamaged = droneHealth < 50;

  if (dronesCount <= 0) return null;

  return (
    <group ref={groupRef}>
      <Instances limit={100} castShadow receiveShadow>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial 
          ref={materialRef}
          color={isDamaged ? "#ff3300" : "#00ffcc"} 
          roughness={0.2} 
          metalness={0.9} 
          emissive={isDamaged ? "#ff0000" : "#00ffcc"} 
        />
        {droneData.map((data, i) => (
          <Instance
            key={i}
            position={[
              Math.cos(data.initialAngle) * data.radius,
              data.yOffset,
              Math.sin(data.initialAngle) * data.radius
            ]}
          />
        ))}
      </Instances>
    </group>
  );
}
