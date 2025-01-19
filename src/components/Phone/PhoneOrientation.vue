<template>
    <div class="sensor-demo">
        <h1>Датчики движения и ориентации</h1>

        <div
            v-if="!apiSupported"
            class="not-supported"
        >
            <p>
                Ваш браузер не поддерживает API датчиков движения и ориентации.
            </p>
        </div>

        <div v-else>
            <div class="orientation">
                <h2>Device Orientation</h2>
                <p>Alpha (заголовок): {{ orientation.alpha }}</p>
                <p>Beta (тангаж): {{ orientation.beta }}</p>
                <p>Gamma (крен): {{ orientation.gamma }}</p>
            </div>

            <div class="motion">
                <h2>Device Motion</h2>
                <p>Ускорение (без гравитации):</p>
                <ul>
                    <li>X: {{ motion.acceleration.x }}</li>
                    <li>Y: {{ motion.acceleration.y }}</li>
                    <li>Z: {{ motion.acceleration.z }}</li>
                </ul>
                <p>Ускорение (с гравитацией):</p>
                <ul>
                    <li>X: {{ motion.accelerationIncludingGravity.x }}</li>
                    <li>Y: {{ motion.accelerationIncludingGravity.y }}</li>
                    <li>Z: {{ motion.accelerationIncludingGravity.z }}</li>
                </ul>
                <p>Гироскоп (угловая скорость):</p>
                <ul>
                    <li>Alpha: {{ motion.rotationRate.alpha }}</li>
                    <li>Beta: {{ motion.rotationRate.beta }}</li>
                    <li>Gamma: {{ motion.rotationRate.gamma }}</li>
                </ul>
            </div>

            <div
                v-if="error"
                class="error"
            >
                <p>{{ error }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted} from 'vue';

// Интерфейсы для удобства типизации
interface Acceleration {
    x: number;
    y: number;
    z: number;
}

interface RotationRate {
    alpha: number;
    beta: number;
    gamma: number;
}

interface MotionData {
    acceleration: Acceleration;
    accelerationIncludingGravity: Acceleration;
    rotationRate: RotationRate;
}

interface OrientationData {
    alpha: number;
    beta: number;
    gamma: number;
}

// Состояния для хранения данных датчиков
const orientation = ref<OrientationData>({
    alpha: 0,
    beta: 0,
    gamma: 0,
});

const motion = ref<MotionData>({
    acceleration: {x: 0, y: 0, z: 0},
    accelerationIncludingGravity: {x: 0, y: 0, z: 0},
    rotationRate: {alpha: 0, beta: 0, gamma: 0},
});

const error = ref<string | null>(null);
const apiSupported = ref(true);

/**
 * Обрабатываем событие DeviceOrientationEvent
 */
function handleOrientation(event: DeviceOrientationEvent) {
    // Проверяем, что alpha, beta, gamma не null
    orientation.value = {
        alpha: event.alpha ?? 0,
        beta: event.beta ?? 0,
        gamma: event.gamma ?? 0,
    };
}

/**
 * Обрабатываем событие DeviceMotionEvent
 */
function handleMotion(event: DeviceMotionEvent) {
    motion.value = {
        acceleration: {
            x: event.acceleration?.x ?? 0,
            y: event.acceleration?.y ?? 0,
            z: event.acceleration?.z ?? 0,
        },
        accelerationIncludingGravity: {
            x: event.accelerationIncludingGravity?.x ?? 0,
            y: event.accelerationIncludingGravity?.y ?? 0,
            z: event.accelerationIncludingGravity?.z ?? 0,
        },
        rotationRate: {
            alpha: event.rotationRate?.alpha ?? 0,
            beta: event.rotationRate?.beta ?? 0,
            gamma: event.rotationRate?.gamma ?? 0,
        },
    };
}

onMounted(() => {
    if (
        typeof DeviceOrientationEvent === 'undefined' ||
        typeof DeviceMotionEvent === 'undefined'
    ) {
        apiSupported.value = false;
        error.value =
            'Датчики движения и ориентации не поддерживаются вашим устройством.';
        return;
    }

    // Проверяем, нужно ли на iOS запрашивать разрешение
    // Обратите внимание, что метод requestPermission отсутствует в
    // официальных тайпингах, поэтому используем приведение к any
    if (
        typeof (DeviceOrientationEvent as any).requestPermission === 'function'
    ) {
        (DeviceOrientationEvent as any)
            .requestPermission()
            .then((permissionState: string) => {
                if (permissionState === 'granted') {
                    window.addEventListener(
                        'deviceorientation',
                        handleOrientation
                    );
                    window.addEventListener('devicemotion', handleMotion);
                } else {
                    error.value = 'Доступ к датчикам отклонён пользователем.';
                }
            })
            .catch(() => {
                error.value = 'Не удалось запросить доступ к датчикам.';
            });
    } else {
        // Для других платформ, где разрешения не требуется
        window.addEventListener('deviceorientation', handleOrientation);
        window.addEventListener('devicemotion', handleMotion);
    }
});

// Удаление событий при размонтировании
onUnmounted(() => {
    window.removeEventListener('deviceorientation', handleOrientation);
    window.removeEventListener('devicemotion', handleMotion);
});
</script>

<style scoped>
.sensor-demo {
    font-family: Arial, sans-serif;
    margin: 20px;
}

h1 {
    font-size: 24px;
    margin-bottom: 10px;
}

h2 {
    font-size: 20px;
    margin-top: 20px;
}

p {
    margin: 5px 0;
}

ul {
    padding-left: 20px;
    margin: 5px 0;
}

.error {
    color: red;
    margin-top: 20px;
    font-weight: bold;
}

.not-supported {
    color: gray;
    font-style: italic;
}
</style>
