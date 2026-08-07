import { useRef, useMemo, Suspense, Component, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Particle Field ───────────────────────────────────────────────────
function generateStarPositions(count, theme) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  const darkPalette = [
    [0.66, 0.33, 0.97],  // neon purple
    [1.0, 0.18, 0.48],   // neon pink
    [0.0, 0.83, 1.0],    // neon cyan
    [0.31, 0.27, 0.90],  // neon blue
    [0.85, 0.55, 1.0],   // soft lavender
  ];

  const lightPalette = [
    [0.39, 0.4, 0.95],   // deeper indigo
    [0.93, 0.28, 0.6],   // deeper pink
    [0.05, 0.65, 0.91],  // deeper sky blue
    [0.55, 0.35, 0.8],   // soft violet
    [0.2, 0.5, 0.95],    // royal blue
  ];

  const colorPalette = theme === 'light' ? lightPalette : darkPalette;

  for (let i = 0; i < count; i++) {
    // Distribute in a large sphere with some clustering
    const radius = 1.5 + Math.random() * 1.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    // Random color from palette
    const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colors[i * 3] = c[0];
    colors[i * 3 + 1] = c[1];
    colors[i * 3 + 2] = c[2];

    // Varied sizes for depth perception
    sizes[i] = 0.008 + Math.random() * 0.016;
  }
  return { positions, colors, sizes };
}

