<template>
  <BaseDataTable class="hidden md:block">
    <template #table-header>
      <tr>
        <th class="p-3 text-sm font-semibold tracking-wide text-left text-tegbale-text-gray">
          S/N
        </th>
        <th class="p-3 text-sm font-semibold tracking-wide text-left text-tegbale-text-gray">
          Name
        </th>
        <th class="p-3 text-sm font-semibold tracking-wide text-left text-tegbale-text-gray">
          Email Address
        </th>
        <th class="p-3 text-sm font-semibold tracking-wide text-left text-tegbale-text-gray">
          Role
        </th>
        <th class="flex flex-col p-3">
          <!-- Dropdown menu -->

          <ExportBtnDropdown ref="dropdownRef" :show-dropdown="showDropdown" @show-dropdown="handleShowDropdown" />
        </th>
      </tr>
    </template>
    <template #table-body>
      <template v-if="allTeachers && allTeachers.length > 0">
        <tr class="border-b-2 border-gray-100 hover:bg-gray-50" v-for="(teacher, index) in allTeachers" :key="teacher.id">
          <td class="p-3 text-sm text-tegbale-text-gray font-roboto">
            {{ index + 1 }}
          </td>
          <td class="p-3 text-sm text-tegbale-text-gray font-roboto cursor-pointer hover:text-tegbale-blue">
            {{ teacher.full_name }}
          </td>
          <td class="p-3 text-sm text-tegbale-text-gray font-roboto">
            {{ teacher.email }}
          </td>
          <td class="p-3 text-sm text-tegbale-text-gray font-roboto">
            {{ teacher.role }}
          </td>
          <td class="flex justify-center p-3 space-x-2">
            <!-- <button class="text-sm p-1 text-blue-700 font-bold hover:bg-blue-200 hover:rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <button class="text-sm p-1 text-tegbale-green font-bold hover:bg-green-200 hover:rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
              </svg>
            </button> -->
            <button class="text-sm p-1 text-red-700 font-bold hover:bg-red-200 hover:rounded-full"
              @click.prevent="handleRemoveTeacher(teacher.id)">
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
  <template v-if="allTeachers && allTeachers.length > 0">
    <div class="grid grid-auto-fit gap-4 md:hidden pt-4" v-for="teacher in allTeachers" :key="teacher.id">
      <BaseMobileDataTable :column-one-text="teacher.full_name" :column-two-text="teacher.email"
        :column-three-textA="teacher.role" :notClickable="true" :subTable="true" column-one-title="Name"
        column-two-title="Email Address" column-three-title="Classrooms">
        <template #button>
          <!-- <button
            class="flex items-center text-xs px-2 py-1 space-x-2 text-blue-700 font-bold border bg-blue-200 hover:bg-blue-900 hover:text-yellow-100 rounded-full">
            <span class="">view</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <button
            class="flex items-center text-xs px-2 py-1 space-x-2 text-green-700 font-bold border bg-green-200 hover:bg-green-500 hover:text-white rounded-full">
            <span class="">edit</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>
          </button> -->
          <button
            class="flex items-center text-xs px-2 py-1 space-x-2 text-red-700 font-bold border bg-red-200 hover:bg-red-700 hover:text-red-200 rounded-full"
            @click.prevent="handleRemoveTeacher(teacher.id)">
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
  <div
    class="flex items-center justify-center text-center h-52 md:hidden text-tegbale-text-gray text-xl font-roboto font-medium">
    <p>No Teacher has been added</p>
  </div>
  <div class="">
    <!-- -->
  </div>
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
        <p>Are You sure you want to Remove this Teacher from this Class?</p>
      </div>
    </template>
    <template #button>
      <div class="flex">
        <button type="button" @click.prevent="deleteData"
          class="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="-ml-0.5 mr-2 h-4 w-4">
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
</template>

<script setup>
import BaseDataTable from "@/components/BaseComponents/BaseDataTable.vue";
import BaseMobileDataTable from "@/components/BaseComponents/BaseMobileDataTable.vue";
import ExportBtnDropdown from "@/components/exportBtnDropdown.vue";
import { onClickOutside } from "@vueuse/core";
import BaseDeleteModal from "@/components/BaseComponents/BaseDeleteModal.vue";

import { onMounted, ref, defineEmits } from "vue";

// import stores
import { useClassroom } from "@/stores/classrooms";
import { useToastStore } from "@/stores/toast-store";

// declare the stores
const classStore = useClassroom();
const toastStore = useToastStore();

// Define the emits configuration to emit events
const emits = defineEmits(['schoolNameOutput']);
// define route
import { useRoute } from "vue-router";
const route = useRoute();

const allTeachers = ref({});
const classroomId = route.params.id;
const deleteActive = ref(false);
const showDropdown = ref(false);
const isDeleting = ref(false);

const dropdownRef = ref(null);
const teacherId = ref(null);

onClickOutside(dropdownRef, () => {
  showDropdown.value = false;
});

const handleShowDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

// fetch all Members in a class using the classroomId
const fetchAllMembers = async () => {
  const { data } = await classStore.fetchAllMembersInAClass(classroomId);
  allTeachers.value = data.teachers.data;
  // Emit the school name to the parent component
  emits('schoolNameOutput', data.class_name);

}

// handle delete Teacher from a class
const handleRemoveTeacher = (id) => {
  deleteActive.value = true;
  teacherId.value = id;
}

// close the delete modal component
const cancelDelete = () => {
  deleteActive.value = false;
};

// remove teacher from a class
const deleteData = async () => {
  isDeleting.value = true;
  const payload = {
    classroom_id: classroomId,
    teacher_id: teacherId.value.toString()
  }
  try {
    const data = await classStore.removeTeacherFromClass(payload);
    // fetch the latest class members data
    await fetchAllMembers();
    console.log(data);
    // call the toast store to show the toast
    toastStore.showToast({
      title: "Hurray!",
      message: data.message || "Teacher has been removed successfully",
      type: "success",
      timeout: 4000,
    });
  } catch (error) {
    console.log(error);
    // call the toast store to show the toast
    toastStore.showToast({
      title: "Ooops!",
      message: error.message || "Failed to remove teacher",
      type: "error",
      timeout: 4000,
    });
  } finally {
    isDeleting.value = false;
    deleteActive.value = false;
  }
};

// mounted hook
onMounted(() => {

  fetchAllMembers();
});
</script>

<style lang="scss" scoped></style>
