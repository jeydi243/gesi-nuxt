<template>
  <div class="home font-k2d">
    <div class="bg-white h-[35px] rounded w-full pl-2 mb-3 relative flex flex-row align-middle items-center shadow-md shadow-gray-50">
      <box-icon name="search" color="gray" size="sm" class="self-middle self-center text-center"></box-icon>
      <input type="text" class="outline-none ring-0 placeholder-gray-300 focus:outline-none text-base focus:ring-transparent h-[35px] w-full placeholder:text-gray-200" placeholder="Search student globally by email or matricule or name" />
    </div>
    <div class="flex border-b border-gray-200 mb-2">
      <button v-for="({ current, id, name }, index) in levels" :key="index" class="btn-tab" :class="{ 'btn-tab-active': current }" @click="changeLevel(id)">{{ name }}</button>
    </div>
    
      <ListStudent :level="currentTabLevel" v-if="isLevelChanged" />
   
  </div>
</template>

<script setup lang="ts">
import { useConfig } from '@/store/config';
import { useStudents } from '~~/store/students';

const store = useStudents();
const storeConfig = useConfig();
const isloading = ref('');
const isLevelChanged = ref(true);
const students = computed(() => store.students);
const levels = computed(() => storeConfig.listLevel);
const currentTabLevel = computed(() => storeConfig.currentLevel);
const { changeLevel } = storeConfig;
const { getAllStudents } = store;
watch(currentTabLevel, (newVal, oldVal) => {
  if (newVal != oldVal) {
    isLevelChanged.value = false;
    setTimeout(() => {
      isLevelChanged.value = true;
    }, 200);
  }
});
</script>
