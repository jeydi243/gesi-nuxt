<template>
  <div class="card bg-white flex-row justify-items-center items-center justify-between h-full overflow-visible">
    <div class="flex flex-row mb-5 grow-none">
      <div v-for="i in stepper.length" :key="i" class="flex flex-col justify-start items-start">
        <span>
          <box-icon type="solid" name="circle" :color="i > step + 1 ? 'black' : 'green'" size="xs" class="mb-2"></box-icon>
          <template v-if="i != stepper.length">
            <span v-for="k in 10" :key="k">-</span>
          </template>
        </span>

        <span class="text-xs">{{ i }}</span>
      </div>
    </div>
    

    <!-- <Transition name="fadeSlideY" mode="out-in"> -->
    <Form class="form grow" @submit="goNext" :validation-schema="currentSchema" keep-values :initial-values="currentValues" v-slot="{ isSubmitting }">
      <template class="step-content" v-if="step === 0">
        <h1 class="text-4xl mb-4">Informations préliminaires</h1>
        <div class="grid grid-cols-2 gap-4 auto-cols-max">
          <div class="input-group-grid name">
            <Field name="name" v-slot="{ field, errorMessage }">
              <div class="relative group">
                <input v-bind="field" id="name" required class="input peer" />
                <label for="name" class="placeholder-label">Code </label>
                <p class="input-error">{{ errorMessage }}</p>
              </div>
            </Field>
          </div>
          <div class="input-group-grid country">
            <Field name="country" id="country" as="select" class="rounded form-select block w-full">
              <option value="RDC (Congo)" selected>RDC (Congo)</option>
              <option value="Congo">Congo</option>
              <option value="Senegal">Senegal</option>
              <option value="Cote d'ivoire">Cote d'ivoire</option>
            </Field>
            <ErrorMessage name="country" v-slot="{ message }">
              <p class="input-error">{{ message }}</p>
            </ErrorMessage>
          </div>
          <div class="input-group-grid gender">
            <Field name="gender" id="gender" as="select" class="rounded input block w-full" required>
              <option value selected>--Select gender--</option>
              <option value="M">Male</option>
              <option value="M">Female</option>
            </Field>
            <ErrorMessage name="gender" v-slot="{ message }">
              <p class="input-error">{{ message }}</p>
            </ErrorMessage>
          </div>
          <div class="input-group-grid email">
            <Field name="email" v-slot="{ field, errorMessage }">
              <div class="relative group">
                <input v-bind="field" id="email" required class="input peer" />
                <label for="email" class="placeholder-label">Email </label>
                <p class="input-error">{{ errorMessage }}</p>
              </div>
            </Field>
          </div>
          <div class="input-group-grid birthDate">
            <Field name="birthdate" v-slot="{ field, errorMessage }">
              <div class="relative group">
                <input v-bind="field" id="birthdate" required class="input peer" type="date" placeholder="Date of Birth" />
                <label for="birthdate" class="placeholder-label">Birthday </label>
                <p class="input-error">{{ errorMessage }}</p>
              </div>
            </Field>
          </div>
          <div class="input-group-grid telephone">
            <Field name="telephone" v-slot="{ field, errorMessage }">
              <div class="relative group">
                <input v-bind="field" id="telephone" required class="input peer" />
                <label for="telephone" class="placeholder-label">Telephone </label>
                <p class="input-error">{{ errorMessage }}</p>
              </div>
            </Field>
          </div>
        </div>
      </template>
      <template class="step-content" v-else-if="step === 1">
        <h1 class="text-4xl mb-4">Address</h1>
        <div class="grid grid-cols-2 gap-4 auto-cols-max">
          <Field name="avenue" v-slot="{ field, errorMessage }" class="input-group-grid name">
            <div class="relative group">
              <input v-bind="field" id="avenue" required class="input peer" />
              <label for="avenue" class="placeholder-label">Avenue </label>
              <p class="input-error">{{ errorMessage }}</p>
            </div>
          </Field>

          <div class="input-group-grid country">
            <Field name="numero" v-slot="{ field, errorMessage }">
              <div class="relative group">
                <input v-bind="field" id="numero" required class="input peer" />
                <label for="numero" class="placeholder-label">Code </label>
                <p class="input-error">{{ errorMessage }}</p>
              </div>
            </Field>
          </div>
          <div class="input-group-grid gender">
            <Field name="quartier" v-slot="{ field, errorMessage }">
              <div class="relative group">
                <input v-bind="field" id="quartier" required class="input peer" />
                <label for="quartier" class="placeholder-label">Quartier </label>
                <p class="input-error">{{ errorMessage }}</p>
              </div>
            </Field>
          </div>
          <div class="input-group-grid email">
            <Field name="commune" v-slot="{ field, errorMessage }">
              <div class="relative group">
                <input v-bind="field" id="commune" required class="input peer" />
                <label for="commune" class="placeholder-label">Commune </label>
                <p class="input-error">{{ errorMessage }}</p>
              </div>
            </Field>
          </div>
          <div class="input-group-grid birthDate">
            <Field name="ville" v-slot="{ field, errorMessage }">
              <div class="relative group">
                <input v-bind="field" id="ville" required class="input peer" />
                <label for="ville" class="placeholder-label">Ville </label>
                <p class="input-error">{{ errorMessage }}</p>
              </div>
            </Field>
          </div>
          <div class="input-group-grid telephone">
            <Field name="zip" v-slot="{ field, errorMessage }">
              <div class="relative group">
                <input v-bind="field" id="zip" required class="input peer" />
                <label for="zip" class="placeholder-label">Zip Code </label>
                <p class="input-error">{{ errorMessage }}</p>
              </div>
            </Field>
          </div>
        </div>
      </template>
      <template class="step-content" v-else-if="step === 2">
        <p class="text-4xl mb-4">Photo de profil</p>
        <div class="flex flex-col mb-4 h-1/2 items-center justify-center">
          <div class="mb-4" id="preview" @click.stop="pickPicture" :class="{ profile2: !previewSRC }">
            <img v-if="previewSRC" :src="previewSRC" class="flex z-10 cursor-pointer self-center object-cover rounded-lg h-[100px] w-[100px]" />
            <UserIcon class="h-10 w-10 text-green-500" v-else />
          </div>
          <Field name="profile" v-slot="{ handleChange, handleBlur }">
            <input id="bind-profile" type="file" @change="handleChange" @blur="handleBlur" class="w-full text-sm text-green-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 hidden" hidden />
          </Field>
          <ErrorMessage name="profile" v-slot="{ message }">
            <p class="input-error">{{ message }}</p>
          </ErrorMessage>
        </div>
        <!-- <ol class="items-center sm:flex">
          <li class="relative mb-6 sm:mb-0">
            <div class="flex items-center">
              <div class="flex z-10 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                <svg class="w-3 h-3 text-blue-600 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
            </div>
            <div class="mt-3 sm:pr-8">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Flowbite Library v1.0.0</h3>
              <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Released on December 2, 2021</time>
              <p class="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements.</p>
            </div>
          </li>
          <li class="relative mb-6 sm:mb-0">
            <div class="flex items-center">
              <div class="flex z-10 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                <svg class="w-3 h-3 text-blue-600 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
            </div>
            <div class="mt-3 sm:pr-8">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Flowbite Library v1.2.0</h3>
              <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Released on December 23, 2021</time>
              <p class="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements.</p>
            </div>
          </li>
          <li class="relative mb-6 sm:mb-0">
            <div class="flex items-center">
              <div class="flex z-10 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                <svg class="w-3 h-3 text-blue-600 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
            </div>
            <div class="mt-3 sm:pr-8">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Flowbite Library v1.3.0</h3>
              <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Released on January 5, 2022</time>
              <p class="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements.</p>
            </div>
          </li>
        </ol> -->
      </template>
      <template class="step-content" v-else-if="step === 3">
        <h1 class="text-4xl mb-4">Add contact</h1>
        <div class="flex flex-col">
          <div class="input-group-grid name">
            <Field name="contact_name" v-slot="{ field, errorMessage }">
              <div class="relative group">
                <input v-bind="field" id="contact_name" required class="input peer w-full" />
                <label for="contact_name" class="placeholder-label">Name </label>
                <p class="input-error">{{ errorMessage }}</p>
              </div>
            </Field>
          </div>
          <div class="input-group-grid telephone">
            <Field name="contact_phone" v-slot="{ field, errorMessage }">
              <div class="relative group">
                <input v-bind="field" id="contact_phone" required class="input peer w-full" />
                <label for="contact_phone" class="placeholder-label">Phone number </label>
                <p class="input-error">{{ errorMessage }}</p>
              </div>
            </Field>
          </div>
          <div class="input-group-grid email">
            <Field type="text" placeholder="Email" id="name" name="email" class="w-full input" />
            <ErrorMessage name="name" v-slot="{ message }">
              <p class="input-error">{{ message }}</p>
            </ErrorMessage>
          </div>
        </div>
      </template>
      <template class="step-content" v-else-if="step === 4">
        <h1 class="text-4xl mb-4">Add High-School</h1>
        <div class="grid grid-cols-2 gap-2">
          <div class="input-group-grid name">
            <Field name="school_name" v-slot="{ field, errorMessage }">
              <div class="relative group">
                <input v-bind="field" id="school_name" required class="input peer w-full" />
                <label for="school_name" class="placeholder-label">School Name </label>
                <p class="input-error">{{ errorMessage }}</p>
              </div>
            </Field>
          </div>
          <div class="input-group-grid telephone">
            <Field name="telephone" v-slot="{ field, errorMessage }">
              <div class="relative group">
                <input v-bind="field" id="telephone" required class="input peer w-full" />
                <label for="telephone" class="placeholder-label">Telephone </label>
                <p class="input-error">{{ errorMessage }}</p>
              </div>
            </Field>
          </div>
          <div class="input-group-grid diploma">
            <Field placeholder="Diploma" v-slot="{ handleChange, handleBlur }" name="diploma">
              <input
                type="file"
                name="diploma"
                accept=".pdf"
                id="diploma"
                @change="handleChange"
                @blur="handleBlur"
                class="text-sm text-green-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 w-full"
              />
            </Field>
            <ErrorMessage name="diploma" v-slot="{ message }">
              <p class="input-error">{{ message }}</p>
            </ErrorMessage>
          </div>
        </div>
      </template>

      <!-- </Transition> -->

      <div class="bottom flex flex-row w-full items-center justify-between">
        <button class="btn-unstate" @click="goBack">Cancel</button>
        <button type="submit" class="btn-primary">
          <span class="font-bold text-white"> {{ step === 4 ? "Save" : "Suivant" }}</span>
          <SaveIcon class="h-5 w-5 text-white" v-if="!isSubmitting && step === 4" />
          <CirclesToRhombusesSpinner :size="25" :color="'#FFF'" v-else-if="isSubmitting" />
        </button>
      </div>
    </Form>
  </div>
