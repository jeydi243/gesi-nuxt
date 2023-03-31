<template>
  <div class="card h-full w-1/2 m-auto">
    <Form class="col justify-between w-full space-y-4" @submit="submit" v-slot="{ isSubmitting }" :validation-schema="courseSchema" :initial-values="initialCourseValue" @invalid-submit="onInvalidCourse">
      <div class="row w-full">Add new course</div>
      <Field name="title" v-slot="{ field, errorMessage }">
        <div class="relative group h-10">
          <input v-bind="field" type="text" id="title" required class="input peer" />
          <label for="title" class="placeholder-label">Title </label>
          <p class="input-error">{{ errorMessage }}</p>
        </div>
      </Field>
      <!-- <Transition name="fadeSlideX" mode="out-in">
        <div v-if="!img" @click="open" class="col h-[70px] w-full cursor-pointer bg-gray-50 border-2 border-dashed rounded-md justify-center items-center">
          <box-icon name="upload" color="gray"></box-icon>
          <span>Choisissez une image</span>
        </div>
        <div v-else class="w-full h-[250px] overflow-clip relative">
          <img :src="img" class="object-fill rounded-lg absolute top-0 z-1 transition-all delay-500" />
          <button @click.stop="reset" class="absolute rounded-tr-lg rounded-bl-lg z-10 top-0 right-0 bg-red-500 h-5 w-10 row justify-center">
            <box-icon name="x" color="white"></box-icon>
          </button>
        </div>
      </Transition> -->
      <Field name="description" v-slot="{ field, errorMessage }">
        <div class="relative group">
          <textarea v-bind="field" id="description" required class="input-textarea peer" rows="4"></textarea>
          <label for="description" class="placeholder-label">Description </label>
          <p class="input-error">{{ errorMessage }}</p>
        </div>
      </Field>
      <Field name="expiredate" v-slot="{ field, errorMessage }">
        <div class="relative group h-10">
          <input v-bind="field" type="text" id="expiredate" required class="input peer" />
          <label for="expiredate" class="placeholder-label peer-invalid:text-red-600">Expire date </label>
          <p class="input-error">{{ errorMessage }}</p>
        </div>
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
  </div>
</template>

<script setup>
import * as yup from "yup"
import { useCourses } from "@/store/courses"
import { toast, goto } from "@/utils/utils"
import { useFileDialog, get } from "@vueuse/core"
import { ref, watch, computed } from "vue"
import { Form, ErrorMessage, Field } from "vee-validate"
import { CirclesToRhombusesSpinner } from "epic-spinners"
const { files, open, reset } = useFileDialog()

const store = useCourses()
const img = computed({
  get() {
    return URL.createObjectURL(files.value[0])
  },
  set(newVal) {
    files.value = []
  },
})

const courseSchema = yup.object({
  title: yup.string().required().label("Name"),
  description: yup.string().required().label("Description"),
  expiredate: yup.string().notRequired().label("Expire date"),
})
const initialCourseValue = ref({
  title: "course title",
  expiredate: "2024-10-10",
  description:
    "Mollit consectetur aute enim aliquip labore aliqua anim enim nulla aliqua. Id adipisicing elit id nulla do id nulla tempor. Commodo reprehenderit veniam sint adipisicing proident et do ad do enim et non adipisicing quis. Voluptate mollit laboris consectetur Lorem id. Occaecat nulla deserunt labore dolor aliqua.",
})
watch(files, (newv, oldv) => {
  console.log({ myfiles: get(newv) })
})
function onInvalidCourse({ values, result, errors }) {
  console.log(errors)
}
async function submit(values, { resetForm, setFieldError }) {
  console.log({ values })
  try {
    var result = await store.addCourse(values)
    if (!result) {
      goto("courses-index")
      toast.success("Course added successfully !")
    } else {
      for (const key in result) {
        setFieldError(key, result[key][0])
      }
      toast.error(`Can't add new course ${JSON.stringify(result)}`)
    }
  } catch (error) {
    console.log(error)
  }
  // resetForm()
}
</script>

<style scoped></style>
