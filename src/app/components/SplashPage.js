"use client"

import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { useEffect, useMemo, useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { motion } from "framer-motion"
import Link from "next/link"
// Navbar is now global, no local connect button needed here

function SimpleCube({ position, color, id, cubeRefs, visible = true }) {
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
    if (!visible) {
      if (meshRef.current) meshRef.current.visible = false
      return
    }
    if (meshRef.current) meshRef.current.visible = true
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
    <mesh ref={meshRef} position={position} castShadow receiveShadow visible={visible}>
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshStandardMaterial color={color} metalness={1} roughness={0.08} envMapIntensity={1.1} />
    </mesh>
  )
}

function CubeScene({ visible = true }) {
  const cubeRefs = useRef({})
  
  return (
    <>
      <SimpleCube position={[-2, 0, 0]} color="#eaeef3" id={0} cubeRefs={cubeRefs} visible={visible} />
      <SimpleCube position={[2, 0, 0]} color="#d7dbe2" id={1} cubeRefs={cubeRefs} visible={visible} />
      <SimpleCube position={[0, 2, 0]} color="#f5f7fa" id={2} cubeRefs={cubeRefs} visible={visible} />
    </>
  )
}

function MorphingParticles({ text = "MONSWAP", phase = "cubes" }) {
  const meshRef = useRef()
  const count = 1800

  const cubeCenters = useMemo(() => [
    new THREE.Vector3(-2, 0, 0),
    new THREE.Vector3(2, 0, 0),
    new THREE.Vector3(0, 2, 0),
  ], [])

  const targetPositions = useMemo(() => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const W = 800, H = 200
    canvas.width = W
    canvas.height = H
    ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = '#fff'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = 'bold 150px system-ui, Arial, sans-serif'
    ctx.fillText(text, W/2, H/2)
    const image = ctx.getImageData(0, 0, W, H).data
    const pts = []
    const step = 4
    for (let y = 0; y < H; y += step) {
      for (let x = 0; x < W; x += step) {
        const idx = (y * W + x) * 4
        if (image[idx + 3] > 180) {
          const nx = (x / W) * 12 - 6
          const ny = -((y / H) * 3 - 1.5)
          const nz = (Math.random() - 0.5) * 0.2
          pts.push(new THREE.Vector3(nx, ny, nz))
        }
      }
    }
    return pts
  }, [text])

  const initialPositionsRef = useRef([])
  const velocitiesRef = useRef([])
  const rotationsRef = useRef([])
  const scalesRef = useRef([])
  const startedRef = useRef(false)
  const startTimeRef = useRef(0)

  useEffectOnce(() => {
    const initial = []
    const velocities = []
    const rots = []
    const scales = []
    for (let i = 0; i < count; i++) {
      const center = cubeCenters[i % cubeCenters.length]
      const p = new THREE.Vector3(
        center.x + (Math.random() - 0.5) * 0.8,
        center.y + (Math.random() - 0.5) * 0.8,
        center.z + (Math.random() - 0.5) * 0.2,
      )
      initial.push(p)
      const v = new THREE.Vector3(
        (Math.random() - 0.5) * 1.8,
        (Math.random() - 0.5) * 1.8,
        (Math.random() - 0.5) * 0.6,
      )
      velocities.push(v)
      rots.push(new THREE.Euler(
        (Math.random() - 0.5) * 0.8,
        (Math.random() - 0.5) * 1.2,
        (Math.random() - 0.5) * 0.8
      ))
      scales.push(THREE.MathUtils.lerp(0.9, 1.4, Math.random()))
    }
    initialPositionsRef.current = initial
    velocitiesRef.current = velocities
    rotationsRef.current = rots
    scalesRef.current = scales
  })

  useFrame((state, delta) => {
    if (!meshRef.current) return
    const dummy = new THREE.Object3D()
    const now = state.clock.getElapsedTime()
    const exploded = phase !== 'cubes'
    if (exploded && !startedRef.current) {
      startedRef.current = true
      startTimeRef.current = now
    }
    const t = Math.max(0, now - startTimeRef.current)
    const explodeDur = 0.5
    const morphStart = explodeDur
    const morphDur = 1.6
    const totalDur = explodeDur + morphDur
    const morphK = THREE.MathUtils.clamp((t - morphStart) / morphDur, 0, 1)

    const ip = initialPositionsRef.current
    const vel = velocitiesRef.current
    for (let i = 0; i < count; i++) {
      const init = ip[i]
      const idx = Math.floor((i / count) * targetPositions.length)
      const target = targetPositions[idx]
      let pos
      if (!exploded) {
        pos = init
      } else if (t < explodeDur) {
        init.add(vel[i].clone().multiplyScalar(delta * 2.2))
        vel[i].multiplyScalar(0.98)
        pos = init
      } else {
        const toTarget = target.clone().sub(init)
        const lerpPos = init.clone().add(toTarget.multiplyScalar(morphK))
        pos = lerpPos
      }
      dummy.position.copy(pos)
      const baseS = exploded ? (t < totalDur ? THREE.MathUtils.lerp(0.012, 0.016, Math.min(1, t / 0.6)) : 0.016) : 0.012
      const shardScale = baseS * (scalesRef.current[i] || 1)
      dummy.scale.setScalar(shardScale)
      const r = rotationsRef.current[i]
      if (r) dummy.rotation.set(r.x, r.y + morphK * 0.3, r.z)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <group rotation={[-0.18, 0.12, 0]}>
      <instancedMesh ref={meshRef} args={[null, null, count]}>
        <boxGeometry args={[1, 0.35, 0.35]} />
        <meshPhysicalMaterial color="#dfe5ee" metalness={1} roughness={0.12} clearcoat={0.6} clearcoatRoughness={0.25} envMapIntensity={1.4} />
      </instancedMesh>
    </group>
  )
}

function useEffectOnce(callback) {
  const callbackRef = useRef(callback)
  useEffect(() => {
    callbackRef.current = callback
  })
  useEffect(() => {
    return callbackRef.current && callbackRef.current()
  }, [])
}

function DiceToTextScene() {
  const [phase, setPhase] = useState('cubes')
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (phase === 'cubes' && t > 2.0) setPhase('morph')
  })
  return (
    <>
      <CubeScene visible={phase === 'cubes'} />
      <MorphingParticles phase={phase} />
    </>
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
          <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-extralight tracking-tight leading-none text-shine">
            MONSWAP
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <p className="mt-4 text-lg md:text-xl text-[--color-muted] max-w-2xl mx-auto leading-relaxed">
              Ultra-fast, deeply liquid, and truly decentralized. Built for the Monad ecosystem.
            </p>
            <div className="mt-8 flex items-center justify-center">
              <Link href="/trade" className="px-6 py-3 rounded-full bg-accent-gradient text-white font-medium hover:opacity-90 transition">
                Get started
              </Link>
            </div>
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

            <DiceToTextScene />

            {/* Ground plane for shadows */}
            <mesh receiveShadow position={[0, -4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[30, 30]} />
              <shadowMaterial opacity={0.22} />
            </mesh>
          </Canvas>
        </div>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 relative z-10 max-w-6xl w-full px-4"
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
          className="text-center relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <div className="flex justify-center gap-10 text-[--color-muted]">
            <div className="text-center">
              <p className="text-4xl font-light text-foreground mb-1">0.03%</p>
              <p className="text-sm">Trading fees</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-light text-foreground mb-1">∞</p>
              <p className="text-sm">Scalability</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-light text-foreground mb-1">100%</p>
              <p className="text-sm">Decentralized</p>
            </div>
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
