<script setup lang="ts">
import { ref, onMounted } from "vue";
import { DirectionalLight } from "three";
import Floor from "./Floor.vue";
import SideWall from "./SideWall.vue";
import { Side } from "../../types";

const floorSize = 5;
const light = ref<DirectionalLight>();

onMounted(() => {
  if (!light.value) return;
  light.value.shadow.mapSize.set(2048, 2048);
  light.value.shadow.camera.near = 0.1;
  light.value.shadow.camera.far = 20;
  light.value.shadow.camera.left = -6;
  light.value.shadow.camera.right = 6;
  light.value.shadow.camera.top = 6;
  light.value.shadow.camera.bottom = -6;
  light.value.shadow.camera.updateProjectionMatrix();
});
</script>

<template>
  <TresPerspectiveCamera :position="[0, 2, -5]" :look-at="[0, 0, 0]" />
  <TresAmbientLight :intensity="0.5" color="white" />
  <TresGroup>
    <Floor :width="floorSize" />
    <SideWall :floorSize="floorSize" :side="Side.Front" />
    <SideWall :floorSize="floorSize" :side="Side.Left" />
    <SideWall :floorSize="floorSize" :side="Side.Right" />
  </TresGroup>
  <TresAxesHelper />
  <TresDirectionalLight ref="light" :position="[0, 6, -3]" :intensity="1" cast-shadow />
  <TresGridHelper :args="[10, 10]" />
</template>
