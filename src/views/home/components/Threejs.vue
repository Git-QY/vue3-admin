<template>
  <div ref="canvasContainer"></div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { ref, onMounted } from 'vue'

// 定义场景、相机和渲染器
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5
const renderer = new THREE.WebGLRenderer()
// renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setSize(200, 100) // 设置渲染器的大小为800x600

// 将渲染器的 DOM 元素添加到页面中
const canvasContainer = ref<HTMLElement | null>(null)
onMounted(() => {
  if (canvasContainer.value) {
    canvasContainer.value.appendChild(renderer.domElement)
  }
})

// 创建一个立方体并添加到场景中
const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

// 设置立方体的初始位置和速度
let cubePositionX = 0
let cubeVelocity = 0.05

// 渲染场景
const animate = () => {
  requestAnimationFrame(animate)

  // 让立方体旋转
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  renderer.render(scene, camera)
}
animate()
</script>
