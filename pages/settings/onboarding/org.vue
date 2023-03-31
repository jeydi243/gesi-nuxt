<template>
  <div class="row h-full w-full bg-white absolute">
    <div class="row relative bg-teal-500 center text-center w-1/3 justify-center items-center h-full top-0 left-0">
      <!-- <svg xmlns="http://www.w3.org/2000/svg" class="h-full absolute top-0 left-0 z-0 rounded-md bg-clip-content overflow-clip" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 700 700" width="700" height="700">
				<defs>
					<linearGradient gradientTransform="rotate(-150, 0.5, 0.5)" x1="50%" y1="0%" x2="50%" y2="100%" id="gggrain-gradient2">
						<stop stop-color="hsla(51, 99%, 65%, 1)" stop-opacity="1" offset="-0%"></stop>
						<stop stop-color="rgba(255,255,255,0)" stop-opacity="0" offset="100%"></stop>
					</linearGradient>
					<linearGradient gradientTransform="rotate(150, 0.5, 0.5)" x1="50%" y1="0%" x2="50%" y2="100%" id="gggrain-gradient3">
						<stop stop-color="hsl(227, 100%, 50%)" stop-opacity="1"></stop>
						<stop stop-color="rgba(255,255,255,0)" stop-opacity="0" offset="100%"></stop>
					</linearGradient>
					<filter id="gggrain-filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
						<feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="2" seed="2" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
						<feColorMatrix type="saturate" values="0" x="0%" y="0%" width="100%" height="100%" in="turbulence" result="colormatrix"></feColorMatrix>
						<feComponentTransfer x="0%" y="0%" width="100%" height="100%" in="colormatrix" result="componentTransfer">
							<feFuncR type="linear" slope="3"></feFuncR>
							<feFuncG type="linear" slope="3"></feFuncG>
							<feFuncB type="linear" slope="3"></feFuncB>
						</feComponentTransfer>
						<feColorMatrix
							x="0%"
							y="0%"
							width="100%"
							height="100%"
							in="componentTransfer"
							result="colormatrix2"
							type="matrix"
							values="1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 19 -11"
						></feColorMatrix>
					</filter>
				</defs>
				<g>
					<rect width="100%" height="100%" fill="hsl(173, 80%, 40%)"></rect>
					<rect width="100%" height="100%" fill="url(#gggrain-gradient3)"></rect>
					<rect width="100%" height="100%" fill="url(#gggrain-gradient2)"></rect>
					<rect width="100%" height="100%" fill="transparent" filter="url(#gggrain-filter)" opacity="1" style="mix-blend-mode: soft-light"></rect>
				</g>
			</svg> -->
      <img :src="require('@/assets/img/global_child.png')" class="flex z-10 absolute cursor-pointer self-center align-center object-cover rounded-full h-1/2 w-1/2" />
    </div>
    <div class="col h-full w-2/3 p-6">
      <span class="text-cyan-700 text-4xl text-center font-bold">Great Learning, Great Organization</span>
      <div class="col justify-center grow items-center">
        <Form class="w-1/3" @submit="submit" v-slot="{ isSubmitting }">
          <Field name="name" placeholder="Great organization name" class="form-input w-full mb-4"></Field>
          <ErrorMessage name="name" v-slot="{ message }">
            <p class="input-error">{{ message }}</p>
          </ErrorMessage>

          <Field name="code" v-slot="{ field, errorMessage }">
            <div class="relative group">
              <textarea v-bind="field" id="code" required class="input-textarea peer" rows="4"></textarea>
              <label for="code" class="placeholder-label">Code </label>
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

          <div class="row-reverse h-1/2 w-full items-center justify-between mt-5">
            <!-- <button class="btn-unstate" @click.prevent.stop="closeModal">Cancel</button> -->
            <button type="submit" class="btn-primary">
              <span class="font-bold text-white" v-if="!isSubmitting">Continue</span>
              <CirclesToRhombusesSpinner :size="25" class="text-white" v-if="isSubmitting" />
            </button>
          </div>
        </Form>
      </div>
      <span class="text-center"
        >By clicking on <a href="#!" class="text-indigo-600 hover:text-blue-700 transition duration-300 ease-in-out">Continue</a> , you accept <a href="#!" class="text-indigo-600 hover:text-blue-700 transition duration-300 ease-in-out">The term of use</a> and
        <a href="#!" class="text-indigo-600 hover:text-blue-700 transition duration-300 ease-in-out">Data processing agreement</a></span
      >
    </div>
  </div>
</template>

<script setup>
import { Form, ErrorMessage, Field } from "vee-validate"
import { useConfig } from "@/store/config"
import { useOrganization } from "@/store/organization"
import { ref } from "vue"
import { onBeforeRouteLeave, useRouter } from "vue-router"
import { toast } from "@/utils/utils"

const store = useOrganization()
const router = useRouter()

onBeforeRouteLeave((to, from) => {
  const answer = window.confirm("Do you really want to leave? you have unsaved changes!")
  // cancel the navigation and stay on the same page
  if (!answer) return false
})

function submit(values) {
  try {
    const result = store.addOrg(values)
    if (result) {
      toast("J'ai reussi")
      router.push("/")
    }
  } catch (error) {
    console.log(error)
  }
}
</script>
<style lang="scss" scoped></style>
