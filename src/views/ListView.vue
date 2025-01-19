<template>
    <div class="controls">
        <UiBtn
            text="Cгенерировать список"
            @click="generateList"
        />
        <UiBtn
            text="Отсортировать список по random"
            @click="list.sort((a, b) => a.randomNumber - b.randomNumber)"
        />
    </div>
    <div class="list">
        <ListElement
            v-for="element in list"
            :key="element.id"
            :element="element"
        />
    </div>
</template>

<script setup lang="ts">
import UiBtn from '@/components/common/UiBtn.vue';
import ListElement from '@/components/ListElement.vue';
import {ref} from 'vue';
import type {IListElement} from '@/models/ListModels.ts';
import {generateUid} from '@/helpers/UidHelper.ts';

const list = ref<IListElement[]>([]);

const generateList = () => {
    list.value = Array.from({length: 1000}, (_, index) => {
        return {
            id: index,
            randomNumber: Math.floor(Math.random() * 1000),
            uid: generateUid(),
        };
    });
};
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
