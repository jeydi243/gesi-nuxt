<template>
	<div>
		<div class="card h-1/5">
			<div class="row justify-between mb-4">
				<span class="text-4xl font-bold border-0 border-l-4 border-l-yellow-400 pl-2">Documents</span>
				<div class="row">
					<button @click.prevent="getAllDocuments" class="btn-primary mr-1">
						<RefreshIcon class="h-5 w-5 text-white" />
					</button>
					<button @click="showModalAdd = !showModalAdd" class="btn-primary"><DocumentAddIcon class="h-5 w-5 text-white" />Add document</button>
				</div>
			</div>

			<p class="text-base pb-4">
				Laboris sint irure culpa elit pariatur adipisicing ullamco. Exercitation occaecat commodo duis esse id laborum ut incididunt ipsum eiusmod mollit culpa veniam nisi. Mollit Lorem labore et voluptate sit laboris occaecat sit. Ut non do cillum cillum voluptate tempor consectetur. Labore sunt incididunt nulla elit aliquip dolore enim. Enim sint
				anim sit ullamco dolor sunt adipisicing laboris aute in.
			</p>
			<div class="flex flex-row justify-between pb-2">
				<div class="relative flex w-72 flex-wrap items-stretch">
					<span class="z-10 flex h-full font-normal text-center self-center caret-green-500 text-gray-300 absolute bg-transparent rounded text-base items-center justify-center">
						<SearchIcon class="h-5 w-5 self-center text-center text-gray-500" />
					</span>
					<input type="text" v-model="search" placeholder="Find by Code or Name" class="px-1 py-3 caret-green-500 placeholder-gray-300 text-gray-600 relative bg-white rounded text-sm border-0 outline-none focus:outline-none focus:ring-transparent w-full pl-7" />
				</div>
			</div>
			<table class="table-auto md:table-fixed">
				<thead>
					<tr class="table-row">
						<th>#</th>
						<th>Code</th>
						<th>Name</th>
						<th>Description</th>
						<th>Action</th>
						<!-- <th v-for="(head,index) in getListDocuments" :key="index">{{head}}</th> -->
					</tr>
				</thead>
				<tbody>
					<tr v-for="(doc, indexDoc) in listDocuments" :key="indexDoc" :id="`heading${indexDoc}`" class="mb-0 table-row">
						<td class="table-cell">{{ indexDoc + 1 }}</td>
						<td class="table-cell">{{ doc.code }}</td>
						<td class="table-cell font-bold">{{ doc.name }}</td>
						<td class="table-cell">{{ doc.description }}</td>
						<td class="table-cell relative flex-row items-center">
							<div class="flex flex-row">
								<ClipboardIcon href="#" class="h-4 w-4 text-blue-500 m-4 bg-blue-50 cursor-pointer" @click="showModif(indexDoc, doc)" />
								<TrashIcon href="#" class="h-4 w-4 text-red-500 m-4 bg-red-50 cursor-pointer" @click="softdeleteDoc(doc.code)" />
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<MyModal v-show="showModalUpdate" @close="closeModal">
			<template #header>
				<h1 class="text-4xl">Modifier ce document</h1>
			</template>
			<Form class="col justify-between" @submit="updateDoc" v-slot="{ isSubmitting }" :validation-schema="docSchema" :initial-values="initialDocValue" @invalid-submit="onInvalidDocument">
				<div class="row">
					<Field name="name" placeholder="name" v-slot="{ errors, errorMessage, field }">
						<input type="text" name="name" id="name" class="form-input mb-2" v-bind="field" />
						<p class="input-error">{{ errors }}</p>
						<p class="input-error">{{ errorMessage }}</p>
					</Field>
				</div>
				<Field name="description" as="textarea" placeholder="Describe the utility of this doc" v-slot="{ field, errorMessage, errors }">
					<input class="form-textarea mb-4" type="text" name="description" id="description" v-bind="field" />
					<p class="input-error">{{ errorMessage }}</p>
					<p class="input-error">{{ errors }}</p>
				</Field>
				<span class="text-red-700 text-base">{{ errorCall }}</span>

				<div class="flex flex-row h-1/2 w-full items-center justify-between">
					<button class="btn-unstate" @click.prevent.stop="closeModal">Annuler</button>
					<button type="submit" class="btn-primary">
						<span class="font-bold text-white">Mettre à jour</span>
						<CirclesToRhombusesSpinner :size="5" color="#FFF" class="text-white" v-if="isSubmitting" />
					</button>
				</div>
			</Form>
		</MyModal>

		<MyModal v-show="showModalAdd" @close="showModalAdd = false">
			<template #header>Add document</template>
			<Form class="col" @submit="add" :validation-schema="docSchema" v-slot="{ isSubmitting, resetForm }" :initial-values="initialDocValue" @invalid-submit="onInvalidDocument">
				<!-- <div class="row w-full items-center space-x-1"> -->
					<Field as="div" class="col" name="code" placeholder="code" v-slot="{ field, errorMessage }">
						<input type="text" name="code" id="code" class="form-input mb-2" v-bind="field" />
						<p class="input-error">{{ errorMessage }}</p>
					</Field>
					<Field as="div" class="col" name="name" placeholder="name" v-slot="{ field, errorMessage }">
						<input type="text" name="name" id="name" class="form-input mb-2" v-bind="field" />
						<p class="input-error">{{ errorMessage }}</p>
					</Field>
				<!-- </div> -->
				<Field name="description" placeholder="Describe the utility of this doc" v-slot="{ errorMessage, field }">
					<input v-bind="field" type="textarea" class="peer form-textarea invalid:animate-shake" />
					<p class="input-error peer-invalid:animate-shake">{{ errorMessage }}</p>
				</Field>

				<div class="flex flex-row h-1/2 w-full items-center justify-between">
					<button class="btn-unstate" @click.prevent.stop="closeModal(resetForm)">Cancel</button>
					<button type="submit" class="btn-primary">
						<box-icon type="solid" name="file-plus" color="white"></box-icon>
						<span class="font-bold text-white">Add</span>
						<CirclesToRhombusesSpinner :size="5" color="#FFF" class="text-white" v-if="isSubmitting" />
					</button>
				</div>
			</Form>
			<span class="text-red-700 text-base">{{ errorCall }}</span>
		</MyModal>
	</div>
