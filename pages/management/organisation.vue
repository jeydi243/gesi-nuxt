<template>
    <div class="grid grid-cols-4 gap-4 min-h-full">
        <div class="col bg-white p-2 h-full rounded-md ml-3 hover:shadow-lg transition-all duration-700">
            <div v-for="({ name, code }, key) in classes" class="hover:bg-blue-200 pt-2 pl-2 pb-2 hover:bg-opacity-5 h-[55px] w-full cursor-default rounded-lg hover:outline-1 hover transition-all duration-1000">
                <p><strong>{{ name }}</strong></p>
                <h1 class="text-xs">{{ code }}</h1>
            </div>
        </div>
        <div class="col-span-3 bg-white p-2 h-full rounded-md ml-3 hover:shadow-lg transition-all duration-700">
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

                                    <tr>
                                        <td class="py-3 pl-4">
                                            <div class="flex items-center h-5">
                                                <input id="hs-table-checkbox-2" type="checkbox" class="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800">
                                                <label for="hs-table-checkbox-2" class="sr-only">Checkbox</label>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">Jim Green</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">27</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">London No. 1 Lake Park</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <a class="text-blue-500 hover:text-blue-700" href="#">Delete</a>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="py-3 pl-4">
                                            <div class="flex items-center h-5">
                                                <input id="hs-table-checkbox-3" type="checkbox" class="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800">
                                                <label for="hs-table-checkbox-3" class="sr-only">Checkbox</label>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">Joe Black</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">31</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">Sidney No. 1 Lake Park</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <a class="text-blue-500 hover:text-blue-700" href="#">Delete</a>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="py-3 pl-4">
                                            <div class="flex items-center h-5">
                                                <input id="hs-table-checkbox-4" type="checkbox" class="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800">
                                                <label for="hs-table-checkbox-4" class="sr-only">Checkbox</label>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">Edward King</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">16</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">LA No. 1 Lake Park</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <a class="text-blue-500 hover:text-blue-700" href="#">Delete</a>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="py-3 pl-4">
                                            <div class="flex items-center h-5">
                                                <input id="hs-table-checkbox-5" type="checkbox" class="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800">
                                                <label for="hs-table-checkbox-5" class="sr-only">Checkbox</label>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">Jim Red</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">45</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">Melbourne No. 1 Lake Park</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <a class="text-blue-500 hover:text-blue-700" @click="openModal">Delete</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Dialog as="div" @close="closeModal" class="relative z-10">
        <TransitionChild
                         as="template"
                         enter="duration-300 ease-out"
                         enter-from="opacity-0"
                         enter-to="opacity-100"
                         leave="duration-200 ease-in"
                         leave-from="opacity-100"
                         leave-to="opacity-0">
            <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
            <div
                 class="flex min-h-full items-center justify-center p-4 text-center">
                <TransitionChild
                                 as="template"
                                 enter="duration-300 ease-out"
                                 enter-from="opacity-0 scale-95"
                                 enter-to="opacity-100 scale-100"
                                 leave="duration-200 ease-in"
                                 leave-from="opacity-100 scale-100"
                                 leave-to="opacity-0 scale-95">
                    <DialogPanel
                                 class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <DialogTitle
                                     as="h3"
                                     class="text-lg font-medium leading-6 text-gray-900">
                            Payment successful
                        </DialogTitle>
                        <div class="mt-2">
                            <p class="text-sm text-gray-500">
                                Your payment has been successfully submitted. We’ve sent you
                                an email with all of the details of your order.
                            </p>
                        </div>

                        <div class="mt-4">
                            <button
                                    type="button"
                                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    @click="closeModal">
                                Got it, thanks!
                            </button>
                        </div>
                    </DialogPanel>
                </TransitionChild>
            </div>
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import { useConfig } from '~/store/config';
import { useManagement } from '~/store/management';
definePageMeta({
    layout: "management",
});
const management = useManagement()
const classes = computed(() => management.classes)
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'

const isOpen = ref(true)

function closeModal() {
    isOpen.value = false
}
function openModal() {
    isOpen.value = true
}
</script>

<style scoped></style>