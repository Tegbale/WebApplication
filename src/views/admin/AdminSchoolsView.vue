<template>
  <ApplayoutView>
    <div>
      <div class="flex justify-between items-end pt-20">
        <BasePageTitle
          pageTitle="Schools"
          :showBtn="true"
          btnText="Add School"
          @clicked="handleModalAction"
        />

        <!-- export dropdown button for mobie devices only -->
        <ExportBtnDropdown
          class="block md:hidden mt-4"
          ref="dropdownRef"
          :show-dropdown="showDropdown"
          @show-dropdown="showDropdown = !showDropdown"
        />
      </div>

      <BaseDataTable class="hidden md:block">
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
              <!-- Dropdown menu -->

              <ExportBtnDropdown
                ref="dropdownRef"
                :show-dropdown="showDropdown"
                @show-dropdown="handleShowDropdown"
              />
            </th>
          </tr>
        </template>
        <template #table-body>
          <template v-if="SchoolLists.length > 0">
            <tr
              class="border-b-2 border-gray-100 hover:bg-gray-50"
              v-for="school in SchoolLists"
              :key="school.id"
            >
              <td class="p-3 text-sm text-tegbale-text-gray font-roboto">
                {{ school.id }}
              </td>
              <td
                class="p-3 text-sm text-blue-700 font-roboto hover:text-blue-900 hover:underline"
              >
                <router-link
                  :to="{
                    name: 'schoolsDetails',
                    params: { id: school.id },
                  }"
                  >{{ school.schoolName }}</router-link
                >
              </td>
              <td class="p-3 text-sm text-tegbale-text-gray font-roboto">
                {{ school.schoolAdmin }}
              </td>
              <td class="p-3 text-sm text-tegbale-text-gray font-roboto">
                {{ school.schoolEmail }}
              </td>
              <td class="flex justify-end p-3 space-x-2">
                <button
                  @click="handleViewSchool(school.id)"
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
                  @click="handleEditSchool(school.id)"
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
              class="flex items-center justify-center text-center h-52 text-tegbale-text-gray text-xl font-roboto font-medium"
            >
              No School has been added
            </td>
          </tr>
        </template>
      </BaseDataTable>

      <!-- Mobile design  -->
      <template v-if="SchoolLists.length > 0">
        <div
          class="grid grid-auto-fit gap-4 md:hidden pt-4"
          v-for="school in SchoolLists"
          :key="school.id"
        >
          <BaseMobileDataTable
            :column-one-text="school.schoolName"
            :column-two-text="school.schoolAdmin"
            :column-three-text="school.schoolEmail"
            :to="{
              name: 'schoolsDetails',
              params: { id: school.id },
            }"
            :is-clickable="true"
            column-one-title="School Name"
            column-two-title="Admin"
            column-three-title="Email"
          >
            <template #button>
              <button
                @click="handleViewSchool(school.id)"
                class="flex items-center text-xs px-2 py-1 space-x-2 text-blue-700 font-bold border bg-blue-200 hover:bg-blue-900 hover:text-yellow-100 rounded-full"
              >
                <span class="">view</span>
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
                @click="handleEditSchool(school.id)"
                class="flex items-center text-xs px-2 py-1 space-x-2 text-green-700 font-bold border bg-green-200 hover:bg-green-500 hover:text-white rounded-full"
              >
                <span class="">edit</span>
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
                class="flex items-center text-xs px-2 py-1 space-x-2 text-red-700 font-bold border bg-red-200 hover:bg-red-700 hover:text-red-200 rounded-full"
              >
                <span class="">delete</span>
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
            </template>
          </BaseMobileDataTable>
        </div>
      </template>
      <div class="block md:hidden justify-center items-center px-6 py-2" v-else>
        <NoDataCard />
      </div>
    </div>
  </ApplayoutView>
  <BaseModal :modalActive="modalActive" :closeMode="closeModal">
    <template #title>
      <div class="flex justify-between items-center">
        <h3 class="text-lg md:text-2xl font-medium font-roboto text-black">
          {{ modalTitle }}
        </h3>
        <button @click="closeModal" class="p-2 hover:bg-gray-200 rounded-full">
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </template>
    <template #form>
      <div>
        <p class="text-sm font-medium font-roboto">School Information</p>
        <div class="grid grid-auto-fit gap-3">
          <div>
            <BaseInput
              label="School Name"
              placeholder="Enter School Name"
              type="text"
              class="w-full"
              :modalInput="true"
              v-model="addSchoolData.schoolname"
            />
          </div>
          <div>
            <BaseInput
              label="School Location"
              placeholder="Enter School Location"
              type="text"
              class="w-full"
              :modalInput="true"
              v-model="addSchoolData.schoollocation"
            />
          </div>
        </div>
      </div>
      <div class="pt-5">
        <p class="text-sm font-medium font-roboto">Admin Information</p>
        <div class="grid grid-auto-fit gap-3">
          <div>
            <BaseInput
              label="Name"
              placeholder="Enter Admin Name"
              type="text"
              class="w-full"
              :modalInput="true"
              v-model="addSchoolData.adminname"
            />
          </div>
          <div>
            <BaseInput
              label="Email Address"
              placeholder="Enter School email"
              type="email"
              class="w-full"
              :modalInput="true"
              v-model="addSchoolData.adminemail"
            />
          </div>
        </div>
      </div>
    </template>
    <template #button>
      <div
        class="block md:flex items-center md:justify-end md:space-x-4 space-y-3 md:space-y-0 py-10"
      >
        <button
          :loading="isLoading"
          v-if="modalTitle == 'View School'"
          class="inline-flex bg-red-600 text-white font-medium font-roboto py-2 px-16 w-full md:max-w-fit rounded-3xl hover:bg-red-400"
        >
          <p class="flex items-center" v-if="isLoading">
            <svg
              class="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </p>
          <span v-else>Delete School</span>
        </button>
        <button
          @click="closeModal"
          class="bg-tegbale-text-gray text-white font-medium font-roboto py-2 px-16 w-full md:max-w-fit rounded-3xl hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          @click="addSchool"
          :loading="isLoading"
          class="inline-flex bg-tegbale-blue text-white font-medium font-roboto py-2 px-10 w-full md:max-w-fit rounded-3xl hover:bg-blue-900"
        >
          <p class="flex items-center" v-if="isLoading">
            <svg
              class="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </p>
          <span v-else>{{
            modalTitle == "Add School" ? "Add School" : "Save Changes"
          }}</span>
        </button>
      </div>
    </template>
  </BaseModal>
