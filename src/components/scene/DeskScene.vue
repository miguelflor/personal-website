<script setup lang="ts">
import PlacedModel from "./PlacedModel.vue";
import { DESK_HEIGHT, WALL_INNER_OFFSET } from "./room";

const BULB_COLOR = "#ffd9a3";
// Magic numbers, very difficult not to
const BULB_POSITION: [number, number, number] = [0, 0.19, -0.65];
</script>

<template>
  <!--
    Group origin sits on the front wall's inner face (local z = 0)
  -->
  <TresGroup :position="[0, 0, WALL_INNER_OFFSET]">
    <PlacedModel url="/models/room/desk.glb" :height="DESK_HEIGHT" />
    <TresGroup :position="[0, DESK_HEIGHT, 0]">
      <PlacedModel
        url="/models/room/light_desk.glb"
        :height="DESK_HEIGHT / 2"
        :position="[0, 0, -0.5]"
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
</template>
