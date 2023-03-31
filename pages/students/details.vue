<template>
	<div class="main flex flex-row h-full">
		<div class="flex flex-col w-1/5 h-full card mr-2 relative">
			<div class="rounded-full profile mb-2">
				<img src="https://images.generated.photos/pn-4ub1PeBlBuDILgChTqIwjBIMhxm-Ah_rzk9t0GD8/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/ODUwMDk3LmpwZw.jpg" class="flex z-10 cursor-pointer self-center object-cover rounded-full h-[100px] w-[100px]" />
				<!-- <img :src="require('@/assets/img/user.png')" class="flex z-10 cursor-pointer self-center object-cover rounded-full h-[100px] w-[100px]" /> -->
			</div>
			<span class="text-gray-700 text-center text-base mb-2">Student Name</span>
			<div class="flex flex-row justify-center mb-2 items-center">
				<div class="px-3 py-1 hover:bg-green-50 rounded-lg bg-transparent transition-all duration-700">
					<a href="tel:+">
						<box-icon name="phone" type="regular"></box-icon>
					</a>
				</div>
				<div class="px-3 py-1 hover:bg-green-50 rounded-lg bg-transparent transition-all duration-700">
					<a href="mailto:">
						<box-icon name="mail-send" type="regular"></box-icon>
					</a>
				</div>
			</div>
			<div class="grid grid-cols-1 justify-items-center gap-2 auto-cols-max auto-rows-max mb-4">
				<div class="hover:bg-green-50 rounded grid grid-cols-1 auto-cols-max w-full auto-rows-max transition-all duration-700 place-items-center">
					<span class="font-bold">Age</span>
					<span>19</span>
				</div>
				<div class="hover:bg-green-50 rounded grid grid-cols-1 auto-cols-max w-full auto-rows-max transition-all duration-700 place-items-center">
					<span class="font-bold">Gender</span>
					<span>Male</span>
				</div>
				<div class="hover:bg-green-50 rounded grid grid-cols-1 auto-cols-max w-full auto-rows-max transition-all duration-700 place-items-center">
					<span class="font-bold">Birth Date</span>
					<span class="text-xs break-words text-ellipsis">08/12/1998</span>
				</div>
				<div class="hover:bg-green-50 rounded grid grid-cols-1 auto-cols-max w-full auto-rows-max transition-all duration-700 place-items-center">
					<span class="font-bold">Adress</span>
					<span class="text-xs break-words text-ellipsis">1, Av/Lubumbashi, Q Makomeno</span>
				</div>
			</div>
			<span class="h-[2px] bg-green-50 w-full"></span>
			<div class="flex flex-col responsables">
				<div class v-for="(item, index) in listResponsables" :key="index">{{ item.name }}f</div>
			</div>
		</div>
		<div class="flex flex-col w-4/5 h-full card align-middle justify-start">
			<div class="flex border-b border-gray-200 mb-2">
				<button v-for="(tab,index) in tabsDetails" :key="index" class="btn-tab" :class="{ 'btn-tab-active': tab.current }" @click="changeTab(index)">{{ filters.firstUpper(tab.last_name) }}</button>
			</div>

			<div class="contentTab">
				<Transition name="fadeSlideX" mode="out-in">
					<KeepAlive>
						<div class="flex h-full w-full" v-if="currentComponent == 'calendrier'">
							<Calendrier />
						</div>
						<div class="flex flex-col h-1/2 w-full" v-else-if="currentComponent == 'documents'">
							<Form class="flex flex-col mb-4 justify-center items-center" @submit="addFiledoc" :validation-schema="filedocSchema" v-slot="{isSubmitting}" :initial-values="filedocValues" @invalid-submit="onInvalidfiledoc">
								<div class="flex flex-row justify-start w-full">
									<Field name="code" id="select-doc" as="select" class="rounded form-select block w-full">
										<option :value="doc.code" v-for="(doc,index) in listDoc" :key="index" :selected="index == 0">{{ doc.name }}</option>
									</Field>
									<Field placeholder="Inserer le fichier au format PDF" v-slot="{handleChange,handleBlur}" name="document">
										<input type="file" name="document" accept=".pdf" id="document" @change="handleChange" @blur="handleBlur" class="text-sm text-green-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 ">
									</Field>
									<ErrorMessage name="document" v-slot="{ message }">
										<p class="input-error">{{ message }}</p>
									</ErrorMessage>
									<button type="submit" class="g-button-primary">
										<span class="font-bold text-white">Ajouter</span>
										<CirclesToRhombusesSpinner v-if="isSubmitting" :size="25" :color="'#FFF'" />
									</button>
								</div>
							</Form>

							<div class="divider"></div>
							<div v-for="(doc,index) in listDocuments" :key="index" class="flex flex-row justify-between">
								<div class="document" :class="{'document-other': !doc.state,'document':doc.state }" @click="showModal">
									<box-icon :name="`file-${doc.type}`" type="solid" color="darkBlue"></box-icon>
									<span class="truncate">{{ doc.name }}</span>

									<!-- <box-icon name="dots-vertical-rounded" color="darkBlue" class="bg-red cursor-pointer"></box-icon> -->
								</div>
								<div class="actions">
									<button class="g-button-primary" @click="showFile">{{ doc.state? 'Voir':'Ajouter' }}</button>
									<button class="g-button-primary" @click="modifFile">Modifier</button>
								</div>
							</div>
						</div>
					</KeepAlive>
				</Transition>
			</div>
		</div>
		<Modal v-model="canshowModal" @click-outside="clickOutside" classes="flex flex-col h-1/3 justify-center items-center" content-class="flex flex-col max-h-full rounded bg-white">
			<template #title>Events Example!</template>
			<div class="dropdown">
				<span href="#" class="dropdown-item" @click="modifFile">Modifier le fichier</span>
				<span href="#" class="dropdown-item" @click="showFile">Voir le fichier</span>
			</div>
		</Modal>
	</div>
