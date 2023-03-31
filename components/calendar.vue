<template>
	<div class="h-full w-full col">
		<div class="row justify-between">
			<div class="flex justify-center">
				<div class="dropdown relative">
					<button class="dropdown-toggle btn-unstate row items-center" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
						{{ filters.firstUpper(actualView) }}
						<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" class="w-2 ml-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
							<path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path>
						</svg>
					</button>
					<ul class="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none" aria-labelledby="dropdownMenuButton1">
						<li v-for="item in views" :key="item">
							<a class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100" href="#" @click="actualView = item">{{ filters.firstUpper(item) }}</a>
						</li>
					</ul>
				</div>
			</div>
			<button @click="modalEventAdd = true" class="btn-primary overflow-clip" data-mdb-ripple="true" data-mdb-ripple-color="success" type="button"><box-icon type="regular" name="plus" color="white" size="sm" class="text-green-900"></box-icon> Add</button>
		</div>
		<calendar
			class="mt-3"
			:active-view="actualView"
			:selected-date="selectedDate"
			:time-from="6 * 60"
			:time-to="20 * 60"
			hide-view-selector
			hide-weekends
			:editable-events="{ title: true, drag: false, resize: true, delete: true, create: false }"
			:events="events"
			:show-week-numbers="false"
			locale="fr"
			:on-event-click="onEventClick"
			events-on-month-view="short"
		/>
		<MyModal v-show="modalEventAdd" @close="closeModal">
			<template #header>
				<h1 class="text-4xl">Modifier ce document</h1>
			</template>
			<Form class="col justify-between" @submit="addEvent" v-slot="{ isSubmitting }" :validation-schema="eventSchema" :initial-values="eventValue" @invalid-submit="onInvalidEvent">
				<Field name="name" placeholder="name" class="form-input mb-2"></Field>
				<ErrorMessage name="name" v-slot="{ message }">
					<p class="input-error">{{ message }}</p>
				</ErrorMessage>

				<Field name="description" as="textarea" placeholder="Give a short description of the event" class="form-textarea mb-4"></Field>
				<ErrorMessage name="description" v-slot="{ message }">
					<p class="input-error">{{ message }}</p>
				</ErrorMessage>
				<div class="">
					<Field name="start" placeholder="Start of event" type="datepicker" class="form-input mb-2 w-full"></Field>
					<ErrorMessage name="start" v-slot="{ message }">
						<p class="input-error">{{ message }}</p>
					</ErrorMessage>
				</div>
				<div class="">
					<Field name="end" placeholder="End of event" type="datepicker" class="form-input mb-2 w-full"></Field>
					<ErrorMessage name="end" v-slot="{ message }">
						<p class="input-error">{{ message }}</p>
					</ErrorMessage>
				</div>

				<div class="flex flex-row h-1/2 w-full items-center justify-between mt-2">
					<button class="btn-unstate" @click.prevent.stop="closeModal">Cancel</button>
					<button type="submit" class="btn-primary">
						<span class="font-bold text-white">Add event</span>
						<CirclesToRhombusesSpinner :size="5" color="#FFF" class="text-white" v-if="isSubmitting" />
					</button>
				</div>
			</Form>
		</MyModal>

		<!-- Button trigger modal -->
	</div>
</template>
<script setup>
	import { ref } from "vue"
	import { format } from "date-fns"
	import { toast, goto, chance } from "@/utils/utils"
	import { parseISO } from "date-fns"
	import { Form, Field, ErrorMessage } from "vee-validate"
	import { isLength, isDate, isEmail } from "validator"
	import calendar from "vue-cal"
	import MyModal from "@/components/mymodal"
	import { CirclesToRhombusesSpinner } from "epic-spinners"
	const modalEventAdd = ref(false)
	const nowformatted = format(new Date(), "yyyy-MM-dd")
	const selectedDate = ref(nowformatted)
	const selectedEvent = ref(null)
	const eventValue = ref({ name: "Festival", description: "La description de cette evenement", start: "2019-10-20", end: "2020-09-09", type: "" })
	const eventSchema = ref({
		name(value) {
			return isLength(value, { min: 2, max: 50 }) ? true : "Name must be between 2 and 50 characters"
		},
		description(value) {
			return isLength(value, { min: 2, max: 50 }) ? true : "Description must be between 2 and 50 characters"
		},
		start(value) {
			return isDate(parseISO(value)) ? true : "Start date must be provided"
		},
		end(value) {
			return isDate(parseISO(value)) ? true : "End date must be provided"
		},
		type(value) {
			return isLength(value, { min: 2, max: 50 }) ? true : "Type must be between 2 and 50 characters"
		},
	})
	const events = ref([
		{
			start: "2022-03-22 14:00",
			end: "2022-03-22 17:30",
			title: "Boring event",
			content: '<i class="icon material-icons">block</i><br>I am not draggable, not resizable and not deletable.',
			class: "bg-green-100 border border-l-4 border-green-500 text-green-700 p-4 rounded-lg",
			deletable: false,
			resizable: true,
			draggable: true,
		},
	])
	const actualView = ref("week")
	const views = ref(["week", "month", "year"])

	function onEventClick(selectedEvent, e) {
		console.log("The clicked event is: ", selectedEvent)
	}
	function getStudent() {
		console.log("getStudent")
	}
	function closeModal() {
		modalEventAdd.value = false
	}
	function addEvent() {}
	function onInvalidEvent() {}
</script>
