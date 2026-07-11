<script setup lang="ts">
import type { Vector3 } from "three/src/math/Vector3.js";
import { DESK_HEIGHT } from "./room";
import PlacedModel from "./PlacedModel.vue";
import { Html } from "@tresjs/cientos";
import { onUnmounted } from "vue";
import type { VNode } from "vue";
import { V86 } from "v86";

defineProps<{
  position: Vector3;
  rotation: [number, number, number];
}>();

// Magic numbers can't measure the computer is very ard
const SCREEN_PX_WIDTH = 900;
const SCREEN_PX_HEIGHT = 770;

const SCREEN_WIDTH = 0.22;

const SCREEN_Z = -0.107;
const SCREEN_Y = 0.17;

const distanceFactor = (SCREEN_WIDTH * 400) / SCREEN_PX_WIDTH;

function onPointerEnter() {
  document.body.style.cursor = "pointer";
}

function onPointerLeave() {
  document.body.style.cursor = "default";
}

let emulator: V86 | null = null;

// @vue:mounted passes the vnode; the real DOM node is on vnode.el.
function setScreenContainer(vnode: VNode) {
  const el = vnode.el;
  if (!(el instanceof HTMLElement) || emulator) return;
  emulator = new V86({
    screen_container: el,
    wasm_path: "/v86-bios/v86.wasm",
    bios: { url: "/v86-bios/seabios.bin" },
    vga_bios: { url: "/v86-bios/vgabios.bin" },
    hda: { url: "/v86-bios/kolibri.img" },
    memory_size: 32 * 1024 * 1024,
    vga_memory_size: 2 * 1024 * 1024,
    autostart: true,
  });
}

onUnmounted(() => {
  emulator?.destroy();
});
</script>

<template>
  <TresGroup
    :position="position"
    :rotation="rotation"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
  >
    <PlacedModel url="/models/room/monitor.glb" :height="DESK_HEIGHT / 1.7" />
    <Html
      transform
      occlude="blending"
      :distance-factor="distanceFactor"
      :position="[0, SCREEN_Y, SCREEN_Z]"
      :rotation="[0, Math.PI, 0]"
      wrapper-class="screen-html"
    >
      <div
        @vue:mounted="setScreenContainer"
        :style="{
          width: `${SCREEN_PX_WIDTH}px`,
          height: `${SCREEN_PX_HEIGHT}px`,
        }"
      >
        <div
          style="
            white-space: pre;
            font: 14px monospace;
            line-height: 14px;
            color: #0f0;
          "
        ></div>
        <canvas style="display: block; width: 100%; height: 100%"></canvas>
      </div>
    </Html>
  </TresGroup>
</template>
