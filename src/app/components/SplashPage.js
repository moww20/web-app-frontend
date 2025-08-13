"use client"

import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { useRef, useEffect, useState, useMemo } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { motion } from "framer-motion"
import Link from "next/link"
// Navbar is now global, no local connect button needed here

function SimpleCube({ position, color, id, cubeRefs }) {
  const meshRef = useRef()
  const posRef = useRef([...position])
  const velocityRef = useRef([
    (Math.random() - 0.5) * 0.08,
    (Math.random() - 0.5) * 0.08,
    0
  ])
  
  // Register this cube's ref
  cubeRefs.current[id] = {
    position: posRef,
    velocity: velocityRef,
    mesh: meshRef
  }
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.02
      meshRef.current.rotation.y += 0.02
      
      const pos = posRef.current
      const velocity = velocityRef.current
      
      // Check collisions with other cubes
      Object.keys(cubeRefs.current).forEach(otherId => {
        otherId = parseInt(otherId)
        if (otherId !== id && otherId > id) { // Only check each pair once
          const otherCube = cubeRefs.current[otherId]
          if (otherCube && otherCube.position) {
            const otherPos = otherCube.position.current
            const otherVel = otherCube.velocity.current
            
            const dx = pos[0] - otherPos[0]
            const dy = pos[1] - otherPos[1]
            const distance = Math.sqrt(dx * dx + dy * dy)
            const minDistance = 1.5
            
            if (distance < minDistance && distance > 0.01) {
              // Force separation first
              const overlap = minDistance - distance + 0.1 // Add buffer
              const normalX = dx / distance
              const normalY = dy / distance
              
              // Push cubes apart more aggressively
              const pushForce = overlap * 0.6
              pos[0] += normalX * pushForce
              pos[1] += normalY * pushForce
              otherPos[0] -= normalX * pushForce
              otherPos[1] -= normalY * pushForce
              
              // Simple velocity reversal with randomization
              velocity[0] = normalX * Math.abs(velocity[0]) * 1.2 + (Math.random() - 0.5) * 0.02
              velocity[1] = normalY * Math.abs(velocity[1]) * 1.2 + (Math.random() - 0.5) * 0.02
              otherVel[0] = -normalX * Math.abs(otherVel[0]) * 1.2 + (Math.random() - 0.5) * 0.02
              otherVel[1] = -normalY * Math.abs(otherVel[1]) * 1.2 + (Math.random() - 0.5) * 0.02
            }
          }
        }
      })
      
      // Update position
      pos[0] += velocity[0]
      pos[1] += velocity[1]
      
      // Bounce off edges with randomization
      if (pos[0] > 4.5 || pos[0] < -4.5) {
        velocity[0] = -velocity[0] * 0.9 + (Math.random() - 0.5) * 0.02
        pos[0] = pos[0] > 4.5 ? 4.5 : -4.5
      }
      if (pos[1] > 2.5 || pos[1] < -2.5) {
        velocity[1] = -velocity[1] * 0.9 + (Math.random() - 0.5) * 0.02
        pos[1] = pos[1] > 2.5 ? 2.5 : -2.5
      }
      
      meshRef.current.position.set(pos[0], pos[1], pos[2])
    }
  })
  
  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshStandardMaterial color={color} metalness={1} roughness={0.08} envMapIntensity={1.1} />
    </mesh>
  )
}

// Navbar moved to global layout

