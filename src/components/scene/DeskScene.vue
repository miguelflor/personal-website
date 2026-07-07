<script setup lang="ts">
import { ref, watch } from "vue";
import type { Vector3 } from "three";
import PlacedModel from "./PlacedModel.vue";
import { DESK_HEIGHT, WALL_INNER_OFFSET } from "./room";
import { v3 } from "@/utils/math";
import { ZAnchor } from "@/types";


const BULB_COLOR = "#ffd9a3";
// Magic numbers, very difficult not to
const BULB_POSITION = v3(0, 0.19, -0.2);

const GROUP_POSITION = v3(0, 0, WALL_INNER_OFFSET);
const DESK_TOP = v3(0, DESK_HEIGHT, 0);

const emit = defineEmits<{
  (e: "sized", size: Vector3): void;
}>();

const deskSize = ref<Vector3>();
var lightDesk = v3(0,0,0);

function onDeskSized(size: Vector3) {
  deskSize.value = size;
  emit("sized", size);
}

watch(deskSize, (loaded) => {
  if (!loaded) {
    return;
  }

  lightDesk = v3(-loaded.x/2.5, 0, -loaded.z/3);
});
</script>

<template>
  <!--
    Group origin sits on the front wall's inner face (local z = 0)
  -->
  <TresGroup :position="GROUP_POSITION">
    <PlacedModel
      url="/models/room/desk.glb"
      :height="DESK_HEIGHT"
      :z-anchor="ZAnchor.Back"
      @sized="onDeskSized"
    />
    <TresGroup v-if="deskSize" :position="DESK_TOP">
    <TresGroup :position="lightDesk" :rotation="[0,-Math.PI/3,0]">
      <PlacedModel
        url="/models/room/light_desk.glb"
        :height="DESK_HEIGHT / 2"
      />
      <TresMesh :position="BULB_POSITION">
        <TresPointLight
          :color="BULB_COLOR"
          :intensity="1"
          :distance="0"
          :decay="1"
          cast-shadow
        />
      </TresMesh>
    </TresGroup>
    </TresGroup>
  </TresGroup>
</template>
