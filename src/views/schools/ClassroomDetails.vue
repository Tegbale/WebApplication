<template>
  <div>
    <div class="flex justify-between items-end sm:items-center space-x-2 mt-20">
      <BasePageTitle pageTitle="Classroom" :showBtn="true" :btnText="btnText" @clicked="handleModalAction"
        :showSubTitle="true" :subTitle="schoolName + ' Classroom'" />
      <!-- export dropdown button for mobie devices only -->
      <ExportBtnDropdown class="flex md:hidden mb-0.5" ref="dropdownRef" :show-dropdown="showDropdown"
        @show-dropdown="showDropdown = !showDropdown" />
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
    <BaseTabWrapper class="" @changeTab="handleTabChange" v-else>
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
        <div v-if="modalTitle === 'Add Teacher To Class'" class="px-2 mt-8">
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
              modalTitle == "Add Teacher To Class" ? "Add Teacher" : "Add Student"
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
import { useClassroom } from "@/stores/classrooms";
import { useTeacher } from "@/stores/teachers";
import { useToastStore } from "@/stores/toast-store";

// declare the stores
const studentStore = useStudent();
const classroomStore = useClassroom();
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
const loadingData = ref(false);

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
  return "Add Teacher To Class";
});

// fetch all Teachers of a school
const fetchTeachers = async () => {
  loadingData.value = true;
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
  } finally {
    loadingData.value = false;
  }
}
// fetch all students of a school
const fetchStudents = async () => {
  loadingData.value = true;
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
  } finally {
    loadingData.value = false;
  }
}

// fetch all Members in a class using the classroomId
const fetchAllMembers = async () => {
  // get the classroomId from the route
  const classroomId = route.params.id
  await classStore.fetchAllMembersInAClass(classroomId);
}

// add teacher or student to classroom
const addMember = async () => {

  if (modalTitle.value === 'Add Teacher To Class') {
    const payload = {
      classroom_id: route.params.id,
      teacher_id: teacher_id.value,
    };
    try {
      const data = await classroomStore.addTeacherToClass(payload);

      // console.log(data);
      // call the toast store to show the toast
      toastStore.showToast({
        title: "Hurray!",
        message: data.message || "Teacher added successfully",
        type: "success",
        timeout: 4000,
      });
    } catch (error) {
      console.log(error);
      // call the toast store to show the toast
      toastStore.showToast({
        title: "Ooops!",
        message: error.message || "Add Teacher To Class failed",
        type: "error",
        timeout: 4000,
      });
    } finally {
      fetchTeachers();
      isCreating.value = false;
      modalActive.value = false;
    }
  } else {
    const payload = {
      classroom_id: route.params.id,
      student_id: student_id.value,
    };
    try {
      const { data } = await classroomStore.addStudentToClass(payload);
      console.log(data);

      // call the toast store to show the toast
      toastStore.showToast({
        title: "Hurray!",
        message: "Student added successfully",
        type: "success",
        timeout: 4000,
      });
    } catch (error) {
      console.log(error);
      // call the toast store to show the toast
      toastStore.showToast({
        title: "Ooops!",
        message: error.message || "Add Student to Class failed",
        type: "error",
        timeout: 4000,
      });
    } finally {
      fetchStudents();
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

onMounted(async () => {
  await fetchAllMembers();
  await fetchTeachers();
  await fetchStudents();
});
</script>

<style lang="scss" scoped></style>
