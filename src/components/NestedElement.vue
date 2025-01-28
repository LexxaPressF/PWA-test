<template>
    <div class="nested-item">
        <div
            class="content"
            :class="nestedItem.status ? 'active' : 'non-active'"
        >
            <p>Level {{ nestedItem.id }}</p>
            <input
                v-model="nestedItem.tittle"
                type="text"
                placeholder="Название"
            />
            <input
                v-model="nestedItem.description"
                type="text"
                placeholder="Описание"
            />
            <label for="status"> Статус </label>
            <input
                v-model="nestedItem.status"
                type="checkbox"
                name="status"
            />
            <UiBtn
                text="Удалить"
                @click="emit('delete-item', nestedItem.child ?? undefined)"
            />
            <UiBtn
                text="Изменить статус вниз"
                @click="changeStatus('down')"
            />
            <UiBtn
                text="Изменить статус вверх"
                @click="changeStatus('up')"
            />
        </div>
        <div v-if="nestedItem.hasOwnProperty('child')">
            <NestedElement
                v-model="nestedItem.child"
                @change-status="changeStatus('up')"
                @delete-item="deleteItem"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import UiBtn from '@/components/common/UiBtn.vue';
import type {NestedItem} from '@/models/NestedModels.ts';
import usePerformanceMark from '@/helpers/PerfomanceHelper.ts';

const emit = defineEmits<{
    (e: 'change-status'): void;
    (e: 'delete-item', item: NestedItem | undefined): void;
}>();

const nestedItem = defineModel<NestedItem>({default: () => ({})});

const changeStatus = (direction: 'up' | 'down') => {
    if (direction === 'up') {
        nestedItem.value.status = !nestedItem.value.status;
        emit('change-status');
    } else {
        nestedItem.value.status = !nestedItem.value.status;
        let child = nestedItem.value.child;
        while (typeof child !== 'undefined') {
            child.status = !child.status;
            child = child.child;
        }
    }
};

const deleteItem = (item: NestedItem | undefined) => {
    if (item === undefined) {
        delete nestedItem.value.child;
    } else {
        nestedItem.value.child = item;
    }
};

usePerformanceMark(`NestedElement-${nestedItem.value.id}`);
</script>

<style scoped lang="scss">
.nested-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px 0;
}

.content {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

.active {
    background-color: rgba(36, 169, 31, 0.2);
}

.non-active {
    background-color: rgba(193, 36, 36, 0.2);
}

.content p {
    margin: 0;
    font-weight: bold;
}
</style>
