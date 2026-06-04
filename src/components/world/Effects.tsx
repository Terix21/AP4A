import { EffectComposer, Bloom, DepthOfField, Vignette } from '@react-three/postprocessing';

export default function Effects() {
  return (
    <EffectComposer>
      <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
      <DepthOfField focusDistance={0.02} focalLength={0.05} bokehScale={1} height={480} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  );
}
