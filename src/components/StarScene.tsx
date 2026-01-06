import { Canvas } from "@react-three/fiber";
import MovingStars from "./Star";

interface StarScenePropes {}

const StarScene: React.FC<StarScenePropes> = () => {
  return (
    <div className="absolute top-0 w-full h-full left-0 z-0 bg-[#06090d]">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <MovingStars />
      </Canvas>
    </div>
  );
};

export default StarScene;
