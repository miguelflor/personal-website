<script setup lang="ts">
import Desk from "./Desk.vue";
import { DESK_HEIGHT, WALL_INNER_OFFSET } from "./room";
</script>

<template>
  <!--
    Group origin sits on the front wall's inner face (local z = 0)
  -->
  <TresGroup :position="[0, 0, WALL_INNER_OFFSET]">
    <Desk :height="DESK_HEIGHT" />
    <TresGroup :position="[0, DESK_HEIGHT, 0]" />
  </TresGroup>
</template>
