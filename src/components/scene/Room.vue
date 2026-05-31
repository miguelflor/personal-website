<script setup lang="ts">
import Floor from "./Floor.vue";
</script>

<template>
    <TresPerspectiveCamera :position="[10, 5, 5]" :look-at="[0, 0, 0]" />
    <TresAmbientLight :intensity="0.5" color="white" />
    <TresGroup>
        <Floor />
    </TresGroup>
    <TresAxesHelper />
    <TresDirectionalLight :position="[0, 2, 4]" :intensity="1" cast-shadow />
    <TresGridHelper :args="[10, 10]" />
</template>
