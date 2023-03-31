import { ref } from "vue"
import { gsap } from "gsap"
// import { useToast } from "vue-toastification"
import { useToast } from "vue-toastification/composition/nuxt";
import router from "@/router"
import Chance from "chance"

export const src = ref(null)
export const toast = useToast()
export const chance = Chance()
export function onFileChange(event) {
	if (event.target.files && event.target.files[0]) {
		src.value = window.URL.createObjectURL(event.target.files[0])
		window.URL.revokeObjectURL(event.target.files[0]) // free memory
	} else {
		src.value = null
	}
}
export function pickFile(idInput) {
	const file_input = document.getElementById(idInput)
	file_input.click()
	file_input.addEventListener("change", onFileChange)
}
export function onEnter(el, done) {
	gsap.to(el, {
		opacity: 1,
		duration: 2,
		x: 0,
		delay: el.dataset.index * 0.25,
		onComplete: done,
	})
}
export function onLeave(el, done) {
	gsap.to(el, {
		opacity: 0,
		duration: 2,
		x: -50,
		delay: el.dataset.index * 0.25,
		onComplete: done,
	})
}
export function onLeaveTop(el, done) {
	gsap.to(el, {
		duration: 1,
		height: 0,
		delay: el.dataset.index * 0.25,
		onComplete: done,
	})
}
export function onBeforeEnter(el, done) {
	gsap.to(el, {
		opacity: 0,
		x: -20,
		delay: el.dataset.index * 0.25,
		onComplete: done,
	})
}
export function beforeEnterList(el, done) {
	gsap.to(el, {
		opacity: 0,
		y: -40,
		rotationZ: -10,
		delay: el.dataset.index * 0.15,
		onComplete: done,
	})
}
export function leaveList(el, done) {
	gsap.to(el, {
		opacity: 0,
		duration: 2,
		rotationZ: -10,
		y: -20,
		delay: el.dataset.index * 0.15,
		onComplete: done,
	})
}
export function enterList(el, done) {
	gsap.to(el, {
		opacity: 1,
		duration: 2,
		rotationZ: 0,
		y: 0,
		delay: el.dataset.index * 0.15,
		onComplete: done,
	})
}
export async function goto(to = null, data = null) {
	if (data != null) {
		await router.push({ name: to, params: { id: data } })
	} else if (to == null) {
		await router.back()
	} else {
		console.log({ to })
		await router.push({ name: to })
	}
}
