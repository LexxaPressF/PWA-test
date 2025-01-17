<template>
    <div class="main-view">
        <PageCard
            v-for="card in cards"
            :key="card.id"
            :title="card.title"
            :description="card.description"
            :page="card.page"
        />
    </div>
</template>

<script lang="ts" setup>
import PageCard from '@/components/PageCard.vue';
import type {Card} from '@/models/MainPageModels.ts';

const cards: Card[] = [
    {
        id: 0,
        title: 'Вложенные данные',
        description:
            'Проверка производительности при отрисовке и взаимодействии с вложенными элементами.',
        page: 'nested',
    },
    {
        id: 1,
        title: 'Большой список',
        description:
            'Проверка производительности при отрисовке большого количества данных и взаимодействии с ними',
        page: 'list',
    },
    {
        id: 2,
        title: 'Графика',
        description:
            'Проверка скорости рендеринга при работе с 3d и 2d графикой.',
        page: 'graphic',
    },
    {
        id: 3,
        title: 'Возможности смартфона',
        description: 'Проверка использования возможностей смартфона в PWA',
        page: 'phone',
    },
    {id: 4, title: 'Card 5', description: 'This is card 5.', page: 'nested'},
    {id: 5, title: 'Card 6', description: 'This is card 6.', page: 'nested'},
];
</script>

<style scoped lang="scss">
.main-view {
    display: flex;
    gap: 16px;
    padding: 16px;
    align-items: center;
    margin: 0 20%;
    flex-wrap: wrap;
}

.card-row {
    display: flex;
    gap: 16px;
    justify-content: center;
}

@media (max-width: 768px) {
    .main-view {
        margin: 0;
        gap: 8px;
        flex-wrap: wrap;
    }
    .card-row {
        flex-direction: column;
        gap: 12px;
    }
}
</style>
