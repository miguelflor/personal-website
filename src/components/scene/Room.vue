<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { SpotLight } from "three";
import Floor from "./Floor.vue";
import SideWall from "./SideWall.vue";
import Desk from "./Desk.vue";
import { Side } from "../../types";

const floorSize = 5;
const light = ref<SpotLight>();

onMounted(() => {
  if (!light.value) {
    return;
  }
  light.value.shadow.mapSize.set(2048, 2048);
  light.value.shadow.camera.near = 0.5;
  light.value.shadow.camera.far = 20;
});
</script>

<template>
  <TresPerspectiveCamera :position="[0, 2, -5]" :look-at="[0, 1, 0]" />
  <TresGroup>
    <Floor :width="floorSize" />
    <SideWall :floorSize="floorSize" :side="Side.Front" />
    <SideWall :floorSize="floorSize" :side="Side.Left" />
    <SideWall :floorSize="floorSize" :side="Side.Right" />
    <Desk :height="0.5" :floorSize="floorSize" />
  </TresGroup>
  <TresAmbientLight :intensity="0.3" />
  <TresAxesHelper />
  <TresSpotLight
    ref="light"
    :position="[0, 5, 0]"
    :intensity="20"
    :angle="Math.PI / 3"
    :penumbra="0.5"
    :decay="2"
    cast-shadow
  />
  <TresGridHelper :args="[10, 10]" />
</template>
