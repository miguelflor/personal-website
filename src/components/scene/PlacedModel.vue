<script setup lang="ts">
import { markRaw, ref, watch } from "vue";
import { useGLTF } from "@tresjs/cientos";
import { Box3, Vector3 } from "three";
import type { Object3D } from "three";
import { v3 } from "@/utils/math";
import { ZAnchor } from "@/types";

// Loads a GLTF, normalizes its shadows/materials, scales it to the requested
// height, and places it so the chosen anchor point sits at local (0, 0, 0).
// x is always centered; y always anchors to the bottom; z is configurable.
const props = withDefaults(
  defineProps<{
    url: string;
    height: number;
    position?: Vector3;
    zAnchor?: ZAnchor;
    // Called for every child in the loaded scene, after the default mesh
    // normalization. Use it to tweak specific named meshes (e.g. make a bulb
    // emissive, attach a light).
    onChild?: (child: Object3D) => void;
  }>(),
  { position: () => v3(), zAnchor: ZAnchor.Center },
);

function zOffset(box: Box3, anchor: ZAnchor): number {
  switch (anchor) {
    case ZAnchor.Back:
      return -box.max.z;
    case ZAnchor.Front:
      return -box.min.z;
    case ZAnchor.Center:
      return -(box.min.z + box.max.z) / 2;
  }
}

const emit = defineEmits<{
  (e: "sized", size: Vector3): void;
}>();

const { state: model } = useGLTF(props.url);
const scene = ref<any>();
const scale = ref(1);
const finalPosition = ref<Vector3>(v3());

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
      props.onChild?.(child);
    });

    // Orient the model to face into the room, then measure its bounds in that
    // final orientation so the extents map directly to world axes.
    loaded.scene.rotateY(Math.PI);
    const box = new Box3().expandByObject(loaded.scene);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    scale.value = props.height / size.y;

    finalPosition.value = v3(
      -center.x * scale.value + props.position.x,
      -box.min.y * scale.value + props.position.y,
      zOffset(box, props.zAnchor) * scale.value + props.position.z,
    );
    scene.value = markRaw(loaded.scene);
    emit("sized", size.multiplyScalar(scale.value));
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
