<template>
	<UseOnline v-slot="{ isOnline }">
		<footer class="sticky bottom-0 right-0 z-10 flex w-full h-[4%] bg-green-500 text-white items-center" :class="{ 'bg-red-800': isOnline }">{{ isOnline ? "Footer" : "Something going wrong. Check your internet connexion" }}
		</footer>
	</UseOnline>
</template>
<script setup lang="ts">
import { UseOnline } from "@vueuse/components"
</script>
<style lang="css" scoped></style>
 