<template>
    <video
        id="video"
        ref="video"
        class="video"
        :autoplay="true"
        :playsinline="true"
        :muted="true"
    />
</template>

<script setup lang="ts">
import {ref} from 'vue';

const video = ref<HTMLVideoElement | null>(null);
navigator.mediaDevices
    .getUserMedia({video: true})
    .then((stream) => {
        if (video.value) {
            video.value.srcObject = stream;
            video.value.play();
        }
    })
    .catch((error) => {
        console.error(error);
    });
</script>

<style scoped lang="scss"></style>
