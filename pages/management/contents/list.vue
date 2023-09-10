<template>
  <div>
    <div class="row w-full justify-end mb-2">
      <button @click="router.push('contents-add')" class="btn-primary"><box-icon name="plus" color="white"></box-icon>Add Content</button>
    </div>
    <div class="justify-start items-start flex-wrap row space-x-2 space-y-4">

      <div class="grid grid-cols-4 gap-2 justify-center items-center">
        <article v-for="(item, index) in contents" :key="index" class="overflow-hidden rounded-lg bg-white border border-gray-100 shadow-sm">
          <img alt="Office" :src="`~/assets/img/contents/${index + 1}.jpg`" class="h-48 w-full object-cover" />

          <div class="p-2 sm:p-3">
            <a href="#">
              <h3 class="text-lg font-medium text-gray-900">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
            </a>

            <p class="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-3">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dolores, possimus pariatur animi temporibus nesciunt praesentium dolore sed nulla ipsum eveniet corporis quidem, mollitia itaque minus soluta, voluptates neque explicabo tempora nisi culpa eius atque dignissimos.
              Molestias explicabo corporis voluptatem?
            </p>

            <a href="#" @click="$router.push('contents-details')" class="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
              Find out more
              <span aria-hidden="true" class="block transition group-hover:translate-x-0.5"> &rarr; </span>
            </a>
            <NuxtLink to="/employees/1" tag="div">
              <p class="ml-2 text-sm text-black">By {{ chance.name() }}</p>
            </NuxtLink>
          </div>
          <footer class="flex items-center justify-start leading-none bottom-0 left-0 p-2 h-[20%] w-full">
            <img @click="$router.push(`/employees/${item.authors[0]}`)" class="block avatar rounded-full" :src="`https://mdbcdn.b-cdn.net/img/new/avatars/${rand(20)}.webp`" />
            <NuxtLink :to="`/employees/${index}`" class="flex cursor-pointer items-center no-underline hover:underline text-black">
              <p class="ml-2 text-sm text-black">By {{ chance.name() }}</p>
            </NuxtLink>

            <a class="no-underline text-grey-darker hover:text-red-dark" href="#">
              <span class="ml-2">{{ chance.name() }}</span>
              <i class="fa fa-heart"></i>
            </a>
          </footer>
        </article>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { UseImage } from "@vueuse/components"
import { storeToRefs } from "pinia"
import { useContents } from "~/store/contents"

const store = useContents()
const router = useRouter()
const contents = computed(() => store.contents)

function rand(max) {
  return Math.floor(Math.random() * max)
}
</script>

<style lang="css" scoped></style>
