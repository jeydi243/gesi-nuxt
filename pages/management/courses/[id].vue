<template>
  <div>Details d'un Cours</div>
</template>

<script setup>
definePageMeta({
  middleware(to, from) {
    to.meta.pageTransition.name = +to.params.id > +from.params.id ? "fadeSlideY" : "fadeSlideX"
  },
})
</script>

<style lang="scss" scoped></style>
