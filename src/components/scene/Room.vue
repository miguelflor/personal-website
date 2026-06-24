<script setup lang="ts">
import Floor from "./Floor.vue";
import SideWall from "./SideWall.vue";
import { Side } from "../../types";

const floorSize = 5;
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
  <TresDirectionalLight :position="[0, 2, 4]" :intensity="1" cast-shadow />
  <TresGridHelper :args="[10, 10]" />
</template>
