<template>
    <div>
        <h1>Web Bluetooth Demo</h1>

        <!-- Отображаем имя выбранного устройства -->
        <p>Выбранное устройство: {{ deviceName || 'не выбрано' }}</p>

        <!-- Кнопка запроса устройства -->
        <button @click="requestDevice">Запросить устройство</button>

        <!-- Кнопка подключения -->
        <button
            :disabled="!selectedDevice"
            @click="connectToDevice"
        >
            Подключиться
        </button>

        <!-- Кнопка отключения -->
        <button
            :disabled="!connected"
            @click="disconnectDevice"
        >
            Отключиться
        </button>

        <!-- Статус подключения -->
        <div>
            <p>
                Статус подключения:
                {{ connected ? 'подключено' : 'не подключено' }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
/// <reference types="web-bluetooth" />
import {ref} from 'vue';
import usePerformanceMark from '@/helpers/PerfomanceHelper.ts';

// Храним имя устройства, выбранное пользователем
const deviceName = ref<string>('');

// Храним экземпляр BluetoothDevice
const selectedDevice = ref<BluetoothDevice | null>(null);

// Флаг состояния подключения
const connected = ref<boolean>(false);

/**
 * Функция для запроса у пользователя устройства Bluetooth.
 * В данном примере используется acceptAllDevices,
 * однако на практике лучше указывать конкретные фильтры для устройств.
 */
async function requestDevice() {
    try {
        const device = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            // Здесь можно указать дополнительные сервисы
            optionalServices: ['battery_service'],
        });
        selectedDevice.value = device;
        deviceName.value = device.name ?? 'Безымянное устройство';
    } catch (error) {
        console.error('Ошибка при запросе устройства:', error);
    }
}

/**
 * Функция для установления GATT-подключения к выбранному устройству.
 */
async function connectToDevice() {
    if (!selectedDevice.value) {
        console.warn('Сначала необходимо выбрать устройство');
        return;
    }

    try {
        const server = await selectedDevice.value.gatt?.connect();
        if (server) {
            connected.value = true;
            console.log('GATT-сервер подключён:', server);

            // Пример: можно найти сервис и получить характеристику
            const service = await server.getPrimaryService('battery_service');
            const characteristic =
                await service.getCharacteristic('battery_level');
            const value = await characteristic.readValue();
            console.log('Уровень заряда батареи:', value.getUint8(0));
        }
    } catch (error) {
        console.error('Ошибка при подключении к устройству:', error);
    }
}

/**
 * Функция для отключения от текущего устройства.
 */
function disconnectDevice() {
    if (selectedDevice.value && selectedDevice.value.gatt?.connected) {
        selectedDevice.value.gatt.disconnect();
        connected.value = false;
        console.log('Устройство отключено');
    }
}

usePerformanceMark('PhoneBluetooth');
</script>

<style scoped>
button {
    margin-right: 8px;
    margin-bottom: 8px;
}
</style>
