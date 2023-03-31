<template>
	<router-view v-slot="{ Component }">
		<Transition name="fadeSlideX" mode="out-in">
			<component :is="Component" />
		</Transition>
	</router-view>
</template>

<script setup></script>

<style lang="scss" scoped></style>
