<template>
  <div>
    <div>
      <div class="flex justify-between items-end space-x-2 pt-20">
        <BasePageTitle pageTitle="Teachers" :showBtn="true" btnText="Add Teacher" @clicked="handleModalAction" />
        <!-- export dropdown button for mobie devices only -->
        <ExportBtnDropdown class="flex md:hidden mb-0.5" ref="dropdownRef" :show-dropdown="showDropdown"
          @show-dropdown="showDropdown = !showDropdown" @select-file-type="dataExport" />
      </div>
      <div v-if="loadingData" class="flex justify-center items-center h-72">
        <svg aria-hidden="true" class="inline w-16 h-16 mr-2 text-white animate-spin fill-blue-600" viewBox="0 0 100 101"
          fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor" />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill" />
        </svg>
      </div>
      <div v-else>
        <BaseDataTable class="hidden md:block">
          <template #table-header>
            <tr>
              <th class="p-3 text-sm font-semibold tracking-wide text-left text-tegbale-text-gray">
                S/N
              </th>
              <th class="p-3 text-sm font-semibold tracking-wide text-left text-tegbale-text-gray">
                Name
              </th>
              <!-- <th
                class="p-3 text-sm font-semibold tracking-wide text-left text-tegbale-text-gray"
              >
                Head Teacher
              </th> -->
              <th class="p-3 text-sm font-semibold tracking-wide text-left text-tegbale-text-gray">
                Email Address
              </th>
              <th class="p-3 text-sm font-semibold tracking-wide text-left text-tegbale-text-gray">
                Classroom
              </th>
              <th class="flex flex-col p-3">
                <!-- Dropdown menu -->
                <ExportBtnDropdown ref="dropdownRef" :show-dropdown="showDropdown" @show-dropdown="handleShowDropdown"
                  @select-file-type="dataExport" />
              </th>
            </tr>
          </template>
          <template #table-body>
            <template v-if="TeacherLists && TeacherLists.length > 0">
              <tr class="border-b-2 border-gray-100 hover:bg-gray-50" v-for="(teacherItem, i) in TeacherLists"
                :key="teacherItem.id">
                <td class="p-3 text-sm text-tegbale-text-gray font-roboto">
                  {{ i + 1 }}
                </td>
                <td class="p-3 text-sm text-blue-700 font-roboto hover:text-blue-900 hover:underline">
                  <router-link :to="{
                    name: 'ClassroomDetails',
                    params: { id: teacherItem.id },
                  }">
                    {{ teacherItem.name }}
                  </router-link>
                </td>
                <td class="p-3 text-sm text-tegbale-text-gray font-roboto">
                  {{ teacherItem.head_teacher.full_name }}
                </td>
                <td class="p-3 text-sm text-tegbale-text-gray font-roboto">
                  {{ teacherItem.number_of_students }}
                </td>
                <td class="p-3 text-sm text-tegbale-text-gray font-roboto">
                  {{ teacherItem.number_of_teachers }}
                </td>
                <td class="flex justify-end p-3 space-x-2">
                  <button @click="handleViewTeacher(teacherItem.id)"
                    class="text-sm p-1 text-blue-700 font-bold hover:bg-blue-200 hover:rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                  <button @click="handleEditTeacher(teacherItem.id)"
                    class="text-sm p-1 text-tegbale-green font-bold hover:bg-green-200 hover:rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                  </button>
                  <button @click="handleDeleteTeacher(teacherItem.id)"
                    class="text-sm p-1 text-red-700 font-bold hover:bg-red-200 hover:rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </td>
              </tr>
            </template>
            <tr v-else>
              <td colspan="5" class="text-center py-6 h-52 text-tegbale-text-gray text-xl font-roboto font-medium">
                No Teacher has been added.
              </td>
            </tr>
          </template>
        </BaseDataTable>
        <!-- Mobile design  -->
        <template v-if="TeacherLists && TeacherLists.length > 0">
          <div class="grid grid-auto-fit gap-4 md:hidden pt-4" v-for="teacherItem in TeacherLists" :key="teacherItem.id">
            <BaseMobileDataTable :column-one-text="teacherItem.name" :column-two-text="teacherItem.head_teacher.full_name"
              :column-three-text="teacherItem.number_of_students" :not-clickable="true" column-one-title="Name"
              column-two-title="Email Address" column-three-title="Classroom">
              <template #button>
                <button @click="handleViewTeacher(teacherItem.id)"
                  class="flex items-center text-xs px-2 py-1 space-x-2 text-blue-700 font-bold border bg-blue-200 hover:bg-blue-900 hover:text-yellow-100 rounded-full">
                  <span class="">view</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
                <button @click="handleEditTeacher(teacherItem.id)"
                  class="flex items-center text-xs px-2 py-1 space-x-2 text-green-700 font-bold border bg-green-200 hover:bg-green-500 hover:text-white rounded-full">
                  <span class="">edit</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                  </svg>
                </button>
                <button @click="handleDeleteTeacher(teacherItem.id)"
                  class="flex items-center text-xs px-2 py-1 space-x-2 text-red-700 font-bold border bg-red-200 hover:bg-red-700 hover:text-red-200 rounded-full">
                  <span class="">delete</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
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
    </div>
    <BaseModal :modalActive="modalActive" :closeMode="closeModal">
      <template #title>
        <div class="flex justify-between items-center">
          <h3 class="text-lg md:text-2xl font-medium font-roboto text-black">
            {{ modalTitle }}
          </h3>
          <button @click="closeModal" class="p-2 hover:bg-gray-200 rounded-full hidden md:block">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </template>
      <template #form>
        <div class="pt-8 mx-1">
          <p class="text-sm font-medium font-roboto">class Information</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <BaseInput label="class Name" placeholder="Enter class Name" type="text" class="w-full"
                :disabled="modalTitle === 'View class'" :modalInput="true" v-model="singleClassDetails.name" />
              <span v-if="errors && errors.name && errors.name.length > 0" class="text-red-500 text-sm pl-4">
                {{ errors.name[0] }}
              </span>
            </div>
          </div>
        </div>
        <div class="pt-5 mx-1">
          <p class="text-sm font-medium font-roboto">
            Head Teacher Information
          </p>
          <div class="grid grid-auto-fit gap-3">
            <div>
              <label for="role" class="text-xs">Name</label>
              <div class="relative flex items-center text-gray-300 focus-within:text-tegbale-blue mb-1"
                :class="{ 'mt-1': modalInput }">
                <select v-model="singleClassDetails.head_teacher_id" :disabled="modalTitle === 'View class'"
                  class="border border-gray-300 rounded-2xl leading-5 mt-2 pr-3 pl-10 py-2 w-full hover:border-gray-400 focus:outline-none focus:border-none focus:ring-1 focus:border-gray-400 placeholder:text-[12px] placeholder:tracking-wide placeholder:opacity-50 placeholder:content-center text-black">
                  <option selected disabled value="">
                    Select Head Teacher
                  </option>

                  <option v-for="user in teacherStore.teachers.data" :value="user.id" :key="user.fullname">
                    {{ user.fullname }}
                  </option>
                </select>
              </div>
              <span v-if="errors &&
                errors.head_teacher_id &&
                errors.head_teacher_id.length > 0
                " class="text-red-500 text-sm pl-4">
                {{ errors.head_teacher_id[0] }}
              </span>
            </div>
          </div>
        </div>
      </template>
      <template #button>
        <div class="block md:flex items-center md:justify-end md:space-x-4 space-y-3 md:space-y-0 py-10">
          <button @click.prevent="triggerDeleteModal" :loading="isLoading" v-if="modalTitle == 'View class'"
            class="inline-flex justify-center bg-red-600 text-white font-medium font-roboto py-2 px-16 w-full md:max-w-fit rounded-3xl hover:bg-red-400">
            <p class="flex items-center" v-if="isLoading">
              <svg class="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              Loading...
            </p>
            <p v-else>Delete class</p>
          </button>
          <button @click="closeModal"
            class="bg-tegbale-text-gray text-white font-medium font-roboto py-2 px-16 w-full md:max-w-fit rounded-3xl hover:bg-gray-400">
            Cancel
          </button>
          <button @click="saveClassDetails" v-if="modalTitle !== 'View class'" :loading="isLoading"
            class="inline-flex justify-center bg-tegbale-blue text-white font-medium font-roboto py-2 px-10 w-full md:max-w-fit rounded-3xl hover:bg-blue-900">
            <p class="flex items-center" v-if="isLoading">
              <svg class="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              Loading...
            </p>
            <span v-else>{{
              modalTitle == "Add class" ? "Add class" : "Save Changes"
            }}</span>
          </button>
        </div>
      </template>
    </BaseModal>

    <BaseDeleteModal :modalActive="deleteActive">
      <template #title>
        <div class="flex items-center">
          <svg aria-hidden="true" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"></path>
          </svg>
          <span class="sr-only">Info</span>
          <h3 class="text-lg font-medium">Caution</h3>
        </div>
      </template>
      <template #form>
        <div class="mt-2 mb-4 text-sm sm:text-base">
          <p>Are You sure you want to Delete this?</p>
        </div>
      </template>
      <template #button>
        <div class="flex">
          <button type="button" @click.prevent="deleteData"
            class="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="-ml-0.5 mr-2 h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>

            Yes, Delete
          </button>
          <button type="button" @click.prevent="cancelDelete"
            class="text-red-800 bg-transparent border border-red-800 hover:bg-gray-50 hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center"
            data-dismiss-target="#alert-additional-content-2" aria-label="Close">
            No, Cancel
          </button>
        </div>
      </template>
    </BaseDeleteModal>
  </div>
