<template>
    <NestedElement v-model="nestedStructure" />
</template>

<script setup lang="ts">
import NestedElement from '@/components/NestedElement.vue';
import type {NestedItem} from '@/models/NestedModels.ts';
import {ref} from 'vue';
import {nestedConstant} from '@/constants/NestedConstant.ts';

const nestedStructure = ref<NestedItem>(nestedConstant);
</script>

<style scoped lang="scss"></style>
