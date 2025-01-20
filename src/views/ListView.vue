<template>
    <div class="controls">
        <UiBtn
            text="Cгенерировать список"
            @click="generateList"
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
import {generateUid} from '@/helpers/UidHelper.ts';
import usePerformanceMark, {
    addPerformanceMark,
} from '@/helpers/PerfomanceHelper.ts';

const list = ref<IListElement[]>([]);

const generateList = () => {
    const t0 = performance.now();
    list.value = Array.from({length: 1000}, (_, index) => {
        return {
            id: index,
            randomNumber: Math.floor(Math.random() * 1000),
            uid: generateUid(),
        };
    });
    const t1 = performance.now();
    addPerformanceMark('list', 'generateList', t0, t1);
};

const deleteElement = (id: number) => {
    const t0 = performance.now();
    list.value = list.value.filter((item) => item.id !== id);
    const t1 = performance.now();
    addPerformanceMark('list', 'delete element from list', t0, t1);
};

const sortList = () => {
    const t0 = performance.now();
    list.value.sort((a, b) => a.randomNumber - b.randomNumber);
    const t1 = performance.now();
    addPerformanceMark('list', 'sort list', t0, t1);
};

usePerformanceMark();
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