</template>

<script setup>
import BasePageTitle from "@/components/BaseComponents/BasePageTitle.vue";
import BaseDataTable from "@/components/BaseComponents/BaseDataTable.vue";
import BaseDeleteModal from "@/components/BaseComponents/BaseDeleteModal.vue";
import BaseMobileDataTable from "@/components/BaseComponents/BaseMobileDataTable.vue";
import BaseModal from "@/components/BaseComponents/BaseModal.vue";
import BaseInput from "@/components/BaseComponents/BaseInput.vue";

import BaseSelectInput from "@/components/BaseComponents/BaseSelectInput.vue";
import { onClickOutside } from "@vueuse/core";

import { dataParser } from "@/helpers/export-data.js";

import { ref, computed, reactive, onMounted, defineEmits } from "vue";
import ExportBtnDropdown from "@/components/exportBtnDropdown.vue";
import NoDataCard from "@/components/NoDataCard.vue";

// import store
import { useClassroom } from "@/stores/classrooms";
import { useTeacher } from "@/stores/teachers";
import { useUserStore } from "@/stores/users";
import { useToastStore } from "@/stores/toast-store";

// define emit

const emit = defineEmits(["emitId"]);

// declare the stores
const classStore = useClassroom();
const teacherStore = useTeacher();
const usersStore = useUserStore();
const toastStore = useToastStore();

