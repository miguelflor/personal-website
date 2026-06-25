<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import Room from "./components/scene/Room.vue";
</script>

<template>
    <TresCanvas clear-color="#82DBC5" window-size shadows>
        <Suspense>
            <Room />
        </Suspense>
    </TresCanvas>
</template>
