<script setup lang="ts">
import Floor from "./Floor.vue";
import SideWall from "./SideWall.vue";
</script>

<template>
    <TresPerspectiveCamera :position="[6, 1.5, 4]" :look-at="[0, 0, 0]" />
    <TresAmbientLight :intensity="0.5" color="white" />
    <TresGroup>
        <Floor />
        <SideWall />
    </TresGroup>
    <TresAxesHelper />
    <TresDirectionalLight :position="[0, 2, 4]" :intensity="1" cast-shadow />
    <TresGridHelper :args="[10, 10]" />
</template>