const isLoading = ref(false);
const isDeleting = ref(false);
const isSaving = ref(false);
const showDropdown = ref(false);
const modalActive = ref(false);
const TeacherLists = ref(null);
const loadingData = ref(false);
const deleteActive = ref(false);

const errors = ref(null);
const dropdownRef = ref(null);
const isEditing = ref(false);
const isCreating = ref(false);
const teacherId = ref(null);
const header = ref(["id", "Name", "Email Address", "Classroom"]);

const teacherData = reactive({
  name: "",
  head_teacher_id: null,
  studentCount: "",
  teacherCount: "",
});

const singleClassDetails = reactive({
  name: "",
  head_teacher_id: null,
});

const teachersArray = ref();

// validation rules
const saveClassDetails = async () => {
  try {
    if (modalTitle.value == "Add class") {
      isLoading.value = true;
      await classStore.createClassroom(singleClassDetails);
      await fetchAllClassrooms();

      modalActive.value = false;

      // call the toast store to show the toast
      toastStore.showToast({
        title: "Hurray!",
        message: "class added successfully",
        type: "success",
        timeout: 4000,
      });
    } else {
      isSaving.value = true;
      await classStore.updateClassroom(teacherId.value, singleClassDetails);
      await fetchAllClassrooms();
      modalActive.value = false;

      // call the toast store to show the toast
      toastStore.showToast({
        title: "Hurray!",
        message: "class updated successfully",
        type: "success",
        timeout: 4000,
      });
    }
  } catch (error) {
    // populate the error bag
    errors.value = error.fieldErrors;

    // call the toast store to show the toast
    toastStore.showToast({
      title: "Ooops!",
      message: error.message || "Unable to add or Update",
      type: "error",
      timeout: 4000,
    });
  } finally {
    isLoading.value = false;
    isSaving.value = false;
    // modalActive.value = false
  }
};

