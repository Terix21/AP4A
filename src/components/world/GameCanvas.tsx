import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import { Suspense } from 'react';
import Scene from './Scene';
import Effects from './Effects';

export default function GameCanvas() {
  return (
    <>
      <div className="absolute inset-0 z-0 bg-gray-950 pointer-events-auto">
        <Canvas gl={{ antialias: true, preserveDrawingBuffer: true }} dpr={[1, 2]}>
          <Suspense fallback={null}>
            <Scene />
            <Effects />
          </Suspense>
        </Canvas>
      </div>
      <Loader
        containerStyles={{ background: '#030712' }}
        innerStyles={{ width: '300px' }}
        barStyles={{ background: '#22d3ee' }}
        dataInterpolation={(p) => `Initializing Sector 7... ${p.toFixed(0)}%`}
      />
    </>
  );
}
