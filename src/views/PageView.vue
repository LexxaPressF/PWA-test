<template>
    <header>
        <div></div>
        <div>
            <UiBtn
                text="На главную"
                @click="pushHome()"
            />
        </div>
        <div>FPS: {{ fps }}</div>
    </header>
    <main>
        <RouterView />
    </main>
</template>

<script setup lang="ts">
import UiBtn from '@/components/common/UiBtn.vue';
import {useFps} from '@vueuse/core';
import router from '@/router';

const fps = useFps();
const pushHome = () => {
    setTimeout(() => router.push({name: 'home'}), 500);
};
</script>

<style scoped lang="scss">
header {
    height: 10%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #00bd7e;
}
main {
    height: 80%;
}
</style>