</template>

<script setup>
import ApplayoutView from "../ApplayoutView.vue";
import BasePageTitle from "@/components/BaseComponents/BasePageTitle.vue";
import BaseDataTable from "@/components/BaseComponents/BaseDataTable.vue";
import BaseMobileDataTable from "@/components/BaseComponents/BaseMobileDataTable.vue";
import BaseModal from "@/components/BaseComponents/BaseModal.vue";
import BaseInput from "@/components/BaseComponents/BaseInput.vue";
import { onClickOutside } from "@vueuse/core";

import { ref, computed, reactive } from "vue";
import ExportBtnDropdown from "@/components/exportBtnDropdown.vue";
import NoDataCard from "@/components/noDataCard.vue";

// import validation plugin
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";

// import store
import { useSchoolStore } from "@/stores/school-store";
//import { useToastStore } from "@/stores/toast-store";

// declare the stores
const schStore = useSchoolStore();
//const toastStore = useToastStore();

const isLoading = ref(false);
const showDropdown = ref(false);
const modalActive = ref(false);
const SchoolLists = ref([
  {
    id: 1,
    schoolName: "Emma Johnson group of schools",
    schoolAdmin: "Precious Ogbodo",
    schoolEmail: "emmajayschools@gmail.com",
  },
  {
    id: 2,
    schoolName: "Emma Johnson group of schools",
    schoolAdmin: "Precious Ogbodo",
    schoolEmail: "soyabeans@yahoo.com",
  },
]);

const dropdownRef = ref(null);
const isEditing = ref(false);
const isCreating = ref(false);

const addSchoolData = reactive({
  schoolname: "",
  schoollocation: "",
  adminname: "",
  adminemail: "",
});

// validation rules

const rules = {
  schoolname: {
    required: helpers.withMessage("School name is required", required),
  },
  schoollocation: {
    required: helpers.withMessage("Location is required", required),
  },
  adminname: {
    required: helpers.withMessage("Name is required", required),
  },
  adminemail: {
    required: helpers.withMessage("Email is required", required),
    email: helpers.withMessage("Email is invalid", email),
  },
};

// validate the add school data
const v$ = useVuelidate(rules, addSchoolData);

// add a school
const addSchool = async () => {
  isLoading.value = true;
  const result = await v$.value.$validate();
  if (result) {
    const data = {
      name: addSchoolData.schoolname,
      contact_email: addSchoolData.adminemail,
      contact_name: addSchoolData.adminname,
      location: addSchoolData.schoollocation,
    };

    console.log(data);

    try {
      const response = await schStore.addSchool(data);

      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }
};

onClickOutside(dropdownRef, () => {
  showDropdown.value = false;
});

const handleShowDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const handleModalAction = () => {
  isCreating.value = true;
  modalActive.value = !modalActive.value;
};

const closeModal = () => {
  modalActive.value = false;
  isEditing.value = false;
  isCreating.value = false;
};

const handleEditSchool = (id) => {
  isEditing.value = true;
  modalActive.value = !modalActive.value;
  console.log(id);
};

const handleViewSchool = (id) => {
  isEditing.value = false;
  isCreating.value = false;
  modalActive.value = !modalActive.value;

  console.log(id);
};

// computed properties
const modalTitle = computed(() => {
  if (isEditing.value) {
    return "Edit School";
  } else if (isCreating.value) {
    return "Add School";
  } else {
    return "View School";
  }
});
</script>

<style lang="scss" scoped></style>
