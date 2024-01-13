<template>
  <figure class="rotator">
    <ul
      ref="rotatorCircle"
      role="list"
      class="rotator__circle"
      @resize="computeCirclePositions()"
    >
      <li
        v-for="(skill, i) in skills"
        :key="i"
        class="rotator__skill"
        :style="`top: ${positions[i].y}px; left: ${
          positions[i].x
        }px; opacity: ${positioningReady ? 1 : 0}; --pulse-delay: ${Math.round(
          Math.random() * 2000
        )}ms`"
      >
        <img class="rotator__skill-image" :src="skill.logo" />
      </li>
    </ul>
  </figure>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue"

const skillQueryResult = await queryContent("/skills").findOne()
const skills = skillQueryResult.body as unknown as { logo: string }[]

const positions = ref(Array(skills.length).fill({ x: 0, y: 0 }))
const positioningReady = ref(false)
const resizeObserver = ref<null | ResizeObserver>(null)
const rotatorCircle = ref<HTMLUListElement | null>(null)
const circleWidth = ref(0)

onMounted(() => {
  if (!rotatorCircle.value) return
  computeCirclePositions()
  positioningReady.value = true
  resizeObserver.value = new ResizeObserver((_entries) =>
    computeCirclePositions()
  )
  resizeObserver.value.observe(rotatorCircle.value)
})

onBeforeUnmount(() => {
  if (!rotatorCircle.value || !resizeObserver.value) return
  resizeObserver.value.unobserve(rotatorCircle.value)
})

const computeCirclePositions = () => {
  if (!rotatorCircle.value) return
  const items = skills.length
  const angle = (Math.PI * 2) / items
  circleWidth.value = rotatorCircle.value.children[0].clientWidth
  const { clientWidth: height } = rotatorCircle.value
  const borderRadius = parseInt(
    getComputedStyle(rotatorCircle.value)
      .getPropertyValue("border-left-width")
      .slice(0, -2)
  )

  const radius = height / 2 + borderRadius / 2

  for (let i = 0; i < items; i++) {
    const itemAngle = angle * i
    const x =
      Math.round(radius * Math.cos(itemAngle)) +
      height / 2 -
      circleWidth.value / 2
    const y =
      Math.round(radius * Math.sin(itemAngle)) +
      height / 2 -
      circleWidth.value / 2
    positions.value[i] = { x, y }
  }
}
</script>

<style lang="scss" scoped>
$rotation-time: 75s;
$pulse-time: 4s;

.rotator {
  max-height: 100%;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  --anm-play-state: playing;
  position: relative;

  &__image {
    position: absolute;
    bottom: 0;
    max-height: 80%;
    z-index: 0;
  }

  &__circle {
    animation: rotate $rotation-time linear infinite;
    animation-play-state: var(--anm-play-state);
    border-radius: 50%;
    position: absolute;
    aspect-ratio: 1;
    height: 200%;
    right: -100%;
    background-image: radial-gradient(transparent, var(--clr-secondary) 100%);
    border: 4px solid white;
  }

  &__skill {
    position: absolute;
    width: clamp(60px, 6vw, 120px);
    aspect-ratio: 1;
    animation: pulse $pulse-time ease-in-out infinite;
    animation-delay: var(--pulse-delay);
    transition: all 250ms ease;
    background-color: white;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.2rem;

    &-image {
      animation: rotate $rotation-time linear infinite reverse;
      animation-play-state: var(--anm-play-state);
      width: 50%;
      aspect-ratio: 1;
    }
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
