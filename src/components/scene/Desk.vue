<script setup lang="ts">
import { markRaw, ref, watch } from "vue";
import { useGLTF } from "@tresjs/cientos";
import { Box3, Vector3 } from "three";
import { wallInnerOffset } from "./room";

const props = defineProps<{ height: number; floorSize: number }>();

const { state: model } = useGLTF("/models/room/desk.glb");
const scene = ref<any>();
const deskScale = ref(1);
const position = ref<[number, number, number]>([0, 0, 0]);

watch(
  model,
  (loaded) => {
    if (!loaded) {
      return;
    }
    loaded.scene.traverse((child: any) => {
      if (child.isMesh) {
        child.receiveShadow = true;
        child.castShadow = true;
        if (child.material) {
          child.material.metalness = 0;
          child.material.roughness = 0.8;
          child.material.needsUpdate = true;
        }
      }
    });

    // Orient the desk to face into the room, then measure its bounds in that
    // final orientation so the extents map directly to world axes.
    loaded.scene.rotateY(Math.PI);
    const box = new Box3().expandByObject(loaded.scene);
    const deskSize = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    deskScale.value = props.height / deskSize.y;

    // Center in X, rest on the floor in Y, and push back until the desk's rear
    // edge sits flush against the front wall's inner face in Z.
    const backEdge =
      wallInnerOffset(props.floorSize) - box.max.z * deskScale.value;
    position.value = [
      -center.x * deskScale.value,
      -box.min.y * deskScale.value,
      backEdge,
    ];
    scene.value = markRaw(loaded.scene);
  },
  { immediate: true },
);
</script>

<template>
  <primitive
    v-if="scene"
    :object="scene"
    :position="position"
    :scale="deskScale"
  />
</template>
