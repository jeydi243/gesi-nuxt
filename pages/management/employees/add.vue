<template>
  <div class="card">
    <Form v-slot="{ isSubmitting, values }" @submit="submitEmployee" :validation-schema="employeeSchema" :initial-values="employeeValues" @invalid-submit="onInvalidEmployee">
      <div class="grid grid-cols-3 gap-4 auto-cols-min w-full h-full">
        <!-- <fieldset class="border-2 block col border-yellow-200 rounded-lg px-2 py-4 items-center align-middle justify-center content-center">
					<legend class="italic text-yellow-600 pr-3">Profile Picture</legend>
					<div class="mb-4 h-1/2" id="preview" @click.prevent="pickFile('profile_img')" :class="{ 'profile-square': !src }">
						<img v-if="src" :src="src" class="flex z-10 cursor-pointer self-center object-cover rounded-lg h-1/2 w-full" />
						<UserIcon class="h-10 w-10 text-green-500" v-else />
					</div>
					<Field name="profile_img" v-slot="{ handleChange, handleBlur }">
						<input id="profile_img" type="file" @change="handleChange" @blur="handleBlur" accept="image/*," class="w-full text-sm text-green-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 hidden" hidden />
					</Field>
					<ErrorMessage name="profile" v-slot="{ message }">
						<p class="input-error">{{ message }}</p>
					</ErrorMessage>
				</fieldset> -->
        <div>
          <fieldset class="border-2 border-green-50 rounded-lg px-2 py-4">
            <legend class="italic text-green-500 pr-3">Informations</legend>
            <Field type="text" placeholder="First Name" id="name" name="first_name" class="w-full form-input" />
            <ErrorMessage name="first_name" v-slot="{ message }">
              <p class="input-error">{{ message }}</p>
            </ErrorMessage>
            <Field type="text" placeholder="Middle Name" id="middle" name="middle_name" class="w-full form-input" />
            <ErrorMessage name="middle_name" v-slot="{ message }">
              <p class="input-error">{{ message }}</p>
            </ErrorMessage>
            <Field type="text" placeholder="Last Name" id="last" name="last_name" class="w-full form-input" />
            <ErrorMessage name="last_name" v-slot="{ message }">
              <p class="input-error">{{ message }}</p>
            </ErrorMessage>
            <Field placeholder="Phone number comma separated" id="telephones" name="telephones" class="w-full form-input" />
            <ErrorMessage name="telephones" v-slot="{ message }">
              <p class="input-error">{{ message }}</p>
            </ErrorMessage>
            <Field type="date" placeholder="Birthday" id="birthday" name="birthday" class="w-full form-input" />
            <ErrorMessage name="birthday" v-slot="{ message }">
              <p class="input-error">{{ message }}</p>
            </ErrorMessage>
            <Field type="email" placeholder="Email" id="email" name="email" class="w-full form-input" />
            <ErrorMessage name="email" v-slot="{ message }">
              <p class="input-error">{{ message }}</p>
            </ErrorMessage>
            <Field as="select" placeholder="Gender" id="gender" name="gender" class="block w-full form-select">
              <option value="M" selected>Male</option>
              <option value="F">Female</option>
            </Field>
            <ErrorMessage name="gender" v-slot="{ message }">
              <p class="input-error">{{ message }}</p>
            </ErrorMessage>
            <Field as="textarea" placeholder="Address" id="address" name="address" class="w-full form-input" />
            <ErrorMessage name="address" v-slot="{ message }">
              <p class="input-error">{{ message }}</p>
            </ErrorMessage>

            <Field name="cityzenship" id="cityzenship" as="select" class="form-select block w-full">
              <option value="CD" selected>RDC (Congo)</option>
              <option value="CN">Congo</option>
              <option value="SN">Senegal</option>
              <option value="CIV">Cote d'ivoire</option>
            </Field>
            <ErrorMessage name="cityzenship" v-slot="{ message }">
              <p class="input-error">{{ message }}</p>
            </ErrorMessage>
          </fieldset>
          <fieldset class="border-2 border-blue-50 rounded-lg px-2 py-4">
            <legend class="italic text-blue-400 pr-3">Hire</legend>
            <Field name="hire_date" type="date" placeholder="Hire date" class="w-full form-input" />
            <ErrorMessage name="hire_date" v-slot="{ message }">
              <p class="input-error">{{ message }}</p>
            </ErrorMessage>
            <Field name="skills" placeholder="Skills" class="w-full form-input" />
            <ErrorMessage name="skills" v-slot="{ message }">
              <p class="input-error">{{ message }}</p>
            </ErrorMessage>
          </fieldset>
        </div>
        <div class="col-span-2">
          <!-- <fieldset class="border-2 border-blue-50 rounded-lg px-2 py-4">
						<legend class="italic text-blue-400 pr-3">Education</legend>
						<Field placeholder="School Name" id="school_name" name="school_name" class="w-full form-input" />
						<ErrorMessage name="school_name" v-slot="{ message }">
							<p class="input-error">{{ message }}</p>
						</ErrorMessage>
						<Field type="text" placeholder="Diploma name" id="school_diploma_name" name="school_diploma_name" class="w-full form-input" />
						<ErrorMessage name="school_diploma_name" v-slot="{ message }">
							<p class="input-error">{{ message }}</p>
						</ErrorMessage>

						<Field name="school_start_date" type="date" placeholder="Start date" class="w-full form-input" />
						<ErrorMessage name="school_start_date" v-slot="{ message }">
							<p class="input-error">{{ message }}</p>
						</ErrorMessage>
						 <ArrowRightIcon class="h-5 w-5 text-green-400" />
						<Field name="school_end_date" type="date" placeholder="End date" class="w-full form-input" />
						<ErrorMessage name="school_end_date" v-slot="{ message }">
							<p class="input-error">{{ message }}</p>
						</ErrorMessage>

						<Field v-slot="{ handleChange, handleBlur }" name="school_diploma_file">
							<input type="file" @change="handleChange" accept=".pdf" @blur="handleBlur" class="block w-full form-file" />
						</Field>
						<ErrorMessage name="school_diploma_file" v-slot="{ message }">
							<p class="input-error">{{ message }}</p>
						</ErrorMessage>
						<Field name="domain" type="text" placeholder="Domain Tag" class="w-full form-input" />
						<ErrorMessage name="domain" v-slot="{ message }">
							<p class="input-error">{{ message }}</p>
						</ErrorMessage>
					</fieldset> -->
          <fieldset class="border-2 border-sky-500 rounded-lg px-2 py-4">
            <legend class="italic text-yellow-600 pr-3">Applications</legend>
            <!-- <Field v-slot="{ handleChange, handleBlur }" name="resume_file" class="w-full">
							<input type="file" @change="handleChange" accept=".pdf" @blur="handleBlur" class="w-full form-file" />
						</Field>
						<ErrorMessage name="resume_file" v-slot="{ message }">
							<p class="input-error">{{ message }}</p>
						</ErrorMessage> -->
            <Field as="textarea" placeholder="Cover letter" id="cover_letter" name="cover_letter" class="w-full form-input h-56" />
            <ErrorMessage name="cover_letter" v-slot="{ message }">
              <p class="input-error">{{ message }}</p>
            </ErrorMessage>
            <Field as="textarea" placeholder="Biography" id="biography" name="biography" class="w-full form-input h-56" />
            <ErrorMessage name="biography" v-slot="{ message }">
              <p class="input-error">{{ message }}</p>
            </ErrorMessage>
            <Field placeholder="Position" id="position" name="position" class="w-full form-input" />
            <ErrorMessage name="cover_letter" v-slot="{ message }">
              <p class="input-error">{{ message }}</p>
            </ErrorMessage>
          </fieldset>
        </div>
      </div>

      <div class="row-reverse mt-5">
        <button class="btn-primary disabled:bg-green-800" :disabled="isSubmitting" type="submit">
          <template v-if="!isSubmitting">
            <UserIcon class="h-5 w-5 text-white mr-3" />
            Add employee
          </template>
          <CirclesToRhombusesSpinner :size="20" :color="'#FFF'" v-if="isSubmitting" />
        </button>
        <button class="btn-unstate mr-2" @click.prevent="beforeCancel(values)">Annuler</button>
      </div>
    </Form>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { parseISO } from "date-fns"
