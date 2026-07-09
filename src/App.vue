<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import { ACESFilmicToneMapping, PCFShadowMap } from "three";
import Room from "./components/scene/Room.vue";
</script>

<template>
    <TresCanvas clear-color="#82DBC5" window-size shadows :shadow-map-type="PCFShadowMap" :tone-mapping="ACESFilmicToneMapping" :tone-mapping-exposure="1" events-target="window">
        <Suspense>
            <Room />
        </Suspense>
    </TresCanvas>
</template>
