<script setup lang="ts">
import PlacedModel from "./PlacedModel.vue";
import { DESK_HEIGHT, WALL_INNER_OFFSET } from "./room";
</script>

<template>
  <!--
    Group origin sits on the front wall's inner face (local z = 0)
  -->
  <TresGroup :position="[0, 0, WALL_INNER_OFFSET]">
    <PlacedModel url="/models/room/desk.glb" :height="DESK_HEIGHT" />
    <TresGroup :position="[0, DESK_HEIGHT, 0]">
      <PlacedModel url="/models/room/light_desk.glb" :height="DESK_HEIGHT / 2" />
    </TresGroup>
  </TresGroup>
</template>
