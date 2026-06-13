import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line, Sphere } from '@react-three/drei';

function NeuralNetwork() {
    const nodes = [
        [-3, 2, 0], [0, 3, 0], [3, 2, 0],
        [-2, 0, 1], [0, 0, 0], [2, 0, -1],
        [-3, -2, 0], [0, -3, 0], [3, -2, 0]
    ];

    const connections = [
        [0, 1], [1, 2], [0, 3], [1, 4], [2, 5],
        [3, 4], [4, 5], [3, 6], [4, 7], [5, 8],
        [6, 7], [7, 8]
    ];

    return (
        <>
            {nodes.map((pos, i) => (
                <Sphere key={i} position={pos} args={[0.1, 16, 16]}>
                    <meshStandardMaterial color="#3b82f6" emissive="#00aaff" emissiveIntensity={0.4} />
                </Sphere>
            ))}
            {connections.map(([a, b], i) => (
                <Line
                    key={i}
                    points={[nodes[a], nodes[b]]}
                    color="#06b6d4"
                    lineWidth={1}
                    opacity={0.3}
                    transparent
                />
            ))}
        </>
    );
}

export default function GraphBackground() {
    return (
        <div className="fixed inset-0 -z-15 opacity-30 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 10], fov: 55 }}>
                <ambientLight intensity={0.3} />
                <pointLight position={[5, 5, 5]} intensity={0.5} />
                <NeuralNetwork />
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                />
            </Canvas>
        </div>
    );
}