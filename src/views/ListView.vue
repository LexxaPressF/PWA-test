<template>
    <div class="controls">
        <UiBtn
            text="Сгенерировать список"
            @click="generateList()"
        />
        <UiBtn
            text="Отсортировать список по random"
            @click="sortList()"
        />
    </div>
    <div class="list">
        <ListElement
            v-for="element in list"
            :key="element.id"
            :element="element"
            @delete="deleteElement"
        />
    </div>
</template>

<script setup lang="ts">
import UiBtn from '@/components/common/UiBtn.vue';
import ListElement from '@/components/ListElement.vue';
import {ref} from 'vue';
import type {IListElement} from '@/models/ListModels.ts';
import usePerformanceMark, {
    measurePerformance,
} from '@/helpers/PerfomanceHelper.ts';
import {generateUid} from '@/helpers/UidHelper.ts';

const list = ref<IListElement[]>([]);

const generateList = measurePerformance('list', 'generateList', () => {
    list.value = Array.from({length: 1000}, (_, index) => {
        return {
            id: index,
            randomNumber: Math.floor(Math.random() * 1000),
            uid: generateUid(),
        };
    });
});

const deleteElement = measurePerformance(
    'list',
    'delete element',
    (id: number) => {
        list.value = list.value.filter((item) => item.id !== id);
    }
);

const sortList = measurePerformance('list', 'sort list', () => {
    list.value.sort((a, b) => a.randomNumber - b.randomNumber);
});

usePerformanceMark('ListView');
</script>

<style scoped lang="scss">
.list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}
.controls {
    display: flex;
    justify-content: center;
    gap: 10px;
}
</style>
