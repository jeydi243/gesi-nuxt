<script>
export default {
	name: "layout-auth",
};
</script>

<template>
	<div v-bind="$attrs">
		<div class="h-full">
			<slot></slot>
		</div>
	</div>
</template>
