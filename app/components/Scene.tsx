import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

function FlowingElement({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 0.1]} />
      <meshStandardMaterial color={new THREE.Color().setHSL(Math.random(), 0.5, 0.5)} />
    </mesh>
  )
}

export default function Scene() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {Array.from({ length: 50 }).map((_, i) => (
        <FlowingElement
          key={i}
          position={[Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10]}
        />
      ))}
    </group>
  )
}

