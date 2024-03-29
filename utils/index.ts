import { ref } from "vue"
import { gsap } from "gsap"
import Chance from "chance"
export let src: string | null = null

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

export function onEnter(el: Element, done: any) {
  gsap.to(el, {
    opacity: 1,
    duration: 2,
    x: 0,
    delay: Number(el?.dataset?.index) * 0.25,
    onComplete: done,
  })
}
export function onLeave(el: Element | HTMLElement) {
  gsap.to(el, {
    opacity: 0,
    duration: 2,
    x: -50,
    delay: Number(el?.dataset.index) * 0.25,
    // onComplete: done,
  })
}

export function firstUpper(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function toiso(value: string) {
  return new Date(value).getFullYear()
}
export function onLeaveTop(el: Element) {
  gsap.to(el, {
    duration: 1,
    height: 0,
    delay: Number(el!.dataset!.index) * 0.25,
    // onComplete: done,
  })
}
export function onBeforeEnter(el: Element) {
  gsap.to(el, {
    opacity: 0,
    x: -20,
    delay: Number(el?.dataset?.index) * 0.25,
    // onComplete: done,
  })
}
export function beforeEnterList(el: Element | null) {
  gsap.to(el, {
    opacity: 0,
    y: -40,
    rotationZ: -10,
    delay: Number(el?.dataset?.index) * 0.15,
    // onComplete: done,
  })
}
export function leaveList(el: Element | null) {
  gsap.to(el, {
    opacity: 0,
    duration: 2,
    rotationZ: -10,
    y: -20,
    delay: Number(el?.dataset?.index) * 0.15,
    // onComplete: done,
  })
}
export function enterList(el: Element | null) {
  gsap.to(el, {
    opacity: 1,
    duration: 2,
    rotationZ: 0,
    y: 0,
    delay: Number(el?.dataset?.index) * 0.15,
    // onComplete: done,
  })
}