</template>

<script setup>
import { toast } from "@/utils/utils"
import { useStudents } from "@/store/students"
import { SaveIcon, UserIcon } from "@heroicons/vue/solid"
import { markRaw, ref, computed } from "vue"
import { Field, Form, ErrorMessage } from "vee-validate"
import { CirclesToRhombusesSpinner } from "epic-spinners"
import * as yup from "yup"

let step = ref(0)
const store = useStudents()
const previewSRC = ref(null)

const basicInfoSchema = markRaw(
  yup.object({
    name: yup.string().required().label("Name"),
    country: yup.string().required().label("Country"),
    telephone: yup.string().required().label("Telephones"),
    email: yup.string().email().required().label("Email"),
    birthDate: yup.date().label("Birthday"),
    gender: yup.string().default("off").label("Gebder"),
  })
)
const profileSchema = yup.object({
  profile: yup
    .mixed()
    .test("fileSize", "File size must be less than 5MB", (value) => value instanceof File || value instanceof Blob)
    .test("fileType", "Unsupported file type", (value) => value && ["image/png", "image/jpeg"].includes(value.type)),
  //   profile: function (value) {
  //     if (value instanceof File || value instanceof Blob || value[0] instanceof File || value[0] instanceof Blob) {
  //       return true
  //     }
  //     return "Vous devez choisir une photo de profil"
  //   },
})
const addressSchema = markRaw(
  yup.object({
    avenue: yup.string().required().label("Avenue"),
    commune: yup.string().required().label("Commune"),
    ville: yup.string().required().label("Town"),
    quartier: yup.string().required().label("Neighborhood"),
    zip: yup.string().required().label("Zip code"),
    numero: yup.number().required().label("Phone number"),
  })
)
const contactSchema = yup.object({
  name: yup.string().required().label("Name"),
  telephone: yup.number().required().label("Telephone"),
  email: yup.string().required().label("Email"),
})
const schoolSchema = yup.object({
  name: yup.string().required().label("Name"),
  telephone: yup.string().required().label("Telephone"),
  addresse: yup.string().required().label("Telephone"),
  email: yup.string().required().label("Email"),
})
const studentSchema = [basicInfoSchema, addressSchema, profileSchema, contactSchema, schoolSchema]
const currentSchema = computed(() => studentSchema[step.value])
const stepper = computed(() => studentSchema)

