<script setup lang="ts">
import { ref, watch } from "vue";
import type { Vector3 } from "three";
import PlacedModel from "./PlacedModel.vue";
import LightDesk from "./LightDesk.vue";
import { DESK_HEIGHT, WALL_INNER_OFFSET } from "./room";
import { v3 } from "@/utils/math";
import { ZAnchor } from "@/types";

const emit = defineEmits<{
  (e: "sized", size: Vector3): void;
}>();

const groupPosition = v3(0, 0, WALL_INNER_OFFSET);

const monitorRotation: [number, number, number] = [0, Math.PI / 8, 0];
const keyboardRotation: [number, number, number] = [0, Math.PI / 15, 0];
const lampRotation: [number, number, number] = [0, -Math.PI / 3, 0];
const mouseRotation: [number, number, number] = [0, Math.PI + Math.PI / 9, 0];

const deskSize = ref<Vector3>();
let deskTop = v3();
let monitorPosition = v3();
let lightDesk = v3();
let keyboardPosition = v3();
const mousePosition = v3();

function onDeskSized(size: Vector3) {
  deskSize.value = size;
  emit("sized", size);
}

watch(deskSize, (loaded) => {
  if (!loaded) {
    return;
  }

  deskTop = v3(0, DESK_HEIGHT, -loaded.z * 0.5);
  monitorPosition = v3(loaded.x * 0.25, 0, loaded.z * 0.17);
  lightDesk = v3(-loaded.x * 0.4, 0, loaded.z * 0.25);
  keyboardPosition = v3(loaded.x * 0.17, 0, -loaded.z * 0.33);
  mousePosition.addVectors(keyboardPosition, v3(-loaded.x * 0.16, 0, 0));
});
</script>

<template>
  <!--
    Group origin sits on the front wall's inner face (local z = 0)
  -->
  <TresGroup :position="groupPosition">
    <PlacedModel
      url="/models/room/desk.glb"
      :height="DESK_HEIGHT"
      :z-anchor="ZAnchor.Back"
      @sized="onDeskSized"
    />
    <TresGroup v-if="deskSize" :position="deskTop">
      <!-- Monitor -->
      <TresGroup :position="monitorPosition" :rotation="monitorRotation">
        <PlacedModel
          url="/models/room/monitor.glb"
          :height="DESK_HEIGHT / 1.7"
        />
      </TresGroup>
      <!-- Keyboard -->
      <TresGroup :position="keyboardPosition" :rotation="keyboardRotation">
        <PlacedModel
          url="/models/room/keyboard.glb"
          :height="DESK_HEIGHT / 9"
        />
      </TresGroup>
      <!-- Mouse -->
      <TresGroup :position="mousePosition" :rotation="mouseRotation">
        <PlacedModel url="/models/room/mouse.glb" :height="DESK_HEIGHT / 15" />
      </TresGroup>
      <!-- Lamp -->
      <LightDesk :position="lightDesk" :rotation="lampRotation" />
    </TresGroup>
  </TresGroup>
</template>