</template>

<script>
import Calendrier from "@/components/calendar.vue";
import { UserIcon, ArrowRightIcon } from "@heroicons/vue/solid";
import studentsAPI from "@/api/students";
import { Field, Form, ErrorMessage } from "vee-validate";
import { CirclesToRhombusesSpinner } from "epic-spinners";
import { toast } from "@/utils/utils";

export default {
	name: "students-details",
	components: {
		Calendrier,
		Form,
		Field,
		ErrorMessage,
		CirclesToRhombusesSpinner,
	},
	data() {
		const docaddSchema = {
			document(value) {
				if (value[0] instanceof File || value[0] instanceof Blob) {
					return true;
				}
				return "Vous devez choisir un fichier pdf valide";
			},
			code(value) {
				if (listCodeDocument.includes(value)) {
					return true;
				}
				return "Le code doit correspondre a un code document valide";
			},
		};
		return {
			canshowModal: false,
			docaddSchema,
			filedocValues: { document: null, code: null },
			listDocuments: [
				{
					name: "Certificat d'aptitude physique",
					type: "pdf",
					code: "UR-070",
					state: true,
					lien: "https://www.google.com",
				},
				{
					name: "Bonne Vie  et  Moeurs",
					type: "pdf",
					code: "YW-315",
					state: true,
					lien: "https://www.google.com",
				},
				{
					name: "Bulletin 5eme",
					type: "pdf",
					code: "BK-818",
					state: false,
					lien: "https://www.google.com",
				},
				{
					name: "Attestation de scolarité",
					type: "pdf",
					code: "GE-818",
					state: true,
					lien: "https://www.google.com",
				},
				{
					name: "Bulletin 6eme",
					type: "pdf",
					code: "UD-222",
					state: true,
					lien: "https://www.google.com",
				},
			],
			listResponsables: [
				{
					name: "Mme. Mwanga",
					phone: "5561217231",
					email: "awzal@felewle.ir",
				},
				{
					name: "Mme. Josephine",
					phone: "3319607751",
					email: "cemueko@job.fi",
				},
			],
			tabsDetails: [
				{ name: "Calendrier", current: false },
				{ name: "Documents", current: true },
			],
		};
	},
	computed: {
		currentComponent() {
			return this.tabsDetails.find((tab) => tab.current).name.toLowerCase();
		},
		listDoc() {
			return this.listDocuments.filter((doc) => !doc["state"]);
		},
	},
	methods: {
		back() {
			this.$router.back();
		},
		showModal() {
			this.canshowModal = !this.canshowModal;
		},
		clickOutside() {
			// alert("click-outside");
		},
		beforeOpen() {
			// alert("beforeOpen");
		},
		opened() {
			// alert("opened");
		},
		modifFile() {
			// alert("closed");
		},
		showFile() {
			// alert("closed");
		},
		addFiledoc(values) {
			var formdata = new FormData();
			formdata.append("document", values.document[0]);
			formdata.append("code", values.code);

			var studentId = this.$route.params.id;
			console.log(values.document[0], studentId);

			studentsAPI
				.addDocument(studentId, formdata)
				.then((response) => {
					if (response.status < 300) {
						toast.success(`Enregistrement terminé :${response.data}`, {
							timeout: 5000,
						});
					} else {
						toast.error(`Impossible d'ajouter le document: ${response.data}`, {
							timeout: 5000,
						});
					}
				})
				.catch((err) => {});
		},
		onInvalidfiledoc() {
			console.log("Le fichier n'est pas valide");
		},
		changeTab(index) {
			var currentTrue = this.tabsDetails.findIndex((tab) => tab.current);
			this.tabsDetails[currentTrue].current = false;
			this.tabsDetails[index].current = true;
		},
	},
};
</script>

<style lang="css" scoped>
</style>