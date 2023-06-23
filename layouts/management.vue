<template>
    <div class="row h-screen w-screen" v-bind="$attrs">
        <SideBar class="flex w-[15%] h-full bg-gray-900" />
        <main class="col w-[85%] h-full relative bg-gray-100 overflow-auto">
            <Header />
            <BreadCrumbs v-if="showBraedCrumbs" />
            <div class="h-[90%] w-full bg-gray-100 px-6 py-6 overflow-auto">
                <div class="flex border-b border-gray-200 mb-2 select-none">
                    <TransitionGroup :css="false" @before-enter="beforeEnterList" @enter="enterList" @leave="leaveList" mode="out-in">
                        <NuxtLink v-for="({ current, name }, indexTab) in tabsGestion" :key="indexTab" :data-index="indexTab" activeClass="btn-tab-active" class="btn-tab first-letter:uppercase" :class="{ 'btn-tab-active': currentTab == name }" :to="`/management/${name}`">{{ name }}</NuxtLink>
                    </TransitionGroup>
                </div>
                <slot />
            </div>
            <Footer />
        </main>
    </div>
</template>

<script lang="ts" setup>
const isMenuCondensed = ref(false)
const showBraedCrumbs = ref(false)
const route = useRoute()
const tabsGestion = ref([
    { name: "contents", current: true },
    { name: "filieres", current: false },
    { name: "documents", current: false },
    { name: "employees", current: false },
    { name: "academique", current: false },
    { name: "lookups", current: false },
    { name: "organisation", current: false },
])
const currentTab = computed(() => tabsGestion?.value?.find((tab) => tab.current)?.name.toLowerCase())

watch(route, (newval, oldval) => {
    if (newval.path !== oldval.path) {
        changeTab(newval.path.split('/')[2])
    }
    console.log({ newval });
    console.log({ oldval });
});
const router = useRouter()
onActivated(() => {
    //   document.body.removeAttribute("data-layout", "horizontal")
    //   document.body.removeAttribute("data-topbar", "dark")
    //   document.body.removeAttribute("data-layout-size", "boxed")
})

function toggleMenu() {
    document.body.classList.toggle("sidebar-enable")

    if (window.screen.width >= 992) {
        // eslint-disable-next-line no-unused-vars
        router.afterEach((routeTo, routeFrom) => {
            document.body.classList.remove("sidebar-enable")
            document.body.classList.remove("vertical-collpsed")
        })
        document.body.classList.toggle("vertical-collpsed")
    } else {
        // eslint-disable-next-line no-unused-vars
        router.afterEach((routeTo, routeFrom) => {
            document.body.classList.remove("sidebar-enable")
        })
        document.body.classList.remove("vertical-collpsed")
    }
    isMenuCondensed.value = !isMenuCondensed.value
}
function toggleRightSidebar() {
    document.body.classList.toggle("right-bar-enabled")
}
function hideRightSidebar() {
    document.body.classList.remove("right-bar-enabled")
}
function changeTab(indexTab: number | string) {
    if (typeof indexTab == 'string') {
        var currentTrue: number = tabsGestion.value.findIndex((tab) => tab.current == true)
        var willTrue: number = tabsGestion.value.findIndex((tab) => tab.name == indexTab)
        tabsGestion.value[currentTrue].current = false
        tabsGestion.value[willTrue].current = true
    } else {
        var currentTrue = tabsGestion.value.findIndex((tab) => tab.current == true)
        tabsGestion.value[currentTrue].current = false
        tabsGestion.value[indexTab].current = true
    }
}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

main {
    overflow-y: scroll;
}
</style>
