<template>
    <EarthGraphic />
</template>

<script setup lang="ts">
import EarthGraphic from '@/components/EarthGraphic.vue';
import usePerformanceMark from '@/helpers/PerfomanceHelper.ts';
usePerformanceMark('GraphicView');
</script>

<style scoped lang="scss"></style>
