<template>
    <div>
        <h1>Geolocation API</h1>
        <div v-if="errorMessage">
            <p>Error: {{ errorMessage }}</p>
        </div>
        <div v-else-if="location">
            <p>Latitude: {{ location.latitude }}</p>
            <p>Longitude: {{ location.longitude }}</p>
            <p>Accuracy: {{ location.accuracy }} meters</p>
        </div>
        <div v-else>
            <p>Location not retrieved yet.</p>
        </div>
        <button @click="getLocation">Get Current Location</button>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import usePerformanceMark from '@/helpers/PerfomanceHelper.ts';

// Состояние для хранения текущего местоположения
const location = ref<{
    latitude: number;
    longitude: number;
    accuracy: number;
} | null>(null);

// Состояние для хранения ошибки
const errorMessage = ref<string | null>(null);

// Функция для получения текущего местоположения
const getLocation = () => {
    if (!navigator.geolocation) {
        errorMessage.value = 'Geolocation is not supported by your browser.';
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            location.value = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
            };
            errorMessage.value = null;
        },
        (error) => {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage.value =
                        'Permission denied. Please allow location access.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage.value = 'Position unavailable.';
                    break;
                case error.TIMEOUT:
                    errorMessage.value = 'Request timed out.';
                    break;
                default:
                    errorMessage.value = 'An unknown error occurred.';
            }
        }
    );
};
usePerformanceMark('PhoneGeo');
</script>

<style scoped>
button {
    margin: 10px 0;
}
</style>
