<template>
    <div class="element">
        <h3>Id: {{ element.id }}</h3>
        <p>Uid: {{ element.uid }}</p>
        <button>Удалить</button>
    </div>
</template>

<script setup lang="ts">
import type {IListElement} from '@/models/ListModels.ts';

defineProps<{
    element: IListElement;
}>();
</script>

<style scoped lang="scss">
.element {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
}
</style>
