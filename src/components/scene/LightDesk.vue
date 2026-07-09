<script setup lang="ts">
import type { Vector3 } from "three/src/math/Vector3.js";
import PlacedModel from "./PlacedModel.vue";
import { v3 } from "@/utils/math";
import { DESK_HEIGHT } from "./room";
import { ref } from "vue";
defineProps<{
  position: Vector3;
  rotation: [number, number, number];
}>();

const lightIntensity = ref(1);
function toggleLight() {
  lightIntensity.value = lightIntensity.value === 1 ? 0 : 1;
}

function onPointerEnter() {
  document.body.style.cursor = "pointer";
}

function onPointerLeave() {
  document.body.style.cursor = "default";
}

const BULB_COLOR = "#ffd9a3";
const bulbPosition = v3(0, 0.19, -0.2);
</script>

<template>
  <TresGroup
    :position="position"
    :rotation="rotation"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
    @click="toggleLight"
  >
    <PlacedModel url="/models/room/light_desk.glb" :height="DESK_HEIGHT / 2" />
    <TresPointLight
      :position="bulbPosition"
      :color="BULB_COLOR"
      :intensity="lightIntensity"
      :distance="0"
      :decay="1"
      cast-shadow
    />
  </TresGroup>
</template>
