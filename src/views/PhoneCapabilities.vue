<template>
    <div>Камера</div>
    <PhoneCamera />
    <PhoneBluetooth />
    <PhoneGeo />
    <PhoneOrientation />
</template>

<script setup lang="ts">
import PhoneCamera from '@/components/Phone/PhoneCamera.vue';
import PhoneBluetooth from '@/components/Phone/PhoneBluetooth.vue';
import PhoneGeo from '@/components/Phone/PhoneGeo.vue';
import PhoneOrientation from '@/components/Phone/PhoneOrientation.vue';
import usePerformanceMark from '@/helpers/PerfomanceHelper.ts';

usePerformanceMark('PhoneCapabilities');
</script>

<style scoped lang="scss"></style>
