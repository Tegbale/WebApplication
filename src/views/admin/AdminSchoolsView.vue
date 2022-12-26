<template>
  <div>
    <ApplayoutView>
      <div>
        <BasePageTitle
          pageTitle="Schools"
          :showBtn="true"
          btnText="Add School"
          @clicked="handleModalAction"
        />
        <div>
          <BaseDataTable>
            <template #table-header>
              <tr>
                <th
                  class="p-3 text-sm font-semibold tracking-wide text-left text-tegbale-text-gray"
                >
                  S/N
                </th>
                <th
                  class="p-3 text-sm font-semibold tracking-wide text-left text-tegbale-text-gray"
                >
                  Name
                </th>
                <th
                  class="p-3 text-sm font-semibold tracking-wide text-left text-tegbale-text-gray"
                >
                  Admin
                </th>
                <th
                  class="p-3 text-sm font-semibold tracking-wide text-left text-tegbale-text-gray"
                >
                  Email Address
                </th>
                <th class="flex flex-col p-3">
                  <div ref="dropdownRef" v-if="SchoolLists.length > 0">
                    <button
                      class="relative text-white bg-tegbale-blue hover:bg-blue-900 focus:outline-none font-medium rounded-lg text-sm px-4 py-1 text-center inline-flex items-center justify-self-end"
                      type="button"
                      @click="handleShowDropdown"
                    >
                      Export
                      <svg
                        class="ml-2 w-4 h-4"
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>
                    <!-- Dropdown menu -->
                    <div
                      v-if="showDropdown"
                      class="absolute z-10 w-44 mt-2 bg-white rounded divide-y divide-gray-100 shadow"
                    >
                      <ul
                        class="py-1 text-sm text-gray-700"
                        aria-labelledby="dropdownDefault"
                      >
                        <li>
                          <a href="#" class="block py-2 px-4 hover:bg-gray-100"
                            >PDF</a
                          >
                        </li>
                        <li>
                          <a href="#" class="block py-2 px-4 hover:bg-gray-100"
                            >XLS</a
                          >
                        </li>
                        <li>
                          <a href="#" class="block py-2 px-4 hover:bg-gray-100"
                            >CSV</a
                          >
                        </li>
                      </ul>
                    </div>
                  </div>
                </th>
              </tr>
            </template>
            <template #table-body>
              <template v-if="SchoolLists.length > 0">
                <tr
                  class="border-b-2 border-gray-100"
                  v-for="school in SchoolLists"
                  :key="school.id"
                >
                  <td class="p-3 text-sm text-tegbale-text-gray font-roboto">
                    {{ school.id }}
                  </td>
                  <td class="p-3 text-sm text-tegbale-text-gray font-roboto">
                    {{ school.schoolName }}
                  </td>
                  <td class="p-3 text-sm text-tegbale-text-gray font-roboto">
                    {{ school.schoolAdmin }}
                  </td>
                  <td class="p-3 text-sm text-tegbale-text-gray font-roboto">
                    {{ school.schoolEmail }}
                  </td>
                  <td class="flex justify-end p-3 space-x-2">
                    <button
                      class="text-sm p-1 text-blue-700 font-bold hover:bg-blue-200 hover:rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </button>
                    <button
                      class="text-sm p-1 text-tegbale-green font-bold hover:bg-green-200 hover:rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                    </button>
                    <button
                      class="text-sm p-1 text-red-700 font-bold hover:bg-red-200 hover:rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              </template>
              <tr v-else>
                <td
                  colspan="5"
                  class="text-center h-52 text-tegbale-text-gray text-xl font-roboto font-medium"
                >
                  No School has been added
                </td>
              </tr>
            </template>
          </BaseDataTable>
        </div>
      </div>
    </ApplayoutView>
    <OnClickOutside @trigger="closeModal">
      <BaseModal :modalActive="modalActive" @close-modal="closeModal">
        <h1>
          Hello from modalsdddddddddddddddddddd dfffffffffffffffffffffffffff
          ffffffffffffffffffffffffffffffffffffffffffffff
          ffffffffffffffffffffffffffffffffffffffffffffffffffff
          dddddddddddddddddddddddddddddddddd
        </h1>
      </BaseModal>
    </OnClickOutside>
  </div>
</template>

<script setup>
import ApplayoutView from "../ApplayoutView.vue";
import BasePageTitle from "@/components/BaseComponents/BasePageTitle.vue";
import BaseDataTable from "@/components/BaseComponents/BaseDataTable.vue";
import BaseModal from "@/components/BaseComponents/BaseModal.vue";
import { onClickOutside } from "@vueuse/core";
import { OnClickOutside } from "@vueuse/components";
import { ref } from "vue";

const showDropdown = ref(false);
const modalActive = ref(null);
const SchoolLists = ref([
  // {
  //   id: 1,
  //   schoolName: "Emma Johnson group of schools",
  //   schoolAdmin: "Precious Ogbodo",
  //   schoolEmail: "emmajayschools@gmail.com",
  // },
  // {
  //   id: 2,
  //   schoolName: "Emma Johnson group of schools",
  //   schoolAdmin: "Precious Ogbodo",
  //   schoolEmail: "soyabeans@yahoo.com",
  // },
]);

const dropdownRef = ref(null);

onClickOutside(dropdownRef, () => {
  showDropdown.value = false;
});

const handleShowDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const handleModalAction = () => {
  modalActive.value = !modalActive.value;
};

const closeModal = () => {
  modalActive.value = false;
};
</script>

<style lang="scss" scoped></style>
