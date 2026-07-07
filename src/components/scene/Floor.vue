<script setup lang="ts">
import { markRaw, ref, watch } from "vue";
import { useGLTF } from "@tresjs/cientos";
import { Box3, Vector3 } from "three";
import { FLOOR_SIZE } from "./room";
import { v3 } from "@/utils/math";

const { state: model } = useGLTF("/models/room/planks.glb");
const plankScale = ref(1);
const plankWidth = 0.5;
const scenes = ref<any[]>([]);
const positions = ref<Vector3[]>([]);

watch(model, (loaded) => {
  if (!loaded) {
    return;
  }

  const box = new Box3();
  box.expandByObject(loaded.scene);
  const plankSize = new Vector3();
  box.getSize(plankSize);
  plankScale.value = plankWidth / plankSize.x;

  for (let i = -FLOOR_SIZE / 2; i < FLOOR_SIZE / 2; i += plankWidth) {
    for (let j = -FLOOR_SIZE / 2; j < FLOOR_SIZE / 2; j += plankWidth) {
      const clone = loaded.scene.clone();
      clone.traverse((child: any) => {
        if (child.isMesh) {
          child.receiveShadow = true;
          child.castShadow = true;
        }
      });
      positions.value.push(
        v3(i + plankWidth / 2, -plankSize.y * plankScale.value, j + plankWidth / 2),
      );
      scenes.value.push(markRaw(clone));
    }
  }
});
</script>

<template>
  <primitive
    v-for="(scene, i) in scenes"
    :key="i"
    :object="scene"
    :position="positions[i]"
    :scale="plankScale"
  />
</template>
