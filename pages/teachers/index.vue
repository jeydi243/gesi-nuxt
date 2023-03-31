<template>
	<div>
		<transition name="fadeSlide" mode="out-in" duration="500">
			<div class="display-list" v-if="display == 'list'" key="h4">
				<ListTeacher />
			</div>
			<div class="display-grid grid grid-cols-4 gap-2 auto-cols-auto h-full auto-rows-auto" v-else key="h1">
				<div class="h-[200px] bg-white rounded-lg shadow-lg relative" v-for="(prof, index) in teachers" :key="index">
					<div class="card-img h-[30%] bg-green-50 w-full">
						<!-- <img :src="require('@/assets/img/user.png')" class="object-cover" /> -->
						<box-icon name="react" :width="30" :height="30"></box-icon>
					</div>
					<div class="content flex flex-col px-2">
						<span class="text-base font-bold">{{ prof.name }}</span>
						<span class="text-sm">{{ prof.lastname }}</span>
					</div>
					<div class="footer flex flex-row rounded-lg absolute bottom-0 w-full left-0 h-[20%] items-center content-center place-items-center">
						<a class="bg-blue-200 text-blue-900 w-full h-full rounded-bl-lg text-center" href="tel:+243897949336">Call</a>
						<a class="bg-green-200 text-green-900 w-full h-full rounded-br-lg text-center" :href="`mailto:${prof.email}`">Text</a>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import ListTeacher from "@/components/list-teacher.vue";
export default {
	name: "index-teachers",
	components: {
		ListTeacher,
	},
	data() {
		return {
			display: "list",
			teachers: [
				{
					id: 1,
					name: "Myra Hunt",
					lastname: "Micheal Sims",
					email: "bu@mah.jo",
					telephone: "(681) 698-7272",
				},
				{
					id: 1,
					name: "Leonard Wolfe",
					lastname: "Jonathan Aguilar",
					email: "we@waheki.nc",
					telephone: "(378) 377-3557",
				},
				{
					id: 1,
					name: "Maggie Hoffman",
					lastname: "Blake Meyer",
					email: "daphu@bikehsu.dk",
					telephone: "(913) 591-1103",
				},
				{
					id: 1,
					name: "Erik Maldonado",
					lastname: "Lucile Santos",
					email: "zibew@wirbikce.fk",
					telephone: "(723) 581-6996",
				},
				{
					id: 1,
					name: "Ina Hunt",
					lastname: "Khaby",
					email: "fo@magra.rs",
					telephone: "(447) 737-7108",
				},
			],
		};
	},
};
</script>

<style scoped>
</style>