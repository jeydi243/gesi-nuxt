<template>
	<div>
		<!-- <HomeIcon size="sm" class="h-5 w-5" /> -->
		<div class="flex flex-col select-none">
			<div class="grid grid-cols-4 auto-cols-max mb-3 mt-5 gap-2">
				<TransitionGroup :css="false" @before-enter="beforeEnterList" @enter="enterList" @leave="leaveList" appear>
					<div v-for="(stat, index) in stats" :key="index" :data-index="index" class="card h-1/5 flex flex-col bg-gradient-to-tr">
						<h1 class="font-bold text-2xl text-green-200">{{ stat.value }}</h1>
						<span class="text-2xl font-bold text-green-800">{{ stat.name }}</span>
					</div>
				</TransitionGroup>
			</div>
			<div class="row space-x-2">
				<div class="card w-1/2"><apexchart class="w-full" height="450" :options="chartOptions" :series="series"></apexchart></div>

				<div class="card w-1/2 col h-full">
					<div class="row justify-between">
						<div class="text-2xl font-bold row items-center space-x-2">
							Latest candidates
							<span class=" ml-2 px-2 py-1 rounded-md text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max active:bg-gray-300 transition duration-300 ease"> 200 </span>
						</div>
						<button type="button" class="rounded-full h-10 w-10" data-mdb-ripple="true" data-mdb-ripple-color="success"><box-icon name="dots-vertical-rounded" color="green" class="bg-red cursor-pointer"></box-icon></button>
					</div>
					<template v-for="i in 8" :key="i">
						<a class="row items-center justify-between block py-1 border-b border-gray-200 w-full hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-0 focus:bg-gray-200 focus:text-gray-600 transition duration-500">
							<div class="row items-center">
								<img :src="`https://mdbcdn.b-cdn.net/img/new/avatars/${i}.webp`" class="rounded-full w-10 h-10" alt="Avatar" />
								<div class="col ml-2">
									<span class="text-lg font-bold">{{ chance.last() }}</span>
									<span class="text-xs">From {{ chance.country({ full: true }) }}</span>
								</div>
							</div>
						</a>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { chance } from "@/utils/utils"
	import { ref } from "vue"
	import { beforeEnterList, enterList, leaveList } from "@/utils/utils"
	const chartOptions = ref({
		title: {
			text: "List of students by year",
			align: "left",
			margin: 10,
			offsetX: 0,
			offsetY: 0,
			floating: false,
			style: {
				fontSize: "24px",
				fontWeight: "bold",
				fontFamily: "k2d",
				color: "#263238",
			},
		},
		colors: ["#6af699", "#f7b731", "#231ac9"],
		chart: {
			id: "vuechart-example",
			type: "bar",
		},
		stroke: {
			curve: "smooth",
		},
		dataLabels: {
			enabled: false,
		},
		plotOptions: {
			bar: {
				distributed: true,
				horizontal: false,
				borderRadius: 5,
			},
		},
		xaxis: {
			categories: [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012],
		},
	})
	const series = ref([
		{
			name: "Nombre d'étudiants",
			data: [3000, 3500, 4000, 4200, 4500, 4700, 4000, 3000],
		},
	])
	const stats = ref([
		{ name: "Students", value: "5000" },
		{ name: "Teachers", value: "70" },
		{ name: "Rooms", value: "70" },
		{ name: "Alumni", value: "700" },
	])
</script>
<style lang="css"></style>
