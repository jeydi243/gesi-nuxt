<template>
  <div class="h-full w-full">
    <div class="card row mb-4 justify-between">
      <span class="text-4xl font-bold border-0 border-l-4 border-l-yellow-400 pl-2">Filières</span>
      <button type="button" class="btn-primary" @click="showModalFiliere = !showModalFiliere">
        <AcademicCapIcon class="h-5 w-5 text-white" />
        <span class="self-center ml-2">Add fielère</span>
      </button>
    </div>
    <div class="h-4/5 pl-4">
      <div class="grid grid-cols-3 gap-4 auto-cols-min w-full h-full">
        <div v-for="(item, indexFiliere) in filieres" :key="indexFiliere" class="rounded-lg select-none">
          <div class="flex justify-center">
            <div class="rounded-lg shadow-lg bg-white max-w-sm">
              <a href="#!" class="aspect-h-16 aspect-w-9">
                <img class="rounded-t-lg" :src="require(`@/assets/img/academic-${indexFiliere + 1}.jpg`)" :alt="`Image - ${indexFiliere}`" />
              </a>
              <div class="p-6">
                <h5 class="text-gray-900 text-xl font-medium mb-2">Card title</h5>
                <p class="text-gray-700 text-base mb-4">{{ item.name }} Some quick example text to build on the card title and make up the bulk of the card's content.hy jhjh</p>
                <h6>{{ item.manager }}</h6>
                <button type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MyModal v-show="showModalFiliere" @close="closeModal">
      <template #header>
        <h1 class="text-3xl font-bold">Ajouter une Filiere</h1>
      </template>
      <div class="bg-blue-100 rounded-lg py-5 px-6 text-base text-blue-700 mb-3" role="alert">You can change some information after save</div>
      <Form class="flex flex-col w-full h-full" @submit="add" :validation-schema="filiereSchema" v-slot="{ isSubmitting }" :initial-values="initialFiliereValue" @invalid-submit="onInvalidFiliere">
        <Field name="name" placeholder="Name" class="form-input"></Field>
        <ErrorMessage name="name" v-slot="{ message }">
          <p class="input-error">{{ message }}</p>
        </ErrorMessage>
        <Field name="manager" id="select-doc" as="select" class="rounded form-select block w-full" placeholder="Manager">
          <option :value="employee.name" v-for="(personne, index) in getEmployees" :key="index" :selected="index == 0">{{ doc.name }}</option>
        </Field>
        <ErrorMessage name="manager" v-slot="{ message }">
          <p class="input-error">{{ message }}</p>
        </ErrorMessage>
        <Field name="sub_manager" placeholder="Sub manager" class="form-input"></Field>
        <ErrorMessage name="sub_manager" v-slot="{ message }">
          <p class="input-error">{{ message }}</p>
        </ErrorMessage>
        <Field name="long_name" placeholder="Give a long name" class="form-input"></Field>
        <ErrorMessage name="long_name" v-slot="{ message }">
          <p class="input-error">{{ message }}</p>
        </ErrorMessage>
        <div class="flex flex-col my-1 h-1/2 items-center justify-center">
          <!-- <p class="text-4xl mb-4">Photo de profil</p> -->
          <div class="mb-4" id="preview" @click.stop="pickPicture" :class="{ 'file-picker': !previewSRC }">
            <img v-if="previewSRC" :src="previewSRC" class="flex z-10 cursor-pointer self-center object-cover rounded-lg h-[100px] w-[100px]" />
            <!-- <UserIcon class="h-10 w-10 text-green-500" v-else /> -->
            <span class="text-green-400" v-else>Choose file for filiere</span>
          </div>
          <Field name="img" v-slot="{ handleChange, handleBlur }">
            <input id="bind-profile" type="file" @change="handleChange" @blur="handleBlur" class="w-full text-sm text-green-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 hidden" hidden />
          </Field>
          <ErrorMessage name="img" v-slot="{ message }">
            <p class="input-error">{{ message }}</p>
          </ErrorMessage>
        </div>
        <Field name="description" as="textarea" placeholder="Give a short description" class="form-textarea mb-4"></Field>
        <ErrorMessage name="description" v-slot="{ message }">
          <p class="input-error">{{ message }}</p>
        </ErrorMessage>
        <div class="flex flex-row h-1/2 w-full items-center justify-between">
          <button class="btn-unstate" @click.prevent="closeModal">Annuler</button>
          <button type="submit" class="btn-primary">
            <!-- <PlusIcon class="h-4 w-4 text-white" v-if="!isSubmitting" /> -->
            <span class="font-bold text-white">Ajouter</span>
            <CirclesToRhombusesSpinner :size="25" :color="'#FFF'" class="block text-white" v-if="isSubmitting" />
          </button>
        </div>
      </Form>
    </MyModal>
  </div>
