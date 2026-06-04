import { EffectComposer, Bloom, DepthOfField, Vignette } from '@react-three/postprocessing';
import { useGameStore } from '../../store/gameStore';

export default function Effects() {
  const performanceProfile = useGameStore(state => state.performanceProfile);

  if (performanceProfile === 'low') return null;

  return (
    <EffectComposer>
      <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
      <DepthOfField focusDistance={0.02} focalLength={0.05} bokehScale={1} height={480} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  );
}
