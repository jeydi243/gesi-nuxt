<template>
  <div class="card h-full w-1/2 m-auto">
    <Form class="col justify-between w-full space-y-4" @submit="submit" v-slot="{ isSubmitting, resetForm }" :validation-schema="contentSchema" :initial-values="initialContentValue" @invalid-submit="onInvalidContent">
      <div class="row w-full">Add new Content</div>
      <Field name="title" v-slot="{ field, errorMessage }">
        <div class="relative group h-10">
          <input v-bind="field" type="text" id="title" required class="input peer" />
          <label for="title" class="placeholder-label">Title </label>
          <p class="input-error">{{ errorMessage }}</p>
        </div>
      </Field>
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

<script setup lang="ts">
import * as yup from "yup"
import { useContents } from "@/store/contents"
import { useFileDialog, get } from "@vueuse/core"
import { Form, ErrorMessage, Field } from "vee-validate"
import { CirclesToRhombusesSpinner } from "epic-spinners"
import { useToast } from "vue-toastification"
const { files, open, reset } = useFileDialog()
const router = useRouter()
const store = useContents()
const img = computed({
  get() {
    return URL.createObjectURL(files.value![0])
  },
  set(newVal) {
    // files!.value = []
  },
})
const toast = useToast()
const contentSchema = yup.object({
  title: yup.string().required().label("Name"),
  description: yup.string().required().label("Description"),
  expiredate: yup.string().notRequired().label("Expire date"),
})
const initialContentValue = ref({
  title: "content title",
  expiredate: "2024-10-10",
  description:
    "Mollit consectetur aute enim aliquip labore aliqua anim enim nulla aliqua. Id adipisicing elit id nulla do id nulla tempor. Commodo reprehenderit veniam sint adipisicing proident et do ad do enim et non adipisicing quis. Voluptate mollit laboris consectetur Lorem id. Occaecat nulla deserunt labore dolor aliqua.",
})
watch(files, (newv, oldv) => {
  console.log({ myfiles: get(newv) })
})
function onInvalidContent(ctx) {
  console.log(ctx.errors)
}
async function submit(values, { resetForm, setFieldError }) {
  console.log({ values })
  try {
    var result = await store.addContent(values)
    if (!result) {
      router.push("contents-index")
      toast.success("Content added successfully !")
    } else {
      for (const key in result) {
        setFieldError(key, result[key][0])
      }
      toast.error(`Can't add new content ${JSON.stringify(result)}`)
    }
  } catch (error) {
    console.log(error)
  }
  // resetForm()
}

async function closeModal(reset) {
  reset()
}
</script>

<style scoped></style>
