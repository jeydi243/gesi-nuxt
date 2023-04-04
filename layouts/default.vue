<template>
  <div class="row h-screen w-screen" v-bind="$attrs">
    <SideBar class="flex w-[15%] h-full bg-gray-900" />
    <main class="col w-[85%] h-full relative bg-gray-100 overflow-auto">
      <Header />
      <BreadCrumbs v-if="showBraedCrumbs" />
      <div class="h-[90%] w-full bg-gray-100 px-6 py-6 overflow-auto">
        <Transition name="fade" mode="out-in">
          <slot />
        </Transition>
      </div>
      <Footer />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { onActivated } from "vue"
const isMenuCondensed = ref(false)
const showBraedCrumbs = ref(false)
// props: { typeLayout: String },
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
