<script setup lang="ts">
import { useTextures } from "@tresjs/cientos";
import { RepeatWrapping, type Vector3 } from "three";
import { Side } from "../../types";
import {
  FLOOR_SIZE,
  WALL_HEIGHT,
  WALL_INNER_OFFSET,
  WALL_SAFE_OFFSET,
  WALL_THICKNESS,
} from "./room";
import { v3 } from "@/utils/math";

const props = defineProps<{ side: Side }>();
const height = WALL_HEIGHT + WALL_SAFE_OFFSET;
const wallOffset = WALL_INNER_OFFSET + WALL_THICKNESS / 2;
const rotates = props.side === Side.Right || props.side === Side.Left;

const position: Vector3 = (() => {
  switch (props.side) {
    case Side.Back:
      return v3(0, height / 2, -wallOffset);
    case Side.Right:
      return v3(wallOffset, height / 2, 0);
    case Side.Left:
      return v3(-wallOffset, height / 2, 0);
    case Side.Front:
      return v3(0, height / 2, wallOffset);
  }
})();

const rotation: [number, number, number] = [0, rotates ? Math.PI / 2 : 0, 0];

const { textures } = useTextures([
  "/textures/wall/diff.jpg",
  "/textures/wall/nor.jpg",
  "/textures/wall/rough.jpg",
]);

function withRepeat(texture: any) {
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(2, 1);
  return texture;
}
</script>

<template>
  <TresMesh
    receive-shadow
    cast-shadow
    :rotation="rotation"
    :position="position"
  >
    <TresBoxGeometry :args="[FLOOR_SIZE + WALL_SAFE_OFFSET, height, WALL_THICKNESS]" />
    <TresMeshStandardMaterial
      v-if="textures?.length"
      :map="withRepeat(textures[0])"
      :normal-map="withRepeat(textures[1])"
      :roughness-map="withRepeat(textures[2])"
      :metalness="0"
    />
    <TresMeshStandardMaterial
      v-else
      color="#e8e0d5"
      :roughness="0.85"
      :metalness="0"
    />
  </TresMesh>
</template>
