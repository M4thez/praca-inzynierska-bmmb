import style from '../styles/Solar.module.scss'
import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import celestials from './Solar.json'
import { OrbitControls } from '@react-three/drei'
import Loader from '../../../infrastructure/loader/Loader'

function CelestialModel(props) {
  const modelURL = `src/assets/solar_system/${props.model}`
  const gltf = useLoader(GLTFLoader, modelURL)
  const ref = useRef()
  useThree(({ camera }) => {
    camera.position.set(0, 60, 125)
  })
  useFrame(() => (ref.current.rotation.y += 0.0005))
  return (
    <Suspense fallback={null}>
      <primitive
        object={gltf.scene}
        ref={ref}
        scale={1}
        position={props.position}
      />
    </Suspense>
  )
}

export default function Solar() {
  const celestialBodies = celestials.map((celes) => (
    <CelestialModel
      model={celes.model}
      position={celes.position}
      key={celes.name}
    />
  ))
  return (
    <main className={style.solar}>
      <Canvas camera={{ far: 2500 }}>
        <Suspense fallback={<Loader />}>
          {celestialBodies}
          <directionalLight color="white" position={[5, 5, 5]} intensity={1} />
          <OrbitControls
            makeDefault
            enableZoom={true}
            enablePan={true}
            zoomSpeed={.5}
          />
        </Suspense>
      </Canvas>
    </main>
  )
}