function ParticleLogoScene() {
  const pointsRef = useRef(null)
  const geometryRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [mode, setMode] = useState('monsters') // 'monsters' | 'logo'
  const particleCount = 9000
  const bounds = useMemo(() => ({ x: 6.0, y: 3.0 }), [])

  // Static buffers
  const seedsRef = useRef(new Float32Array(particleCount))
  const clusterRef = useRef(new Uint8Array(particleCount))
  const logoTargetsRef = useRef(new Float32Array(particleCount * 3))
  // Per-cluster monster shape offsets (local space around [0,0])
  const monsterShapesRef = useRef([[], [], [], []])
  // Map each particle to an index in its cluster's shape array
  const shapeIndexRef = useRef(new Uint32Array(particleCount))

  // Attractors for four "monsters"
  const attractorsRef = useRef(
    Array.from({ length: 4 }).map(() => ({
      pos: [ (Math.random()*0.5), (Math.random()*0.5), 0 ],
      vel: [ (Math.random()-0.5)*0.02, (Math.random()-0.5)*0.02, 0 ],
    }))
  )

  useEffect(() => {
    // Init geometry positions randomly
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[3*i+0] = (Math.random()*2-1) * 1.5
      positions[3*i+1] = (Math.random()*2-1) * 1.0
      positions[3*i+2] = 0
      seedsRef.current[i] = Math.random()*10 + 1
      clusterRef.current[i] = i % 4
    }
    geometryRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    setReady(true)
  }, [])

  useEffect(() => {
    // Load logo and compute target positions
    const img = new Image()
    img.src = '/monswaplogo.png'
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const cvs = document.createElement('canvas')
      const ctx = cvs.getContext('2d')
      const targetW = 220
      const scale = targetW / img.width
      cvs.width = targetW
      cvs.height = Math.max(1, Math.floor(img.height * scale))
      ctx.drawImage(img, 0, 0, cvs.width, cvs.height)
      const data = ctx.getImageData(0, 0, cvs.width, cvs.height).data
      const pixels = []
      for (let y = 0; y < cvs.height; y += 1) {
        for (let x = 0; x < cvs.width; x += 1) {
          const idx = (y * cvs.width + x) * 4
          const a = data[idx + 3]
          if (a > 64) {
            // Map to world coords, center at (0,0)
            const wx = (x / cvs.width - 0.5) * 4.5
            const wy = (0.5 - y / cvs.height) * 2.2
            pixels.push([wx, wy, 0])
          }
        }
      }
      // Assign logo targets by cycling through sampled pixels
      for (let i = 0; i < particleCount; i++) {
        const p = pixels[i % pixels.length] || [0,0,0]
        logoTargetsRef.current[3*i+0] = p[0]
        logoTargetsRef.current[3*i+1] = p[1]
        logoTargetsRef.current[3*i+2] = p[2]
      }
    }
  }, [particleCount])

  useEffect(() => {
    // Load 4 monsters from a spritesheet 'pixelmonsters.png' (4 columns)
    const img = new Image()
    img.src = '/pixelmonsters.png'
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const cols = 4
      const cellW = Math.floor(img.width / cols)
      const cellH = img.height
      const targetW = 140 // scale each monster width to ~140px before sampling
      const scale = targetW / cellW
      const cvs = document.createElement('canvas')
      const ctx = cvs.getContext('2d')
      cvs.width = Math.max(1, Math.floor(cellW * scale))
      cvs.height = Math.max(1, Math.floor(cellH * scale))
      const clusters = [[], [], [], []]
      for (let m = 0; m < 4; m++) {
        ctx.clearRect(0,0,cvs.width,cvs.height)
        ctx.drawImage(img, m * cellW, 0, cellW, cellH, 0, 0, cvs.width, cvs.height)
        const data = ctx.getImageData(0, 0, cvs.width, cvs.height).data
        const pts = []
        // Subsample for performance
        const step = 2
        for (let y = 0; y < cvs.height; y += step) {
          for (let x = 0; x < cvs.width; x += step) {
            const idx = (y * cvs.width + x) * 4
            const a = data[idx + 3]
            if (a > 64) {
              const nx = (x / cvs.width - 0.5) * 2.2 // normalize to ~[-1.1,1.1]
              const ny = (0.5 - y / cvs.height) * 2.2
              pts.push([nx, ny, 0])
            }
          }
        }
        clusters[m] = pts
      }
      monsterShapesRef.current = clusters
      // Assign a shape index per particle within its cluster
      for (let i = 0; i < particleCount; i++) {
        const c = clusterRef.current[i]
        const pts = monsterShapesRef.current[c]
        shapeIndexRef.current[i] = pts.length ? (i % pts.length) : 0
      }
    }
  }, [particleCount])

  useEffect(() => {
    const id = setInterval(() => {
      setMode(m => (m === 'monsters' ? 'logo' : 'monsters'))
    }, 8000)
    return () => clearInterval(id)
  }, [])

  useFrame((state, delta) => {
    if (!ready || !geometryRef.current) return
    const t = state.clock.elapsedTime
    const pos = geometryRef.current.attributes.position.array
    // Update attractors random-walk within bounds
    for (const a of attractorsRef.current) {
      a.pos[0] += a.vel[0]
      a.pos[1] += a.vel[1]
      // bounce
      if (a.pos[0] > bounds.x) { a.pos[0] = bounds.x; a.vel[0] *= -1 }
      if (a.pos[0] < -bounds.x) { a.pos[0] = -bounds.x; a.vel[0] *= -1 }
      if (a.pos[1] > bounds.y) { a.pos[1] = bounds.y; a.vel[1] *= -1 }
      if (a.pos[1] < -bounds.y) { a.pos[1] = -bounds.y; a.vel[1] *= -1 }
      // slight drift
      a.vel[0] += (Math.random()-0.5)*0.001
      a.vel[1] += (Math.random()-0.5)*0.001
      a.vel[0] = Math.max(-0.03, Math.min(0.03, a.vel[0]))
      a.vel[1] = Math.max(-0.03, Math.min(0.03, a.vel[1]))
    }

    for (let i = 0; i < particleCount; i++) {
      const ix = 3*i
      let tx, ty, tz
      if (mode === 'logo') {
        tx = logoTargetsRef.current[ix]
        ty = logoTargetsRef.current[ix+1]
        tz = 0
      } else {
        const c = clusterRef.current[i]
        const a = attractorsRef.current[c]
        const s = seedsRef.current[i]
        const pts = monsterShapesRef.current[c]
        if (pts && pts.length) {
          const [ox, oy] = pts[ shapeIndexRef.current[i] % pts.length ]
          // Base on monster local shape offset, plus a subtle wobble
          tx = a.pos[0] + ox + Math.sin(t*1.4 + s) * 0.05
          ty = a.pos[1] + oy + Math.cos(t*1.2 + s*0.7) * 0.05
          tz = 0
        } else {
          // fallback to cloud if shape not ready
          tx = a.pos[0] + Math.sin(t*0.8 + s)*0.6
          ty = a.pos[1] + Math.cos(t*0.7 + s*0.7)*0.45
          tz = 0
        }
      }
      // smooth follow
      pos[ix]   += (tx - pos[ix]) * 0.08
      pos[ix+1] += (ty - pos[ix+1]) * 0.08
      pos[ix+2] += (tz - pos[ix+2]) * 0.08
    }
    geometryRef.current.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geometryRef} />
      <pointsMaterial color="#e6e6e6" size={0.06} sizeAttenuation transparent opacity={0.9} />
    </points>
  )
}

