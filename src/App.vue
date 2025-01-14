<template>
    <main class="custom-height">
        <RouterView class="custom-height" />
    </main>
</template>

<script setup lang="ts">
import {RouterView} from 'vue-router';
</script>

<style scoped lang="scss">
.custom-height {
    height: 100vh;
}
</style>