</template>

<script setup>
	import MyModal from "@/components/mymodal"
	import * as yup from "yup"
	import { toast } from "@/utils/utils"
	import { useManagement } from "@/store/management"
	import { ref, computed, onMounted } from "vue"
	import { CirclesToRhombusesSpinner } from "epic-spinners"
	import { Form, Field } from "vee-validate"
	import { SearchIcon, TrashIcon, ClipboardIcon, DocumentAddIcon, RefreshIcon } from "@heroicons/vue/solid"
	const store = useManagement()
	var docSchema = yup.object({
		name: yup.string().required().label("Name"),
		code: yup.string().required().label("Code"),
		description: yup.string().required().label("Description"),
	})
	const errorCall = ref(null)

	const search = ref("")
	const dropdown = ref(false)
	const showModalAdd = ref(false)
	const showModalUpdate = ref(false)
	const initialDocValue = ref({ name: "Bulletin 5eme secondaire", code: "2022", description: "la description du document" })
	const listDocuments = computed(() => store.listDocuments)

	onMounted(() => {
		window.onclick = (e) => {
			if (e.target.id !== "toggle-dropdown" && dropdown.value) {
				dropdown.value = false
			}
		}
	})
	const { addDocument, deleteDocument, removeDocument, updateDocument, getAllDocuments } = useManagement()

	function onInvalidDocument({ values, result, errors }) {
		console.log(errors)
	}
	async function updateDoc(values, { resetForm }) {
		var res = await updateDocument(values)
		if (res) {
			toast.success("Document modifié avec succes")
		} else {
			resetForm()
		}
		closeModal()
	}
	async function softdeleteDoc(code) {
		var res = await deleteDocument(code)
		if (res) {
			toast.success("Successfully softdelete document")
		} else {
			toast.error("Can't delete document")
		}
	}
	async function removeDoc(id) {
		var res = await removeDocument(id)
		if (res) {
			toast.success("Successfully remove document")
		} else {
			toast.error("Can't remove this document")
		}
	}
	async function add(values, { resetForm }) {
		var response = await addDocument(values)
		console.log({ response })
		if (response === true) {
			closeModal()
			toast.success("Document ajouté avec succès", {
				timeout: 5000,
			})
			resetForm()
		}
	}
	function closeModal(resetForm = null) {
		showModalAdd.value = false
		showModalUpdate.value = false
		if (resetForm) {
			resetForm()
		}
	}
	function showModif(index, values) {
		showModalUpdate.value = !showModalUpdate.value
		var currentTrue = listDocuments.value.findIndex((doc) => doc.show == true)
		initialDocValue.value = values
		if (currentTrue != -1) {
			if (currentTrue != index) {
				console.log(`SO ${currentTrue} is != 1 and ${index} is != ${currentTrue}`)
				listDocuments.value[currentTrue].show = false
				listDocuments.value[index].show = true
			} else {
				console.log("You click the same item")
				listDocuments.value[index].show = false
			}
		} else {
			console.log("Nothing was True ....")
			listDocuments[index].show = true
		}
	}
</script>

<style scoped></style>
