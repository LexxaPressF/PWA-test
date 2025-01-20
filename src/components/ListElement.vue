<template>
    <div class="element">
        <h3>Random: {{ element.randomNumber }}</h3>
        <p>Uid: {{ element.uid }}</p>
        <UiBtn
            text="Удалить"
            @click="emit('delete', element.id)"
        />
    </div>
</template>

<script setup lang="ts">
import type {IListElement} from '@/models/ListModels.ts';
import UiBtn from '@/components/common/UiBtn.vue';

defineProps<{
    element: IListElement;
}>();

const emit = defineEmits<{
    (e: 'delete', id: number): void;
}>();
</script>

<style scoped lang="scss">
.element {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
}
</style>
