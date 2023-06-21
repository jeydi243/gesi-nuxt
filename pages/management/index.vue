<template>
  <div>
    sdfgsdfsdf
  </div>
</template>

<script setup lang="ts">

const router = useRouter()
const tabsGestion = ref([
  { name: "contents", current: true },
  { name: "filieres", current: false },
  { name: "documents", current: false },
  { name: "employees", current: false },
  { name: "academique", current: false },
  { name: "lookups", current: false },
])
const currentTab = computed(() => tabsGestion.value.find((tab) => tab.current).name.toLowerCase())
onMounted(() => {
  console.log("mounteing");
  router.push(`/management/${currentTab.value}`)
  // if (currentTab.value === "employees" || currentTab.value === "contents") {
  // }
  // else {
  // 	router.push(`${currentTab.value}-index`)
  // }
})

//watch(currentTab, function (newval) {
// if (newval != oldval && newval != "employees") {
//    router.push(`${newval}-index`)
// } else if (newval == oldval && ["employees", "contents"].includes(newval)) {
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
