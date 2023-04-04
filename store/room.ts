import { defineStore } from "pinia"

export const useRoom = defineStore("room", {
  state: () => ({ room: "" }),
})
