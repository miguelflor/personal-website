<script setup lang="ts">
import { ref, watch, markRaw } from "vue";
import { useGLTF } from "@tresjs/cientos";
import { Box3, Vector3 } from "three";

const { state: model } = useGLTF("/models/room/planks.glb");
const plankScale = ref(1);
const plankWidth = 0.5;
const floorScale = 8;
const scenes = ref<any[]>([]);
const positions = ref<[number, number, number][]>([]);

watch(model, (loaded) => {
    if (!loaded) return;

    const box = new Box3();
    box.expandByObject(loaded.scene);
    const plankSize = new Vector3();
    box.getSize(plankSize);

    plankScale.value = plankWidth / plankSize.x;

    for (let i = -floorScale / 2; i < floorScale / 2; i += plankWidth) {
        for (let j = -floorScale / 2; j < floorScale / 2; j += plankWidth) {
            positions.value.push([i, 0, j]);
            scenes.value.push(markRaw(loaded.scene.clone()));
        }
    }
});
</script>

<template>
    <primitive v-for="(scene, i) in scenes" :key="i" :object="scene" :position="positions[i]" :scale="plankScale" />
</template>
