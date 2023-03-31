<template>
	<div class="w-full bg-white rounded shadow-gray-50 p-3 h-auto">
		<div class="flex flex-row justify-between w-full pb-5">
			<div class="relative flex w-72 flex-wrap items-stretch">
				<span class="z-10 flex h-full font-normal text-center self-center caret-green-500 text-gray-300 absolute bg-transparent rounded text-base items-center justify-center">
					<SearchIcon class="h-5 w-5 self-center text-center text-gray-300" />
				</span>
				<input type="text" :placeholder="`Find by Username or Matricule`" class="px-1 py-3 caret-green-500 placeholder-gray-300 text-gray-600 relative bg-white rounded text-sm border-0 outline-none focus:outline-none focus:ring-transparent w-full pl-7" />
			</div>

			<button @click="refresh" class="btn-primary">
				<RefreshIcon class="h-5 w-5 text-white" />
				<span class="self-center ml-2">Rafraichir</span>
			</button>
			<button v-if="currentTabLevel.toLowerCase() == 'candidat'" @click="$router.push({ name: 'students-add' })" class="btn-primary">
				<UserAddIcon class="h-5 w-5 text-white" />
				<span class="self-center ml-2">Ajouter</span>
			</button>
		</div>
		<table class="table-fixed w-full">
			<thead class="bg-green-50 w-full mb-5 rounded table-header-group mx-5 px-5">
				<tr class="pl-5 text-left table-row h-10">
					<th>#</th>
					<th>Matricule</th>
					<th>Name</th>
					<th>Email</th>
					<th>Level</th>
					<th>Statut</th>
				</tr>
			</thead>
			<!-- <tbody v-if="students != null"> -->
			<TransitionGroup :css="false" @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave" tag="tbody" mode="out-in">
				<tr class="table-row cursor-pointer" v-for="(student, index) in students" :key="index" @click="goto(index)" :data-index="index">
					<td>{{ index }}</td>
					<td>{{ student.matricule }}</td>
					<td>{{ student.name }}</td>
					<td>{{ student.email }}</td>
					<td>{{ student.level }}</td>
					<td>{{ student.status }}</td>
				</tr>
			</TransitionGroup>
		</table>
	</div>
</template>

<script>
	import { useConfig } from "@/store/config"
	import { useStudents } from "@/store/students"
	import { mapState, mapActions } from "pinia"
	import { UserAddIcon, SearchIcon, RefreshIcon } from "@heroicons/vue/solid"
	import { gsap } from "gsap"
	import { goto, onBeforeEnter, onEnter, onLeave } from "@/utils/utils"
	export default {
		name: "list-student",
		components: {
			UserAddIcon,
			RefreshIcon,
			SearchIcon,
		},
		props: {
			level: { type: String, required: true, default: "candidat" },
		},

		computed: {
			...mapState(useStudents, { students: "students" }),
			...mapState(useConfig, { levels: "getListLevel", currentTabLevel: "currentLevel" }),
		},
		methods: {
			...mapActions(useStudents, {
				refresh: "getAllStudents",
			}),
			onBeforeEnter,
			onEnter,
			onLeave,
			async goto(index) {
				return this.$router.push({ name: "students-details", params: { id: this.students[index]._id } })
			},
		},
	}
</script>

<style lang="scss" scoped></style>
