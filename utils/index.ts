import { ref } from "vue"
import { gsap } from "gsap"
import Chance from "chance"
// import { useToast } from "vue-toastification";

export const src: string | null = null
// export const toast = useToast()
const router = useRouter()
export const chance = Chance()
export function onFileChange(event: any) {
  if (event.target.files && event.target.files[0]) {
    src = window.URL.createObjectURL(event.target.files[0])
    window.URL.revokeObjectURL(event.target.files[0]) // free memory
  } else {
    src = null
  }
}
export function pickFile(idInput: string) {
  const file_input: HTMLElement | null = document.getElementById(idInput)
  file_input?.click()
  file_input?.addEventListener("change", onFileChange)
}
export function onEnter(el: HTMLElement | null, done: any) {
  gsap.to(el, {
    opacity: 1,
    duration: 2,
    x: 0,
    delay: Number(el?.dataset?.index) * 0.25,
    onComplete: done,
  })
}
export function onLeave(el: HTMLElement | null, done: any) {
  gsap.to(el, {
    opacity: 0,
    duration: 2,
    x: -50,
    delay: Number(el?.dataset.index) * 0.25,
    onComplete: done,
  })
}
export function onLeaveTop(el: HTMLElement, done: any) {
  gsap.to(el, {
    duration: 1,
    height: 0,
    delay: Number(el!.dataset!.index) * 0.25,
    onComplete: done,
  })
}
export function onBeforeEnter(el: HTMLElement, done: any) {
  gsap.to(el, {
    opacity: 0,
    x: -20,
    delay: Number(el?.dataset?.index) * 0.25,
    onComplete: done,
  })
}
export function beforeEnterList(el: HTMLElement | null, done: any) {
  gsap.to(el, {
    opacity: 0,
    y: -40,
    rotationZ: -10,
    delay: Number(el?.dataset?.index) * 0.15,
    onComplete: done,
  })
}
export function leaveList(el: HTMLElement | null, done: any) {
  gsap.to(el, {
    opacity: 0,
    duration: 2,
    rotationZ: -10,
    y: -20,
    delay: Number(el?.dataset?.index) * 0.15,
    onComplete: done,
  })
}
export function enterList(el: HTMLElement | null, done: any) {
  gsap.to(el, {
    opacity: 1,
    duration: 2,
    rotationZ: 0,
    y: 0,
    delay: Number(el?.dataset?.index) * 0.15,
    onComplete: done,
  })
}
export async function goto(to: string, data = null) {
  if (data != null) {
    await router.push({ name: to, params: { id: data } })
  } else if (to == null) {
    await router.back()
  } else {
    console.log({ to })
    await router.push({ name: to })
  }
}