function FeatureCard({ title, description, icon, delay }) {
  return (
    <motion.div
      className="glass hairline rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
    >
      <div className="w-14 h-14 mb-4 mx-auto flex items-center justify-center rounded-full hairline bg-white/5">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2 tracking-tight">{title}</h3>
      <p className="text-sm text-[--color-muted] leading-relaxed">{description}</p>
    </motion.div>
  )
}

// Removed 3D volumetric beams in favor of subtle page-level gradient accents

export default function SplashPage() {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Global navbar rendered from layout */}
      {/* soft vignette for depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_0%,rgba(255,255,255,0.06)_0%,transparent_60%)]" />
      {/* Subtle diagonal studio-light accents */}
      <div className="pointer-events-none absolute inset-0 z-[5]">
        {/* Left red beam: diagonal, wide, very soft */}
        <div className="absolute left-[-10vw] top-[-10vh] w-[60vw] h-[120vh] rotate-[-18deg] opacity-20 blur-3xl [mix-blend-mode:screen] bg-[linear-gradient(90deg,transparent_0%,color(display-p3_1_0.33_0.38/_0.65)_30%,transparent_75%)]" />
        {/* Right blue beam: mirrored diagonal */}
        <div className="absolute right-[-10vw] top-[-10vh] w-[60vw] h-[120vh] rotate-[18deg] opacity-20 blur-3xl [mix-blend-mode:screen] bg-[linear-gradient(270deg,transparent_0%,color(display-p3_0.35_0.66_1/_0.65)_30%,transparent_75%)]" />
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-24">
        <motion.div 
          className="text-center mb-20 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <p className="mt-4 text-lg md:text-xl text-[--color-muted] max-w-2xl mx-auto leading-relaxed">
              Ultra-fast, deeply liquid, and truly decentralized. <br />Built for the Monad ecosystem.
            </p>
          </motion.div>
        </motion.div>
        
        <div className="fixed inset-0 z-0">
          <Canvas
            shadows
            camera={{ position: [0, 0, 6], fov: 60 }}
            gl={{ antialias: true }}
          >
            <fog attach="fog" args={["#0b0b0f", 6, 14]} />
            <ambientLight intensity={0.18} />
            <directionalLight
              position={[6, 6, 8]}
              intensity={0.5}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            {/* Side colored spotlights (subtle, for reflections) */}
            <spotLight
              position={[-12, 2, 2]}
              intensity={1.2}
              angle={0.5}
              distance={36}
              penumbra={0.9}
              color="#ff4d5a"
              castShadow
            />
            <spotLight
              position={[12, -1, 2]}
              intensity={1.0}
              angle={0.5}
              distance={36}
              penumbra={0.9}
              color="#5aa8ff"
              castShadow
            />

            {/* Subtle studio environment for better reflections */}
            <Environment preset="studio" intensity={0.5} />

            <ParticleLogoScene />

            {/* Ground plane for shadows */}
            <mesh receiveShadow position={[0, -4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[30, 30]} />
              <shadowMaterial opacity={0.22} />
            </mesh>
          </Canvas>
        </div>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 relative z-10 max-w-6xl w-full px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <FeatureCard 
            title="Lightning Fast Trades" 
            description="Execute swaps in milliseconds with Monad’s parallel engine."
            icon={<svg className="w-7 h-7 text-[--color-accent]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>}
            delay={0.6}
          />
          <FeatureCard 
            title="Deep Liquidity Pools" 
            description="Access deep liquidity with a next‑gen AMM design."
            icon={<svg className="w-7 h-7 text-[--color-accent]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z" clipRule="evenodd" /></svg>}
            delay={0.8}
          />
          <FeatureCard 
            title="Yield Farming" 
            description="Boost returns with efficient, transparent farming incentives."
            icon={<svg className="w-7 h-7 text-[--color-accent]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" /></svg>}
            delay={1.0}
          />
        </motion.div>

        <motion.div
          className="text-center relative z-10 mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="flex items-center justify-center">
            <Link href="/trade" className="px-6 py-3 rounded-full bg-accent-gradient text-white font-medium hover:opacity-90 transition">
              Get started
            </Link>
          </div>
        </motion.div>
      </div>
      
      <motion.footer
        className="relative z-10 text-center text-[--color-muted] text-sm py-8 hairline-t"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <p>© 2025 MONSWAP DEX. Launching on Monad Testnet soon.</p>
      </motion.footer>
    </div>
  )
}
