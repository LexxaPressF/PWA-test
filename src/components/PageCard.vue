<template>
    <div
        class="page-card"
        @click="router.push({name: page})"
    >
        <div class="icon-wrapper">
            <slot name="icon">🖼️</slot>
        </div>
        <div class="content">
            <h3 class="title">{{ title }}</h3>
            <p class="description">{{ description }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import router from '@/router';

defineProps<{
    title: string;
    description: string;
    page: string;
}>();
</script>

<style scoped lang="scss">
.page-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition:
        transform 0.2s,
        box-shadow 0.2s;
    width: 40%;
    height: 20%;
}

.page-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.icon-wrapper {
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #e0e0e0;
}

.content {
    display: flex;
    flex-direction: column;
}

.title {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
}

.description {
    margin: 4px 0 0;
    color: #555;
}

@media (max-width: 768px) {
    .page-card {
        width: auto;
        height: auto;
    }
}
</style>