const basicInfoValues = ref({
  name: "Kadiongo Ilungasd",
  birthDate: "2000-02-02",
  gender: "M",
  email: "email@email.com",
  telephone: "+245369854",
  country: "RDC (Congo)",
})
const profileValues = ref({ profile: "" })
const contactValues = ref({ contact_name: "Kabondo Ndianda", contact_email: "kabondo@email.com", contact_phone: "+24387747021" })
const schoolValues = ref({ school_name: "IT Salama", telephone: "+24381745021", email: "school@email.com" })
const addressValues = ref({ avenue: "Kawama", commune: "Bondo", ville: "Kalemie", quartier: "Baudwin", zip: "75123", numero: 5 })
const studentValues = [basicInfoValues, addressValues, profileValues, contactValues, schoolValues]
const currentValues = computed(() => studentValues[step.value])

function pickPicture() {
  document.getElementById("bind-profile").click()
  const fi = document.getElementById("bind-profile")
  console.log(fi)
  fi.addEventListener("change", onFileChange)
}
function onFileChange(event) {
  console.log("Profile picture change and is ", event.target.files[0])
  if (event.target.files && event.target.files[0]) {
    this.previewSRC = window.URL.createObjectURL(event.target.files[0])
    window.URL.revokeObjectURL(event.target.files[0]) // free memory
  } else {
    this.previewSRC = null
  }
}
function goNext(values) {
  try {
    if (step.value === 5) {
      console.log("Done: ", JSON.stringify(values, null, 2))
      const re = store.addStudent(values)
      console.log(re)
    }
  } catch (error) {}

  step.value++
}
function goBack() {
  if (step.value == 0) return
  step.value--
  console.log("You clicked")
}
</script>

<style lang="scss" scoped></style>
