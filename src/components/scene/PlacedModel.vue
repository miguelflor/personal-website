<script setup lang="ts">
import { markRaw, ref, watch } from "vue";
import { useGLTF } from "@tresjs/cientos";
import { Box3, Vector3 } from "three";

// Loads a GLTF, normalizes its shadows/materials, scales it to the requested
// height, and places it so its back-bottom-center sits at local (0, 0, 0).
// Callers position it in a parent group.
const props = withDefaults(
  defineProps<{
    url: string;
    height: number;
    position?: [number, number, number];
  }>(),
  { position: () => [0, 0, 0] },
);

const { state: model } = useGLTF(props.url);
const scene = ref<any>();
const scale = ref(1);
const finalPosition = ref<[number, number, number]>([0, 0, 0]);

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

    // Orient the model to face into the room, then measure its bounds in that
    // final orientation so the extents map directly to world axes.
    loaded.scene.rotateY(Math.PI);
    const box = new Box3().expandByObject(loaded.scene);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    scale.value = props.height / size.y;

    finalPosition.value = [
      -center.x * scale.value + props.position[0],
      -box.min.y * scale.value + props.position[1],
      -box.max.z * scale.value + props.position[2],
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
    :position="finalPosition"
    :scale="scale"
  />
</template>
