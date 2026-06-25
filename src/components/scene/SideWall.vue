<script setup lang="ts">
import { Side } from "../../types";

const props = defineProps<{ side: Side; floorSize: number }>();
const width = 0.05;
const hight = 2;
const wallOffset = props.floorSize / 2 + width / 2;
const rotates = props.side === Side.Right || props.side === Side.Left;

const position = (() => {
  switch (props.side) {
    case Side.Back:
      return [0, hight / 2, -wallOffset];
    case Side.Right:
      return [wallOffset, hight / 2, 0];
    case Side.Left:
      return [-wallOffset, hight / 2, 0];
    case Side.Front:
      return [0, hight / 2, wallOffset];
  }
})();
</script>

<template>
  <TresMesh
    receive-shadow
    cast-shadow
    :rotation="[0, rotates ? Math.PI / 2 : 0, 0]"
    :position="position as [number, number, number]"
  >
    <TresBoxGeometry :args="[floorSize, hight, width]" />
    <TresMeshStandardMaterial />
  </TresMesh>
</template>
