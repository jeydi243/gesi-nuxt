<script lang="ts" setup></script>

<template>
  <div v-bind="$attrs">
    <div class="row h-screen w-screen">
      <slot />
    </div>
  </div>
</template>
