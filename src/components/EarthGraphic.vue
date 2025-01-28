<template>
    <div class="controls">
        <div>
            <UiBtn
                style="margin-bottom: 8px"
                :text="
                    isAnimating ? 'Остановить анимацию' : 'Запустить анимацию'
                "
                @click="toggleRotation"
            />

            <label style="margin-left: 16px">
                Скорость:
                <input
                    v-model.number="animationSpeed"
                    type="range"
                    min="0"
                    max="100"
                    step="0.1"
                    style="vertical-align: middle"
                />
                {{ animationSpeed.toFixed(1) }}
            </label>
        </div>
    </div>

    <!--
    Контейнер, который занимает всю доступную площадь родителя.
    Можно менять height: 80% или 100vh, в зависимости от дизайна.
  -->
    <div
        ref="containerRef"
        style="
            width: 100%;
            height: 80%;
            position: relative;
            overflow: hidden;
            touch-action: none;
        "
    >
        <!-- Сам SVG для глобуса -->
        <svg ref="svgRef"></svg>

        <!-- Tooltip для названия стран -->
        <div
            ref="tooltipRef"
            style="
                position: absolute;
                pointer-events: none;
                padding: 4px 6px;
                transform: translate(-50%, -500%);
                background: rgba(255, 255, 255, 0.8);
                border: 1px solid #ccc;
                border-radius: 4px;
                opacity: 0;
                transition: opacity 0.1s;
            "
        />
    </div>
</template>

<script setup lang="ts">
import {onMounted, onBeforeUnmount, ref} from 'vue';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import UiBtn from '@/components/common/UiBtn.vue';

// Типы GeoJSON
import type {Feature, Geometry} from 'geojson';
import usePerformanceMark from '@/helpers/PerfomanceHelper.ts';

// Ссылки на элементы
const containerRef = ref<HTMLDivElement | null>(null);
const svgRef = ref<SVGSVGElement | null>(null);
const tooltipRef = ref<HTMLDivElement | null>(null);

// D3 объекты
let projection: d3.GeoProjection;
let path: d3.GeoPath<any, d3.GeoPermissibleObjects>;
let svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;

// Данные стран
let countriesData: Feature<Geometry, any>[] = [];

// Анимация (автовращение)
const isAnimating = ref(false);
let animationFrameId = 0;
const animationSpeed = ref(0.2);

// Для ручного перетаскивания (pointer)
let isDragging = false;
let startX = 0;
let startY = 0;
let startRotate: [number, number, number] = [0, 0, 0];

/**
 * Основная инициализация
 */
function init() {
    const svgEl = svgRef.value;
    if (!svgEl) return;

    // Создаём проекцию и path
    projection = d3.geoOrthographic();
    path = d3.geoPath(projection);

    // Основной selection для <svg>
    svg = d3.select(svgEl).style('cursor', 'grab');

    // Загружаем TopoJSON (countries-110m.json)
    d3.json('https://unpkg.com/world-atlas@2.0.2/countries-110m.json').then(
        (worldData: any) => {
            const geo = topojson.feature(
                worldData,
                worldData.objects.countries
            );

            // Проверяем, что это FeatureCollection
            if ('features' in geo) {
                countriesData = geo.features as Feature<Geometry, any>[];
            } else {
                console.error('TopoJSON object is not a FeatureCollection');
                countriesData = [];
                return;
            }

            // Сфера (океан)
            svg.append('path')
                .datum({type: 'Sphere'})
                .attr('fill', '#ADD8E6')
                .attr('stroke', '#000')
                .attr('stroke-width', 1)
                .attr('d', (d) => path(d as any) || '');

            // Сетка параллелей / меридианов
            const graticule = d3.geoGraticule();
            svg.append('path')
                .datum(graticule)
                .attr('fill', 'none')
                .attr('stroke', '#ccc')
                .attr('stroke-width', 0.5)
                .attr('d', (d) => path(d as any) || '');

            // Страны
            svg.selectAll('path.country')
                .data(countriesData)
                .enter()
                .append('path')
                .attr('class', 'country')
                .attr('fill', '#008000')
                .attr('stroke', '#222')
                .attr('stroke-width', 0.2)
                .attr('d', (d) => path(d as any) || '')
                // Tooltip при наведении
                .on('mouseover', (event, d: any) => {
                    const tooltipEl = tooltipRef.value;
                    if (!tooltipEl) return;
                    d3.select(tooltipEl)
                        .style('opacity', '1')
                        .text(d.properties.name || 'Unknown');
                })
                .on('mousemove', (event) => {
                    const tooltipEl = tooltipRef.value;
                    if (!tooltipEl) return;
                    const [pageX, pageY] = [event.pageX, event.pageY];
                    d3.select(tooltipEl)
                        .style('left', pageX + 10 + 'px')
                        .style('top', pageY + 10 + 'px');
                })
                .on('mouseout', () => {
                    const tooltipEl = tooltipRef.value;
                    if (!tooltipEl) return;
                    d3.select(tooltipEl).style('opacity', '0');
                });

            // Устанавливаем pointer-события
            setupPointerHandlers();

            // Вызываем handleResize() для подстройки под контейнер
            handleResize();
        }
    );
}

