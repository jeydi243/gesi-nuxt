<template>
  <div class="flex flex-col justify-between">
    <div class="card row w-full mb-4 justify-between">
      <span class="text-4xl font-bold border-0 border-l-4 border-l-yellow-400 pl-2">Employees</span>
      <div class="row">
        <button @click.prevent="store.getAllEmployees" class="btn-primary mr-1">
          <Icon name="ion:school-sharp" class="h-5 w-5 text-white" />
        </button>
        <button @click="$router.push('employees-add')" class="btn-primary">
          <!-- <Icon name="solar:add-circle-bold" color="white" /> -->
          <Icon name="streamline:interface-add-1-expand-cross-buttons-button-more-remove-plus-add" color="white" />

          <span class="self-center ml-2">Add employee</span>
        </button>
      </div>
    </div>

    <div v-if="employees.length > 0" class="grid lg:grid-cols-5 md:grid-cols-3 xs:grid-cols-1 gap-4 auto-cols-min w-full h-full transition-transform duration-500 ease-in-out">

      <span v-for="(emp, index) in employees" :key="index" class="card-emp select-none" :data-index="index">
        <div class="p-1 flex flex-col items-center rounded-lg bg-white max-w-md">
          <div class="text-green-800 flex flex-row justify-between w-full items-center text-center">
            <div class="h-4 min-w-9 rounded-sm text-xs">
              <span class="px-3 my-1 bg-green-50 border-[1px] rounded-sm border-green-400 text-green-600" v-if="chance.bool()">Active</span>
              <span class="px-3 my-1 bg-red-50 border-[1px] border-red-400 rounded-sm text-red-600" v-else>Not active</span>
            </div>
            <button class="rounded-bl-sm h-7 w-7 dropdown" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              <Icon name="simple-line-icons:pencil" color="white" />
            </button>
            <ul class="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none" aria-labelledby="dropdownMenuButton1">
              <li>
                <a class="dropdown-item text-sm py-2 px-2 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100" href="#">
                  <Icon name="user" class="h-5 w-5 text-white" />Voir le profile
                </a>
              </li>
              <li>
                <a class="dropdown-item text-sm py-2 px-2 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100" href="#">
                  <Icon name="simple-line-icons:pencil" color="white" />Send Email
                </a>
              </li>
              <li>
                <a class="dropdown-item text-sm py-2 px-2 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100" href="#" @click="$router.push('employees-update')">
                  <Icon name="simple-line-icons:pencil" color="white" />Edit
                </a>
              </li>
            </ul>
          </div>
          {{ emp._id }}
          <div class="rounded-full bg-green-50 h-16 w-16 cursor-pointer overflow-clip" @click="$router.push({ 'name': 'employees-details', params: { id: emp._id } })">
            <img :src="`http://localhost:3000/resources/file/${emp.images![0]}`" class="object-cover" />
          </div>
          <span class="text-lg font-bold">{{ emp.gender == "M" ? "M. " : "Ms. " }}{{ firstUpper(emp.lastname ?? "") }}</span>
          <span class="text-lg">{{ firstUpper(emp!.position![0]) }} </span>
          <div class="rounded-lg bg-blue-50 col p-2 w-full">
            <div class="flex flex-col mb-4">
              <span class="text-gray-500">Departement</span>
              <span class="text-gray-800 font-bold">Soudure </span>
            </div>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z" />
              </svg>
              <Icon name="ion:ios-search-strong" class="h-5 w-5 text-white" /> {{ emp.emails }}
            </span>
            <span>
              <Icon name="ion:ios-search-strong" class="h-5 w-5 text-white" /> {{ emp.telephones![0] }}
            </span>
          </div>
        </div>
      </span>

    </div>
    <div v-else class="col align-center justify-center">
      <img src="~/assets/img/clip-2.png" class="flex z-10 cursor-pointer self-center align-center object-cover rounded-full h-1/2 w-1/2" />
      <span class="text-center text-2xl">Nothing to show here.</span>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useManagement } from "@/store/management"

definePageMeta({
  layout: "management",
});

const store = useManagement()

const employees = computed(() => store.employees)
</script>

<style scoped></style>
