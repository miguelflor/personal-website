<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import { PCFShadowMap } from "three";
import Room from "./components/scene/Room.vue";
</script>

<template>
    <TresCanvas clear-color="#82DBC5" window-size shadows :shadow-map-type="PCFShadowMap">
        <Suspense>
            <Room />
        </Suspense>
    </TresCanvas>
</template>
