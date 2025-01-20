import type {IPerformance} from '@/models/PerfomanceModels.ts';

export const addPerformanceMark = (
    component: string,
    name: string,
    start: number,
    end: number
) => {
    console.log(
        `В компонте ${component}, событие ${name} прошло за ${end - start} мс`
    );

    const lsItem = getFromLS('performance');
    lsItem.push({
        component,
        name,
        diff: end - start,
    });
    setToLS('performance', lsItem);
};

const getFromLS = (key: string): IPerformance[] => {
    const item = localStorage.getItem(key);
    if (item) {
        return JSON.parse(item);
    }
    return [];
};

const setToLS = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
};

import {onBeforeMount, onMounted, onBeforeUpdate, onUpdated} from 'vue';
import {useRoute} from 'vue-router';

export default function usePerformanceMark() {
    const route = useRoute().path.slice(1);
    const t0 = performance.now();
    let t1: number, t2: number, t3: number, t4: number;

    onBeforeMount(() => {
        t1 = performance.now();
    });

    onMounted(() => {
        t2 = performance.now();
        addPerformanceMark(route, 'onCreated -> onBeforeMount', t0, t1);
        addPerformanceMark(route, 'onBeforeMount -> onMounted', t1, t2);

        console.log('Created -> onBeforeMount: ', t1 - t0);
        console.log('onBeforeMount -> onMounted: ', t2 - t1);
    });

    onBeforeUpdate(() => {
        t3 = performance.now();
    });

    onUpdated(() => {
        t4 = performance.now();
        console.log('onBeforeUpdate -> onUpdated: ', t4 - t3);
        addPerformanceMark(route, 'onBeforeUpdate -> onUpdated', t3, t4);
    });
}
export function measurePerformance<T>(
    group: string,
    name: string,
    fn: (...args: any[]) => T
): (...args: any[]) => T {
    return (...args: any[]) => {
        const t0 = performance.now();
        const result = fn(...args);
        const t1 = performance.now();
        addPerformanceMark(group, name, t0, t1);
        return result;
    };
}