// handleDeleteTeacher
const handleDeleteTeacher = (id) => {
  deleteActive.value = true;
  teacherId.value = id;
};

// trigger the delete modal component
const triggerDeleteModal = () => {
  deleteActive.value = true;
};
// close the delete modal component
const cancelDelete = () => {
  deleteActive.value = false;
};

// delete teacherItem
const deleteData = async () => {
  isDeleting.value = true;

  try {
    const { data } = await classStore.deleteAClassroom(teacherId.value);
    // fetch the latest data of classroom
    await fetchAllClassrooms();
    console.log(data);
    // call the toast store to show the toast
    toastStore.showToast({
      title: "Hurray!",
      message: "class deleted successfully",
      type: "success",
      timeout: 4000,
    });
  } catch (error) {
    console.log(error);
    // call the toast store to show the toast
    toastStore.showToast({
      title: "Ooops!",
      message: "delete class failed",
      type: "error",
      timeout: 4000,
    });
  } finally {
    isDeleting.value = false;
    deleteActive.value = false;
  }
};

onClickOutside(dropdownRef, () => {
  showDropdown.value = false;
});

const handleShowDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const handleModalAction = async () => {
  isCreating.value = true;
  modalActive.value = !modalActive.value;
};

const closeModal = () => {
  modalActive.value = false;
  isEditing.value = false;
  isCreating.value = false;
};

const handleEditTeacher = async (id) => {
  teacherId.value = id;
  isEditing.value = true;
  modalActive.value = !modalActive.value;
  console.log(teacherId.value);
  try {
    const { data } = await classStore.fetchAClassroomById(id);
    singleClassDetails.head_teacher_id = data.head_teacher.id;
    singleClassDetails.name = data.name;

    // teacherData.teacherCount = data.number_of_teachers;
    // teacherData.studentCount = data.number_of_students;
    // teacherData.headTeacher = data.location;
    // teacherData.classname = data.name;
    // teacherId.value = data.id
  } catch (error) {
    console.log(error);
    // call the toast store to show the toast
    toastStore.showToast({
      title: "Ooops!",
      message: "Unable to Fetch class details",
      type: "error",
      timeout: 4000,
    });
  }
};

// fetch all schools
const fetchAllTeachers = async () => {
  loadingData.value = true;
  try {
    const res = await teacherStore.fetchAllTeachers();
    TeacherLists.value = res.data.data;
  } catch (error) {
    console.log(error);
    // call the toast store to show the toast
    toastStore.showToast({
      title: "Ooops!",
      message: error.message || "Unable to Fetch Teacher details",
      type: "error",
      timeout: 4000,
    });
  } finally {
    loadingData.value = false;
  }
};




// view a single teacher details
const handleViewTeacher = async (id) => {
  isEditing.value = false;
  isCreating.value = false;
  // await usersStore.getAllUsers();
  modalActive.value = !modalActive.value;

  try {
    const { data } = await teacherStore.fetchATeacherByID(id);
    console.log(JSON.stringify(data, null, 2))

  } catch (error) {
    console.log(error);
    // call the toast store to show the toast
    toastStore.showToast({
      title: "Ooops!",
      message: "Unable to Fetch Teacher details",
      type: "error",
      timeout: 4000,
    });
  }
};

// method to export data here..
const dataExport = (value) => {
  // declear the name of the document
  let docName = "Teachers";

  switch (value) {
    case "pdf":
      dataParser().generatePdf(rowArray.value, header.value, docName);

      break;
    case "csv":
      dataParser().exportDataFromJSON(TeacherLists.value, docName, value);

      break;
    default:
      // code block
      dataParser().exportDataFromJSON(TeacherLists.value, null, null);
  }
};

// computed properties
const modalTitle = computed(() => {
  if (isEditing.value) {
    return "Edit Teacher";
  } else if (isCreating.value) {
    return "Add Teacher";
  } else {
    return "View Teacher";
  }
});

// create a new array of nested arrays to use in generating pdf file
const rowArray = computed(() => {
  // remove the created_at key from each object in the TeacherLists array
  let newArray = TeacherLists.value.map(({ created_at, ...rest }) => {
    return rest;
  });

  // map through the newArray and create a new array of nested arrays
  return newArray.map((item) => {
    return Object.values(item);
  });
});

// mounted hook
onMounted(() => {
  fetchAllTeachers();
});
</script>

<style lang="scss" scoped></style>
