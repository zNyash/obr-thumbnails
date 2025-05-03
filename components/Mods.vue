<script lang="ts" setup>
import type { TModKey } from '~/types/IModBitwise';


const props = defineProps({mods: Array<TModKey>})

const displayMods = computed(() => {
    let filteredMods = props.mods ? [...props.mods] : [];

    if (filteredMods.includes("NC")) {
        filteredMods = filteredMods.filter(mod => mod !== "DT")
    }
    if (filteredMods.includes("PF")) {
        filteredMods = filteredMods.filter(mod => mod !== "SD")
    }
    return filteredMods
})



</script>

<template>
    <div class="flex flex-row space-x-[-16px]">
        <template v-for="mod in displayMods" :key="mod">
            <img :src="`/mods/${mod}.svg`" class="size-14">
        </template>
    </div>
</template>

<style>
</style>