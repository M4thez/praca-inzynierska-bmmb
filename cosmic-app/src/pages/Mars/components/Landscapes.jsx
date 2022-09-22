import style from '../styles/Landscapes.module.scss'
import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from '@react-three/drei'
// Data could be stored in the database
import landscapes from './Landscapes.json'

function LandModel(props) {
  // Camera rotation and position
  const deg2rad = (degrees) => degrees * (Math.PI / 180)
  useThree(({ camera }) => {
    // camera.rotation.set(deg2rad(-45), 0, 0) // it doesnt work
    camera.position.set(0, 20, 30)
  })

  // Loading GLTF model
  const modelURL = `/src/assets/mars/marsLandscapes/${props.model}`
  const gltf = useLoader(GLTFLoader, modelURL)
  const ref = useRef()
  useFrame(() => (ref.current.rotation.y += 0.0008))

  // Changing gltf mesh color
  gltf.scene.traverse((object) => {
    if (object.isMesh) {
      object.material.color.set(0xffaa80)
      object.material.metalness = 0 // needs to be 0 in order for ambient lighting to work
    }
  })
  return (
    <Suspense fallback={null}>
      <primitive object={gltf.scene} ref={ref} scale={1} />
    </Suspense>
  )
}

export default function Landscapes() {
  const landItems = landscapes.map((land) => (
    <li key={land.title}>
      <div className={style.landscapeElem}>
        <div className={style.landscapeCanvas}>
          {/* changing fov on the Canvas element */}
          <Canvas camera={{ fov: 50 }}>
            <LandModel model={land.model} />
            <ambientLight intensity={0.2} />
            <directionalLight
              color="white"
              position={[5, 5, 5]}
              intensity={1}
            />
            <OrbitControls
              makeDefault
              enableZoom={true}
              enablePan={false}
              zoomSpeed={0.7}
            />
          </Canvas>
        </div>
        <div className={style.landscapeInfo}>
          <h3>{land.title}</h3>
          <p>{land.description}</p>
        </div>
      </div>
    </li>
  ))
  return (
    <section className={style.landscapes}>
      <h2>Landscapes</h2>
      <ul className={style.landscapeList}>{landItems}</ul>
    </section>
  )
}
