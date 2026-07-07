<script setup lang="ts">
import type { TresObject } from "@tresjs/core";
import { useLoop } from "@tresjs/core";
import { shallowRef } from "vue";
import { v3 } from "@/utils/math";

const { onBeforeRender } = useLoop();

const boxRef = shallowRef<TresObject | null>(null);

const CAMERA_POSITION = v3(10, 5, 5);
const CAMERA_TARGET = v3(0, 0, 0);
const BOX_POSITION = v3(0, 2, 0);
const LIGHT_POSITION = v3(0, 2, 4);

onBeforeRender(({ elapsed }) => {
    if (boxRef.value) {
        boxRef.value.rotation.y = elapsed;
        boxRef.value.rotation.z = elapsed;
    }
});
</script>

<template>
    <TresPerspectiveCamera :position="CAMERA_POSITION" :look-at="CAMERA_TARGET" />
    <TresAmbientLight :intensity="0.5" color="white" />
    <TresMesh ref="boxRef" :position="BOX_POSITION">
        <TresBoxGeometry :args="[1, 1, 1]" />
        <TresMeshNormalMaterial />
    </TresMesh>
    <TresDirectionalLight :position="LIGHT_POSITION" :intensity="1" cast-shadow />
    <TresAxesHelper />
    <TresGridHelper :args="[10, 10]" />
</template>
