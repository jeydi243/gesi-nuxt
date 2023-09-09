<template>
    <div class="grid grid-cols-4 gap-4 min-h-full">
        <div class="col bg-white p-2 h-full rounded-md ml-3 hover:shadow-lg transition-all duration-700">
            <div v-for="({ name, code }, key) in classes" class="hover:bg-blue-400 pt-2 pl-2 pb-2 hover:bg-opacity-5 h-[55px] w-full cursor-default rounded-lg hover:outline-1 hover transition-all duration-1000">
                <p><strong>{{ name }}</strong></p>
                <h1 class="text-xs">{{ code }}</h1>
            </div>
        </div>
        <div class="col-span-3 bg-white p-2 h-full rounded-md ml-3 hover:shadow-lg transition-all duration-700">
            <div class="flex flex-row-reverse mb-2">
                <button @click="openModal" class="btn-primary" data-hs-overlay="#drawerOP">
                    <Icon name="ion:school-sharp" class="h-5 w-5 text-white" />
                    <span class="self-center ml-2"> Add Lookups </span>
                </button>
            </div>
            <div class="flex flex-col">
                <div class="-m-1.5 overflow-x-auto">
                    <div class="p-1.5 min-w-full inline-block align-middle">
                        <div class=" rounded-lg overflow-hidden dark:border-gray-700">
                            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead class="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th scope="col" class="py-3 pl-4">
                                            <div class="flex items-center h-5">
                                                <input id="hs-table-checkbox-all" type="checkbox" class="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-200 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800">
                                                <label for="hs-table-checkbox-all" class="sr-only">Checkbox</label>
                                            </div>
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age</th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
                                        <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                                    <tr>
                                        <td class="py-3 pl-4">
                                            <div class="flex items-center h-5">
                                                <input id="hs-table-checkbox-1" type="checkbox" class="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800">
                                                <label for="hs-table-checkbox-1" class="sr-only">Checkbox</label>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">John Brown</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">45</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">New York No. 1 Lake Park</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <a class="text-blue-500 hover:text-blue-700" href="#">Delete</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="drawerOP" class="hs-overlay hs-overlay-open:translate-x-0 hidden translate-x-full fixed top-0 right-0 transition-all duration-700 transform h-full max-w-xs w-full z-[60] bg-white border-r dark:bg-white dark:border-gray-700" tabindex="-1">
            <div class="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                <h1 class="font-bold text-black ">
                    Add Lookups
                </h1>
                <button type="button" class="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white text-sm dark:text-gray-500 dark:hover:text-gray-400 dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800" data-hs-overlay="#drawerOP">
                    <span class="sr-only">Close modal</span>
                    <svg class="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" />
                    </svg>
                </button>
            </div>
            <div class="p-4">
                <Form class="col justify-between w-full space-y-4" @submit="addLookups" v-slot="{ isSubmitting, resetForm }" :validation-schema="lookupsSchema" :initial-values="initialLookupsValue" @invalid-submit="onInvalidLookups">
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
                        <button class="btn-unstate" @click.prevent.stop="resetForm()">Cancel</button>
                        <button type="submit" class="btn-primary">
                            <box-icon type="solid" name="file-plus" color="white"></box-icon>
                            <span class="font-bold text-white">Add</span>
                            <CirclesToRhombusesSpinner :size="5" color="#FFF" class="text-white" v-if="isSubmitting" />
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "management",
});
import { CirclesToRhombusesSpinner } from "epic-spinners"
import * as yup from "yup"
import { Form, Field } from "vee-validate"
import { useManagement } from '~/store/management';

import { InvalidSubmissionContext } from 'vee-validate';
import { useToast } from 'vue-toastification';
const store = useManagement()
const toast = useToast()

const initialLookupsValue = {
    _id: "",
    classe: "",
    parent_lookups_id: "",
    name: "",
    description: ""
}
const management = useManagement()
const classes = computed(() => management.classes)
const isOpen = ref(false)
const isSubmitting = ref(false)
const lookupsSchema = yup.object({
    _id: yup.string().required().label("ID"),
    classe: yup.string().required().label("Classe ID"),
    parent_lookups_id: yup.string().required().label("Parent Lookups ID"),
    name: yup.string().required().label("Name"),
    description: yup.string().required().label("Description")
})

async function addLookups(values, { resetForm, setFieldError }) {
    console.log({ values })
    try {
        var result = await store.addLookups(values)
        if (!result) {
            toast.success("Lookups added successfully !")
        } else {

            toast.error(`Can't add new content ${JSON.stringify(result)}`)
        }
    } catch (error) {
        console.log(error)
    }
}
function onInvalidLookups(ctx: InvalidSubmissionContext) {

}
function closeModal() {
    isOpen.value = false
}
function openModal() {
    isOpen.value = true
}
</script>

<style scoped></style>