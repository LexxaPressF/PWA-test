<template>
    <header>
        <UiBtn
            text="На главную"
            @click="pushHome()"
        />

        page
    </header>
    <main>
        <RouterView />
    </main>
</template>

<script setup lang="ts">
import UiBtn from '@/components/common/UiBtn.vue';
import router from '@/router';

const pushHome = () => {
    setTimeout(() => router.push({name: 'home'}), 500);
};
</script>

<style scoped lang="scss">
header {
    height: 10%;
    max-height: 86px;
    min-height: 60px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #00bd7e;
}
</style>