/**
 * Настройка pointerdown / pointermove / pointerup
 */
function setupPointerHandlers() {
    const svgEl = svgRef.value;
    if (!svgEl) return;

    // При pointerdown — начинаем «drag»
    svg.on('pointerdown', (event) => {
        event.preventDefault();
        svg.style('cursor', 'grabbing');

        isDragging = true;
        const [mx, my] = d3.pointer(event, svgEl);
        startX = mx;
        startY = my;
        startRotate = projection.rotate() as [number, number, number];

        // Начинаем слушать pointermove и pointerup на window,
        // чтобы обработка продолжалась, даже если указатель выходит за пределы <svg>.
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
    });
}

/**
 * Движение указателя (pointermove)
 */
function onPointerMove(event: PointerEvent) {
    if (!isDragging) return;

    const svgEl = svgRef.value;
    if (!svgEl) return;

    const [mx, my] = d3.pointer(event, svgEl);
    const dx = mx - startX;
    const dy = my - startY;

    const λ = startRotate[0] + dx * 0.5;
    const φ = startRotate[1] - dy * 0.5;
    projection.rotate([λ, φ, startRotate[2] ?? 0]);

    // Перерисовываем все path
    svg.selectAll<SVGPathElement, unknown>('path').attr(
        'd',
        (d) => path(d as any) || ''
    );
}

/**
 * Завершение «drag» (pointerup)
 */
function onPointerUp() {
    isDragging = false;
    svg.style('cursor', 'grab');

    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
}

/**
 * handleResize() — пересчитывает размеры, масштаб проекции и
 * перерисовывает все пути.
 */
function handleResize() {
    const container = containerRef.value;
    const svgEl = svgRef.value;
    if (!container || !svgEl) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    svg.attr('width', width).attr('height', height);

    const scale = Math.min(width, height) * 0.45;
    projection.scale(scale).translate([width / 2, height / 2]);

    svg.selectAll<SVGPathElement, unknown>('path').attr(
        'd',
        (d) => path(d as any) || ''
    );
}

/**
 * Функция для кнопки «Запустить/Остановить анимацию»
 */
function toggleRotation() {
    if (isAnimating.value) {
        stopRotation();
    } else {
        startRotation();
    }
}

function startRotation() {
    isAnimating.value = true;
    animate();
}

function stopRotation() {
    isAnimating.value = false;
}

/**
 * Цикл анимации
 */
function animate() {
    if (!isAnimating.value) return;

    const rotate = projection.rotate();
    rotate[0] += animationSpeed.value;
    projection.rotate(rotate);

    svg.selectAll<SVGPathElement, unknown>('path').attr(
        'd',
        (d) => path(d as any) || ''
    );

    animationFrameId = requestAnimationFrame(animate);
}

onMounted(() => {
    init();
    window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('resize', handleResize);

    // Удаляем pointermove/pointerup, если вдруг осталось
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
});

usePerformanceMark('EarthGraphic');
</script>

<style scoped lang="scss">
.country:hover {
    fill: #00a000;
}

.controls {
    margin-top: 16px;
    width: auto;
    display: flex;
    justify-content: center;
}

/* Снимает дефолтную прокрутку/зум на касаниях (для мобильных) */
svg {
    touch-action: none;
}
</style>
