<template>
	<!-- create breadcrumbs from route object -->
	<nav class="rounded-md w-full">
		<!-- {{ b }} -->
		<ol class="list-rese flex">
			<li v-for="(item, index) in b" :key="index">
				<NuxtLink :to="item">
					{{ item }}
				</NuxtLink>
				<span v-if="index != b.length - 1" class="mx-2">/</span>
			</li>
		</ol>
	</nav>
</template>

<script setup lang="ts">
	import { computed } from "vue"
	import { useRoute } from "vue-router"

	const route = useRoute()

	const b = computed(() => route.path.split("/"))
</script>

<style lang="scss" scoped></style>
