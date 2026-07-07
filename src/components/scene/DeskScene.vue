<script setup lang="ts">
import PlacedModel from "./PlacedModel.vue";
import { DESK_HEIGHT, WALL_INNER_OFFSET } from "./room";
import { v3 } from "@/utils/math";

const LIGHT_DESK = v3(0, 0, -0.5);

const BULB_COLOR = "#ffd9a3";
// Magic numbers, very difficult not to
const BULB_POSITION = LIGHT_DESK.clone().add(v3(0, 0.19, -0.1));

const GROUP_POSITION = v3(0, 0, WALL_INNER_OFFSET);
const DESK_TOP = v3(0, DESK_HEIGHT, 0);
</script>

<template>
  <!--
    Group origin sits on the front wall's inner face (local z = 0)
  -->
  <TresGroup :position="GROUP_POSITION">
    <PlacedModel url="/models/room/desk.glb" :height="DESK_HEIGHT" />
    <TresGroup :position="DESK_TOP">
      <PlacedModel
        url="/models/room/light_desk.glb"
        :height="DESK_HEIGHT / 2"
        :position="LIGHT_DESK"
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
