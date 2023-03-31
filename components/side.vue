<template>
	<div class="relative left-0 top-0 flex flex-col justify-center items-center overflow-hidden text-gray-400 select-none">
		<div class="col place-items-center w-full mt-1 relative">
			<!-- <button @click="add" class="btn-primary">add</button>
			<button @click="rem" class="btn-unstate">remove</button> -->
			<!-- <div id="jog" :class="`bg-red-500 rounded-md h-8 w-10 relative z-0 transition-all duration-500 ease-in-out`"></div> -->
			<TransitionGroup name="fadeSlideY">
				<router-link data-splitting :to="item.to" @click="config.changeActive(item.to)" @hover="item.mouseHover = !item.mouseHover" :id="item.text" :ref="item.text" v-for="(item, index) in sideMenus" :data-index="index" :key="index" class="router-link relative z-1" :class="{ 'router-link-active': item.active }">
					<box-icon type="regular" :name="item.icon" color="white"></box-icon>
					<span class="ml-2 text-sm font-medium">{{ item.text }}</span>
				</router-link>
			</TransitionGroup>
		</div>
	</div>
</template>

<script setup>
	import { beforeEnterList, enterList, leaveList } from "@/utils/utils"
	import { useElementBounding } from "@vueuse/core"
	import { computed, ref, onMounted, watch } from "vue"
	import { useConfig } from "@/store/config"
	import Splitting from "splitting"
	import { gsap } from "gsap"
	const config = useConfig()
	const sideMenus = computed(() => config.sideMenus)
	const sideActive = computed(() => config.sideActive)
	const fg = ref(null)
	const jh = ref(null)
	const results = ref(null)

	watch(sideActive, function (newval, oldval) {
		// const jog = document.getElementById("jog")
		if (newval != oldval) {
			const el = document.getElementById(newval.text)
			const { left, top } = useElementBounding(el)
			// console.log(left.value, top.value)
			// jog.style.top = `${top.value}px`
			// jog.style.left = `${left.value}px`
			// fg.value = top.value
			// jh.value = left.value
			// jog.classList.add(`top-[${top.value}px]`)
			// jog.classList.add(`left-[${left.value}px]`)
		}
	})

	function add() {
		config.add()
	}
	function rem() {
		config.rem()
	}
</script>

<style lang="scss" scoped></style>
