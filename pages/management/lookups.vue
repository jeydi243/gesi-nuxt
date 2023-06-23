<template>
    <div class="grid grid-cols-4 gap-4 min-h-full">
        <div class="col bg-white p-2 h-full rounded-md ml-3 hover:shadow-lg transition-all duration-700">
            <div v-for="({ name, code }, key) in classes" class="hover:bg-blue-200 pt-2 pl-2 pb-2 hover:bg-opacity-5 h-[55px] w-full cursor-default rounded-lg hover:outline-1 hover transition-all duration-1000">
                <p><strong>{{ name }}</strong></p>
                <h1 class="text-xs">{{ code }}</h1>
            </div>
        </div>
        <div class="col-span-3 bg-white p-2 h-full rounded-md ml-3 hover:shadow-lg transition-all duration-700">
            Lookups d
        </div>
    </div>
</template>

<script setup lang="ts">
import { useConfig } from '~/store/config';
import { useManagement } from '~/store/management';

definePageMeta({
    layout: "management",
});
const management = useManagement()
const classes = computed(() => management.classes)
</script>

<style scoped></style>