const Particles = ({ theme }) => {
  const pointsRef = useRef();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const { positions, colors, sizes } = useMemo(
    () => generateStarPositions(isMobile ? 800 : 2000, theme),
    [theme]
  );

  // Custom shader material for size-attenuated particles with glow
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: theme === 'light' ? 0.7 : 0.8 },
      },
      vertexShader: `
        attribute float aSize;
        attribute vec3 aColor;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uTime;
        
        void main() {
          vColor = aColor;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          // Twinkle effect based on position and time
          float twinkle = sin(uTime * 1.5 + position.x * 10.0 + position.y * 7.0) * 0.3 + 0.7;
          vAlpha = twinkle;
          
          // Size attenuation with depth
          gl_PointSize = aSize * 300.0 * twinkle * (1.0 / -mvPosition.z);
          gl_PointSize = clamp(gl_PointSize, 1.0, 8.0);
          
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uOpacity;
        
        void main() {
          // Soft circular particle with glow falloff
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          float alpha = smoothstep(0.5, 0.1, dist) * uOpacity * vAlpha;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, [theme]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 4);
    return geo;
  }, [positions, colors, sizes]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Slow auto rotation
      pointsRef.current.rotation.x -= delta * 0.03;
      pointsRef.current.rotation.y -= delta * 0.04;

      // Smooth mouse parallax
      const targetX = state.mouse.x * 0.15;
      const targetY = state.mouse.y * 0.15;
      pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * delta * 1.5;
      pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * delta * 1.5;

      // Update time uniform for twinkle
      shaderMaterial.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry} material={shaderMaterial} />
  );
};

// ─── Floating Wireframe Geometries ────────────────────────────────────
const FloatingGeometry = ({ geometry, position, rotationSpeed, floatSpeed, floatRange, color, scale = 1 }) => {
  const meshRef = useRef();
  const initialY = position[1];

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Slow rotation
      meshRef.current.rotation.x += delta * rotationSpeed[0];
      meshRef.current.rotation.y += delta * rotationSpeed[1];
      meshRef.current.rotation.z += delta * rotationSpeed[2];

      // Floating animation
      meshRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime * floatSpeed) * floatRange;

      // Subtle mouse parallax (less than particles for depth layering)
      const parallaxX = state.mouse.x * 0.05;
      const parallaxY = state.mouse.y * 0.05;
      meshRef.current.position.x = position[0] + parallaxX;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometry}
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={0.08}
        depthWrite={false}
      />
    </mesh>
  );
};

const FloatingGeometries = ({ theme }) => {
  const geometries = useMemo(() => {
    const isDark = theme !== 'light';
    const accent1 = isDark ? '#a855f7' : '#6366f1';
    const accent2 = isDark ? '#ff2d7b' : '#ec4899';
    const accent3 = isDark ? '#00d4ff' : '#0ea5e9';

    return [
      {
        geometry: <icosahedronGeometry args={[1, 1]} />,
        position: [-2.5, 0.8, -2],
        rotationSpeed: [0.08, 0.12, 0.05],
        floatSpeed: 0.4,
        floatRange: 0.3,
        color: accent1,
        scale: 0.8,
      },
      {
        geometry: <octahedronGeometry args={[0.8, 0]} />,
        position: [2.8, -0.5, -1.5],
        rotationSpeed: [0.1, 0.06, 0.08],
        floatSpeed: 0.5,
        floatRange: 0.25,
        color: accent2,
        scale: 0.6,
      },
      {
        geometry: <torusGeometry args={[0.6, 0.2, 8, 16]} />,
        position: [1.5, 1.5, -3],
        rotationSpeed: [0.05, 0.1, 0.07],
        floatSpeed: 0.35,
        floatRange: 0.35,
        color: accent3,
        scale: 0.7,
      },
      {
        geometry: <dodecahedronGeometry args={[0.5, 0]} />,
        position: [-1.8, -1.2, -2.5],
        rotationSpeed: [0.07, 0.09, 0.04],
        floatSpeed: 0.45,
        floatRange: 0.2,
        color: accent1,
        scale: 0.5,
      },
      {
        geometry: <tetrahedronGeometry args={[0.6, 0]} />,
        position: [0.5, -1.8, -1.8],
        rotationSpeed: [0.12, 0.08, 0.06],
        floatSpeed: 0.55,
        floatRange: 0.28,
        color: accent3,
        scale: 0.45,
      },
    ];
  }, [theme]);

  return (
    <>
      {geometries.map((geo, i) => (
        <FloatingGeometry key={i} {...geo} />
      ))}
    </>
  );
};

// ─── Constellation Lines ──────────────────────────────────────────────
const ConstellationLines = ({ theme }) => {
  const linesRef = useRef();
  const pointsData = useMemo(() => {
    // Create a small set of anchor points for constellation
    const count = 25;
    const points = [];
    for (let i = 0; i < count; i++) {
      points.push({
        x: (Math.random() - 0.5) * 5,
        y: (Math.random() - 0.5) * 4,
        z: -1 - Math.random() * 2,
        vx: (Math.random() - 0.5) * 0.002,
        vy: (Math.random() - 0.5) * 0.002,
      });
    }
    return points;
  }, []);

  const connectionDistance = 1.4;
  const lineColor = theme === 'light' ? new THREE.Color('#6366f1') : new THREE.Color('#a855f7');

  useFrame((state) => {
    if (!linesRef.current) return;

    const time = state.clock.elapsedTime;

    // Move anchor points slowly
    for (const p of pointsData) {
      p.x += p.vx + Math.sin(time * 0.3 + p.y) * 0.001;
      p.y += p.vy + Math.cos(time * 0.2 + p.x) * 0.001;

      // Wrap around
      if (p.x > 3) p.x = -3;
      if (p.x < -3) p.x = 3;
      if (p.y > 2.5) p.y = -2.5;
      if (p.y < -2.5) p.y = 2.5;
    }

    // Build line segments between nearby points
    const positions = [];
    for (let i = 0; i < pointsData.length; i++) {
      for (let j = i + 1; j < pointsData.length; j++) {
        const dx = pointsData[i].x - pointsData[j].x;
        const dy = pointsData[i].y - pointsData[j].y;
        const dz = pointsData[i].z - pointsData[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < connectionDistance) {
          positions.push(pointsData[i].x, pointsData[i].y, pointsData[i].z);
          positions.push(pointsData[j].x, pointsData[j].y, pointsData[j].z);
        }
      }
    }

    const geo = linesRef.current.geometry;
    geo.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry />
      <lineBasicMaterial
        color={lineColor}
        transparent
        opacity={theme === 'light' ? 0.06 : 0.04}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
};

// ─── Scene Container ──────────────────────────────────────────────────
const Scene = ({ theme }) => {
  return (
    <>
      <Particles theme={theme} />
      <ConstellationLines theme={theme} />
    </>
  );
};

// ─── Error Boundary ───────────────────────────────────────────────────
class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

// ─── Main Background Component ───────────────────────────────────────
const Background3D = ({ theme }) => {
  return (
    <WebGLErrorBoundary>
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 2.5], fov: 60 }}
            gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
            style={{ background: 'transparent' }}
            dpr={[0.5, 1.5]}
            frameloop="always"
          >
            <Scene theme={theme} />
          </Canvas>
        </Suspense>
      </div>
    </WebGLErrorBoundary>
  );
};

export default Background3D;
