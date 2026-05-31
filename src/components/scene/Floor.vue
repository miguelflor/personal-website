<script setup lang="ts">
import { useGLTF } from "@tresjs/cientos";
const { state: model } = useGLTF("/models/room/planks.glb");
const plankScale = 0.5;
const flootScale = 8;
</script>
<template>
    <primitive v-if="model" :object="model.scene" :position="[4, 0, 0]" :scale="0.5" />
</template>
