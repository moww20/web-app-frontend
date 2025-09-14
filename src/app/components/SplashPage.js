"use client"

import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { useRef, useEffect, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { motion } from "framer-motion"
import Link from "next/link"
// Navbar is now global, no local connect button needed here

function SimpleCube({ position = [0, 0, 0], color = "#ffffff", id = 0, cubeRefs }) {
  const meshRef = useRef()
  const safePos = Array.isArray(position) && position.length === 3 ? position : [0, 0, 0]
  const posRef = useRef([...safePos])
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

function CubeScene() {
  const cubeRefs = useRef({})
  
  return (
    <>
      <SimpleCube position={[-2, 0, 0]} color="#eaeef3" id={0} cubeRefs={cubeRefs} />
      <SimpleCube position={[2, 0, 0]} color="#d7dbe2" id={1} cubeRefs={cubeRefs} />
      <SimpleCube position={[0, 2, 0]} color="#f5f7fa" id={2} cubeRefs={cubeRefs} />
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
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  return (
    <div className="min-h-[calc(100vh-5rem)] relative overflow-hidden flex flex-col justify-between">
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
      
			<div className="flex-1 flex flex-col items-center justify-center px-6 pt-4 md:pt-6 lg:pt-8 pb-2">
				<motion.div 
					className="text-center mb-6 md:mb-8 md:-mt-6 lg:-mt-8 relative z-10"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
			>
					<div className="mx-auto mb-4 h-7 w-7 rounded-full bg-white/5" />
                <div className="flex items-center justify-center">
                  <div className="flex items-center gap-3 whitespace-nowrap">
                    <span className="text-4xl md:text-6xl font-mono tracking-tight typewriter">Web3 DEX</span>
                    <motion.div
                      className="flex items-center flex-shrink-0"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 1.8 }}
                    >
                      <svg className="w-8 md:w-10 h-8 md:h-10 text-accent-gradient" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2L3 7v6l7 5 7-5V7l-7-5zM5 8.5L10 12l5-3.5V11L10 14.5 5 11V8.5z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 0.3 }}
				>
						<p className="mt-3 text-base md:text-lg text-[--color-muted] max-w-2xl mx-auto leading-relaxed">
						Ultra-low latency swaps and aligned liquidity.
					</p>
						<div className="mt-6 flex items-center justify-center gap-3">
						<Link href="/trade" className="px-6 py-3 rounded-full bg-accent-gradient text-white font-medium hover:opacity-90 transition">
							Launch app
						</Link>
					</div>
				</motion.div>
			</motion.div>
        
			{isDesktop && (
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

						{/* Simple ambient lighting for better reflections */}
						<ambientLight intensity={0.4} />

						<CubeScene />

						{/* Ground plane for shadows */}
						<mesh receiveShadow position={[0, -4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
							<planeGeometry args={[30, 30]} />
							<shadowMaterial opacity={0.22} />
						</mesh>
					</Canvas>
				</div>
			)}
        
			<motion.div
				className="hidden 2xl:grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 relative z-10 max-w-6xl w-full px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <FeatureCard
            title="Lightning Fast Trades"
            description="Execute swaps in milliseconds with our optimized trading engine."
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
        
        
      </div>
      
      <motion.footer
        className="relative z-10 text-center text-[--color-muted] text-sm py-4 md:py-6 hairline-t"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <p>© 2025 Web3 DEX. A decentralized exchange for the Web3 ecosystem.</p>
      </motion.footer>
    </div>
  )
}
