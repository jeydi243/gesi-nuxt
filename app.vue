<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
const route = useRoute()

console.log(route.path.split('/')[2]);


</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fadeSlideX-enter-active {
  animation: fadein 0.7s ease;
}

.fadeSlideX-leave-active {
  animation: fadeout 0.7s ease;
}

.fadeSlideY-enter-active {
  animation: fadeinY 0.7s ease;
}

.fadeSlideY-leave-active {
  animation: fadeoutY 0.7s ease;
}

@keyframes fadein {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }

  to {
    opacity: 1;
    transform: translateX(0px);
  }
}

@keyframes fadeout {
  from {
    opacity: 1;
    z-index: 1;
  }

  to {
    opacity: 0;
    z-index: 0;
    transform: translateX(10px);
  }
}

@keyframes fadeinY {
  from {
    opacity: 0;
    z-index: 1;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    z-index: 0;
    transform: translateY(0px);
  }
}

@keyframes fadeoutY {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translateY(10px);
  }
}

.pima::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.pima::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.pima::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

/* Handle on hover */
.pima::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* ::-webkit-scrollbar-corner
	::-webkit-scrollbar-track-piece
	::-webkit-scrollbar-track
	::-webkit-scrollbar-thumb
	::-webkit-scrollbar-button
	::-webkit-scrollbar */
</style>
