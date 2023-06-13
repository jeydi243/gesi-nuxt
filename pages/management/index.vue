<template>
  <div>
sdfgsdfsdf
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue"

const router = useRouter()
const tabsGestion = ref([
  { name: "courses", current: true },
  { name: "filieres", current: false },
  { name: "documents", current: false },
  { name: "employees", current: false },
  { name: "academique", current: false },
])
const currentTab = computed(() => tabsGestion.value.find((tab) => tab.current).name.toLowerCase())
onMounted(() => {
  console.log("mounteing");
  router.push(`/management/${currentTab.value}`)
  // if (currentTab.value === "employees" || currentTab.value === "courses") {
  // }
  // else {
  // 	router.push(`${currentTab.value}-index`)
  // }
})

//watch(currentTab, function (newval) {
// if (newval != oldval && newval != "employees") {
//    router.push(`${newval}-index`)
// } else if (newval == oldval && ["employees", "courses"].includes(newval)) {
//  	router.push(`${newval}-list`)
// } else {
// 	router.push(`${newval}-list`)
// }
//})

function changeTab(indexTab) {
  const currentTrue = tabsGestion.value.findIndex((tab) => tab.current === true)
  tabsGestion.value[currentTrue].current = false
  tabsGestion.value[indexTab].current = true
}
</script>
