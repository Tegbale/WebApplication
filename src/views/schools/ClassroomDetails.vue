<template>
  <div>
    <div class="flex justify-between items-end sm:items-center space-x-2 mt-20">
      <BasePageTitle pageTitle="Classroom" :showBtn="true" :btnText="btnText" @clicked="handleModalAction"
        :showSubTitle="true" :subTitle="schoolName + ' Classroom'" />
      <!-- export dropdown button for mobie devices only -->
      <ExportBtnDropdown class="flex md:hidden mb-0.5" ref="dropdownRef" :show-dropdown="showDropdown"
        @show-dropdown="showDropdown = !showDropdown" />
    </div>

    <BaseTabWrapper class="" @changeTab="handleTabChange">
      <BaseTab title="Teachers">
        <TeacherDetailsTable ref="teacherDetails" @schoolNameOutput="handleSchoolNameOutput" />
      </BaseTab>
      <BaseTab title="Students">
        <StudentDetailsTable ref="studentDetails" />
      </BaseTab>
    </BaseTabWrapper>
    <BaseModal :modalActive="modalActive" :closeMode="closeModal">
      <template #title>
        <div class="flex justify-between items-center">
          <h3 class="text-lg md:text-2xl font-medium font-roboto text-black">
            {{ modalTitle }}
          </h3>
          <button @click="closeModal" class="p-2 hover:bg-gray-200 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </template>
      <template #form>
        <div v-if="modalTitle === 'Add Student to Classroom'" class="px-2 mt-8">
          <p class="text-sm font-medium font-roboto">Student Information</p>

          <div class="grid grid-auto-fit gap-3">
            <div class="relative flex items-center text-gray-300 focus-within:text-tegbale-blue mb-1"
              :class="{ 'mt-1': modalInput }">
              <select v-model="student_id"
                class="border border-gray-300 rounded-2xl leading-5 mt-2 pr-3 pl-10 py-2 w-full hover:border-gray-400 focus:outline-none focus:border-none focus:ring-1 focus:border-gray-400 placeholder:text-[12px] placeholder:tracking-wide placeholder:opacity-50 placeholder:content-center text-black">
                <option selected disabled value="">Select A Student</option>

                <option v-for="user in studentStore.students.data" :value="user.id" :key="user.fullname">{{
                  user.fullname }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div v-if="modalTitle === 'Add New Teacher'" class="px-2 mt-8">
          <p class="text-sm font-medium font-roboto">Teacher Information</p>
          <div class="grid grid-auto-fit gap-3">
            <div class="relative flex items-center text-gray-300 focus-within:text-tegbale-blue mb-1"
              :class="{ 'mt-1': modalInput }">
              <select v-model="teacher_id"
                class="border border-gray-300 rounded-2xl leading-5 mt-2 pr-3 pl-10 py-2 w-full hover:border-gray-400 focus:outline-none focus:border-none focus:ring-1 focus:border-gray-400 placeholder:text-[12px] placeholder:tracking-wide placeholder:opacity-50 placeholder:content-center text-black">
                <option selected disabled value="">Select A Teacher</option>

                <option v-for="user in teacherStore.teachers.data" :value="user.id" :key="user.fullname">{{
                  user.fullname }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </template>
      <template #button>
        <div class="block md:flex items-center md:justify-end md:space-x-4 space-y-3 md:space-y-0 py-10">
          <button @click="closeModal"
            class="bg-tegbale-text-gray text-white font-medium font-roboto py-2 px-16 w-full md:max-w-fit rounded-3xl hover:bg-gray-400">
            Cancel
          </button>
          <button @click="addMember"
            class="bg-tegbale-blue text-white font-medium font-roboto py-2 px-10 w-full md:max-w-fit rounded-3xl hover:bg-blue-900">
            {{
              modalTitle == "Add New Teacher" ? "Add Teacher" : "Add Student"
            }}
          </button>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import BasePageTitle from "@/components/BaseComponents/BasePageTitle.vue";
import BaseTab from "@/components/BaseComponents/BaseTab.vue";
import BaseTabWrapper from "@/components/BaseComponents/BaseTabWrapper.vue";
import BaseModal from "@/components/BaseComponents/BaseModal.vue";
import BaseInput from "@/components/BaseComponents/BaseInput.vue";
import ExportBtnDropdown from "@/components/exportBtnDropdown.vue";
import StudentDetailsTable from "@/views/admin/userDetails/studentDetailsTable.vue";
import TeacherDetailsTable from "@/views/admin/userDetails/teacherDetailsTable.vue";
import { onClickOutside } from "@vueuse/core";

// import stores
import { useStudent } from "@/stores/students"; 
import { useTeacher } from "@/stores/teachers"; 
import { useToastStore } from "@/stores/toast-store";

// declare the stores
const studentStore = useStudent();
const teacherStore = useTeacher();
const toastStore = useToastStore();

import { ref, computed, onMounted } from "vue";
import { useRoute } from 'vue-router';
const route = useRoute();

const showDropdown = ref(false);
const modalActive = ref(false);
const schoolName = ref("");
const student_id = ref(null);
const teacher_id = ref(null);
const studentDetails = ref(null);
const teacherDetails = ref(null);
const dropdownRef = ref(null);
const isEditing = ref(false);
const isCreating = ref(false);
const btnText = ref("Add Teacher");

onClickOutside(dropdownRef, () => {
  showDropdown.value = false;
});

const handleModalAction = () => {
  isCreating.value = true;
  modalActive.value = !modalActive.value;
};

const closeModal = () => {
  modalActive.value = false;
  isEditing.value = false;
  isCreating.value = false;
};
const handleSchoolNameOutput = (value) => {
  schoolName.value = value;
};

// computed properties
const modalTitle = computed(() => {
  if (btnText.value === "Add Student") {
    return "Add Student to Classroom";
  }
  return "Add New Teacher";
});

// fetch all Teachers of a school
const fetchTeachers = async () => {
  try {
    await teacherStore.fetchAllTeachers();
    // if (response.status === 200) {
    //   teacherDetails.value = response.data.data;
    // }
  } catch (error) {
    console.log(error);
    toastStore.showToast({
      title: "Ooops!",
      message: error.message || "Unable to Fetch class details",
      type: "error",
      timeout: 4000,
    });
  }
}
// fetch all students of a school
const fetchStudents = async () => {
  try {
    await studentStore.fetchAllStudents();
    // if (response.status === 200) {
    //   teacherDetails.value = response.data.data;
    // }
  } catch (error) {
    console.log(error);
    toastStore.showToast({
      title: "Ooops!",
      message: error.message || "Unable to Fetch School details",
      type: "error",
      timeout: 4000,
    });
  }
}

// add teacher or student to classroom
const addMember = async () => {

  if (modalTitle.value === 'Add New Teacher') {
    const payload = {
      classroom_id: route.params.id,
      teacher_id: teacher_id.value,
    };
    try {
      const { data } = await teacherStore.addTeacherToClass(payload);

      console.log(data);
      // call the toast store to show the toast
      // toastStore.showToast({
      //   title: "Hurray!",
      //   message: "Teacher added successfully",
      //   type: "success",
      //   timeout: 4000,
      // });
    } catch (error) {
      console.log(error);
      // call the toast store to show the toast
      toastStore.showToast({
        title: "Ooops!",
        message: error.message || "Add Teacher failed",
        type: "error",
        timeout: 4000,
      });
    } finally {
      isCreating.value = false;
      modalActive.value = false;
    }
  } else {
    const payload = {
      classroom_id: route.params.id,
      student_id: student_id.value,
    };
    try {
      const { data } = await teacherStore.addTeacherToClass(payload);

      console.log(data);
      // call the toast store to show the toast
      // toastStore.showToast({
      //   title: "Hurray!",
      //   message: "Teacher added successfully",
      //   type: "success",
      //   timeout: 4000,
      // });
    } catch (error) {
      console.log(error);
      // call the toast store to show the toast
      toastStore.showToast({
        title: "Ooops!",
        message: error.message || "Add Teacher failed",
        type: "error",
        timeout: 4000,
      });
    } finally {
      isCreating.value = false;
      modalActive.value = false;
    }
  }
}


const handleTabChange = (value) => {
  // let role, currentPage;

  switch (value) {
    case "Students":
      btnText.value = "Add Student";



      break;

    case "Teachers":
      btnText.value = "Add Teacher";
      break;
    default:
      break;
  }
};

onMounted(() => {
  fetchTeachers()
  fetchStudents()
});
</script>

<style lang="scss" scoped></style>