</template>

<script>
  import { mapState, mapActions } from "pinia"
  import * as yup from "yup"
  import MyModal from "@/components/mymodal"
  import { useManagement } from "@/store/management"
  import { CirclesToRhombusesSpinner } from "epic-spinners"
  import { Form, Field, ErrorMessage } from "vee-validate"
  import { AcademicCapIcon, PlusIcon, UserIcon } from "@heroicons/vue/solid"
  import { isLength } from "validator"
  export default {
    name: "index-filiere",
    components: { AcademicCapIcon, MyModal, CirclesToRhombusesSpinner, Form, Field, ErrorMessage },
    data() {
      const filiereSchema = {
        img(value) {
          if (value) {
            if (value[0] instanceof File || value[0] instanceof Blob) {
              return true
            }
          }
          return "Veuillez choisir une image"
        },
        name(value) {
          return isLength(value, { min: 6, max: 20 }) ? true : "Le minimum de caracteres est 6 et le maximum 12"
        },
        manager(value) {
          return isLength(value, { min: 6, max: 20 }) ? true : "Le minimum de caracteres est 6 et le maximum 12"
        },
        sub_manager(value) {
          return isLength(value, { min: 6, max: 20 }) ? true : "Le minimum de caracteres est 6 et le maximum 12"
        },
        description(value) {
          return isLength(value, { min: 6, max: 500 }) ? true : "Le minimum de caracteres est 6 et le maximum 500"
        },
        long_name(value) {
          return isLength(value, { min: 6, max: 12 }) ? true : "Le minimum de caracteres est 6 et le maximum 12"
        },
      }
      //links to 5 unsplash profiles pictures
      // const img = [
      // 	"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      // 	"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      // 	"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      // 	"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      // 	"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      // ];
      return {
        filiereSchema,
        previewSRC: null,
        filieres: [
          {
            name: "G1",
            img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
            manager: "John Doe",
            long_name: "Genie Logiciel - Systemes informatique",
            sub_manager: "Pere Nsuko",
          },
          {
            name: "G2",
            img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
            long_name: "Genie Logiciel - Gestion",
            manager: "John Doe",
            sub_manager: "Nsulo George",
          },
          {
            name: "G3",
            img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
            long_name: "Design et Multimedia",
            manager: "John Doe",
            sub_manager: "Ndize Mbirwe",
          },
          {
            name: "Prépa",
            img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
            long_name: "Reseau et telecom",
            manager: "John Doe",
            sub_manager: "Kongolo Nbiko",
          },
          {
            name: "G3",
            img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
            long_name: "Design et Multimedia",
            manager: "John Doe",
            sub_manager: "Ndize Mbirwe",
          },
          {
            name: "Prepa",
            img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
            long_name: "Reseau et telecom",
            sub_manager: "Kongolo Nbiko",
            manager: "John Doe",
          },
        ],
        showModalFiliere: false,
        initialFiliereValue: {
          name: "",
          img: null,
          long_name: "",
          manager: "",
          description: "Pariatur ea ut commodo duis.Id irure elit in non nostrud consectetur qui mollit fugiat eu eu.",
          sub_manager: "",
        },
      }
    },
    computed: {
      ...mapState(useManagement, ["getEmployees"]),
    },
    methods: {
      ...mapActions(useManagement, ["addFiliere"]),
      add(values, { resetForm }) {
        try {
          var response = this.addFiliere(values)
          if (res) {
            toast.success("Document modifié avec succes")
          } else {
            this.closeModal()
            resetForm()
          }
        } catch (e) {}
      },
      closeModal() {
        this.showModalFiliere = false
      },
      pickPicture() {
        document.getElementById("bind-profile").click()
        const fi = document.getElementById("bind-profile")
        console.log(fi)
        fi.addEventListener("change", this.onProfilePictureChange)
      },
      onProfilePictureChange(event) {
        console.log("Profile picture change and is ", event.target.files[0])
        if (event.target.files && event.target.files[0]) {
          this.previewSRC = window.URL.createObjectURL(event.target.files[0])
          window.URL.revokeObjectURL(event.target.files[0]) // free memory
        } else {
          this.previewSRC = null
        }
      },
      clickOutside() {},
      onInvalidFiliere({ values, result, errors }) {
        console.log(errors)
      },
    },
  }
</script>

<style scoped></style>
