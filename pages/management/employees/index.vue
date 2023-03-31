<template>
	<div>
		<UseOnline v-slot="{ isOnline }">
			<transition @leave="onLeaveTop" @before-enter="onBeforeEnter" @enter="onEnter">
				<div v-if="!isOnline" class="bg-red-500 text-white row text-center items-center" :class="{ 'bg-blue-600': isOnline }">
					<span class="ml-3 row items-center"> <box-icon type="regular" name="no-signal" color="white" size="sm" class="text-white"></box-icon> It's seems like your are offline. Try later </span>
				</div>
			</transition>
			<router-view v-slot="{ Component, route }">
				<Transition name="fadeSlideX" mode="out-in">
					<div :key="route.name">
						<component :is="Component" />
					</div>
				</Transition>
			</router-view>
		</UseOnline>
	</div>
</template>

<script setup>
	import { computed } from "vue"
	import { useManagement } from "@/store/management"
	import { UseOnline } from "@vueuse/components"
	import { onLeaveTop, onEnter, onBeforeEnter, chance } from "@/utils/utils"

	const employees = computed(() => store.getEmployees)
	const store = useManagement()

	async function refresh() {
		await store.getAllEmployees()
	}
</script>

<style scoped></style>
