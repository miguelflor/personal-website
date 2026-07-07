<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { SpotLight } from "three";
import Floor from "./Floor.vue";
import SideWall from "./SideWall.vue";
import { Side } from "../../types";
import DeskScene from "./DeskScene.vue";
import { WALL_INNER_OFFSET } from "./room";

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
  <TresPerspectiveCamera
    :position="[0, 1, -1]"
    :look-at="[0, 0.5, WALL_INNER_OFFSET]"
  />
  <TresGroup>
    <Floor />
    <SideWall :side="Side.Front" />
    <SideWall :side="Side.Left" />
    <SideWall :side="Side.Right" />
    <DeskScene />
  </TresGroup>
  <TresAmbientLight :intensity="0.3" />
  <TresAxesHelper />
  <TresSpotLight
    ref="light"
    :position="[0, 4, -1]"
    :intensity="40"
    :angle="Math.PI / 3"
    :penumbra="0.5"
    :decay="2"
    cast-shadow
  />
  <TresGridHelper :args="[10, 10]" />
</template>