import { UserIcon } from "@heroicons/vue/solid"
import { CirclesToRhombusesSpinner } from "epic-spinners"
import { isLength, isDate, isEmail } from "validator"
import { toast } from "@/utils/utils"
import { Field, Form, ErrorMessage } from "vee-validate"
import { mapActions } from "pinia"
import { useManagement } from "@/store/management"
import { goto, chance } from "@/utils/utils"
const store = useManagement()
const src = ref(null)

const employeeSchema = {
  first_name(value) {
    return isLength(value, { min: 2, max: 20 }) ? true : "First name must be between 2 and 20 characters"
  },
  gender(value) {
    return value == "M" || value == "F" ? true : "Must be F or M"
  },
  email(value) {
    return isEmail(value) ? true : "Must be valid Email"
  },
  address(value) {
    return isLength(value, { min: 2, max: 200 }) ? true : "Address must be between 2 and 200 characters"
  },
  position(value) {
    return isLength(value, { min: 2, max: 50 }) ? true : "Position must be between 2 and 50 characters"
  },
  skills(value) {
    return isLength(value, { min: 2, max: 50 }) ? true : "Skils must be between 2 and 50 characters"
  },
  telephones(value) {
    return isLength(value, { min: 10 }) ? true : "telephones must be 10 characters or more"
  },
  cityzenship(value) {
    return isLength(value, { min: 2, max: 3 }) ? true : "cityzenship must be 2 characters or 3"
  },
  last_name(value) {
    return isLength(value, { min: 2, max: 20 }) ? true : "Last name must be between 2 and 20 characters"
  },
  middle_name(value) {
    return isLength(value, { min: 2, max: 20 }) ? true : "Middle name must be between 2 and 20 characters"
  },
  domain(value) {
    return isLength(value, { min: 2, max: 20 }) ? true : "domain must be provided"
  },
  hire_date(value) {
    return isDate(parseISO(value)) ? true : "Hire date must be provided"
  },
  cover_letter(value) {
    return isLength(value, { min: 50, max: 500 }) ? true : "Cover letter must be between 150 and 500 characters"
  },
  biography(value) {
    return isLength(value, { min: 30, max: 500 }) ? true : "Biography must be between 30 and 500 characters"
  },
}
const employeeValues = {
  address: chance.address(),
  biography: chance.sentence({ words: 30 }),
  last_name: chance.name(),
  first_name: chance.last().split(" ")[0],
  telephones: chance.phone({ country: "fr", mobile: true }),
  middle_name: chance.last().split(" ")[0],
  cover_letter: chance.sentence({ words: 50 }),
  email: chance.email(),
  gender: "M",
  domain: "Math",
  skills: "Code, Design",
  position: "Developer",
  birthday: "1999-10-10",
  hire_date: "2019-10-10",
  cityzenship: "FR",
}

function beforeCancel(values) {
  if (values == this.employeeValues) {
    this.$router.back()
  } else {
    this.$router.back()
  }
}
function onInvalidEmployee({ values, errors, results }) {
  console.log({ errors })
}
function pickFile(idInput) {
  const file_input = document.getElementById(idInput)
  file_input.click()
  file_input.addEventListener("change", this.onFileChange)
}
function onFileChange(event) {
  if (event.target.files && event.target.files[0]) {
    src.value = window.URL.createObjectURL(event.target.files[0])
    window.URL.revokeObjectURL(event.target.files[0]) // free memory
  } else {
    src.value = null
  }
}
async function submitEmployee(values) {
  const employee = new FormData()
  values["telephones"] = values["telephones"].split(",").map((tel) => tel.replaceAll(" ", ""))
  values["position"] = values["position"].split(",")

  const { resume_file, profile_img, ...other } = values
  console.log(other)
  for (const key in other) {
    employee.append(key, other[key])
  }

  try {
    var result = await store.addEmployee(other)
    if (result) {
      goto("employees-index")
      toast.success("Employee added successfully !")
    } else {
      toast.error(`Can't add new employee`)
    }
  } catch (error) {
    console.log(error)
  }
}
</script>
