import { Nitro } from "nitropack"
import mongoose from "mongoose"

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig()
  try {
    await mongoose.connect(config.MONGO_URI_DEV)
  } catch (e) {
    console.error(e)
  }
})