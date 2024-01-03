<template>
  <div>
    <div class="flex justify-between items-end sm:items-center space-x-2 mt-20">
      <BasePageTitle pageTitle="Students" :showBtn="true" :btnText="btnText" @clicked="handleModalAction" />
      <!-- export dropdown button for mobie devices only -->
      <ExportBtnDropdown class="flex md:hidden mb-0.5" ref="dropdownRef" :show-dropdown="showDropdown"
        @show-dropdown="showDropdown = !showDropdown" />
    </div>

    <BaseTabWrapper class="" @changeTab="handleTabChange">
      <BaseTab title="Students">
        <StudentHomePageDetails ref="studentDetails" />
      </BaseTab>
      <BaseTab title="Guardians">
        <GuardianDetailsTable ref="guardianDetails" />
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
        <div v-if="modalTitle === 'Add Student'" class="px-2 mt-6">
          <p class="text-sm font-medium font-roboto">Student Information</p>

          <div class="grid grid-auto-fit gap-3">
            <div>
              <BaseInput v-model="studentDetails.firstname" label="First Name" placeholder="Enter Student First Name"
                type="text" class="w-full" :modalInput="true" />
            </div>
            <div>
              <BaseInput v-model="studentDetails.lastname" label="Last Name" placeholder="Enter Student Last Name"
                type="text" class="w-full" :modalInput="true" />
            </div>
          </div>
          <div class="grid grid-auto-fit gap-3">
            <selectGender v-model="studentDetails.gender" />
          </div>
        </div>
        <div v-if="modalTitle === 'Add Guardian'" class="px-2 mt-8 space-y-3">
          <p class="text-sm font-medium font-roboto">Guardian Information</p>
          <div class="grid grid-auto-fit gap-3">
            <div>
              <BaseInput v-model="guardianDetails.firstname" label="First Name" placeholder="Enter First Name" type="text"
                class="w-full" :modalInput="true" />
            </div>
            <div>
              <BaseInput v-model="guardianDetails.lastname" label="Last Name" placeholder="Enter Last Name" type="text"
                class="w-full" :modalInput="true" />
            </div>
          </div>
          <div class="grid grid-auto-fit gap-3">
            <div>
              <BaseInput v-model="guardianDetails.email" label="Email Address" placeholder="Enter email Address"
                type="text" class="w-full" :modalInput="true" />
            </div>
            <div>
              <BaseInput v-model="guardianDetails.phone" label="Phone Number" placeholder="Example 08136574563"
                type="text" class="w-full" :modalInput="true" />
            </div>
          </div>
          <div class="grid grid-auto-fit gap-3">
            <selectGender v-model="guardianDetails.gender" />
            <div>
              <label class="text-xs">Ward</label>
              <select v-model="student_id"
                class="border border-gray-300 rounded-2xl leading-5 mt-2 pr-3 pl-10 py-2 w-full hover:border-gray-400 focus:outline-none focus:border-none focus:ring-1 focus:border-gray-400 placeholder:text-[12px] placeholder:tracking-wide placeholder:opacity-50 placeholder:content-center text-black">
                <option selected disabled value="">Select Student</option>

                <option v-for="user in students" :value="user.id" :key="user.fullname">{{
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
          <button @click="createMember"
            class="bg-tegbale-blue text-white font-medium font-roboto py-2 px-10 w-full md:max-w-fit rounded-3xl hover:bg-blue-900">
            {{
              modalTitle == "Add Guardian" ? "Add Guardian" : "Add Student"
            }}
          </button>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
// non reactive variables
const genderArray = [
  { text: "Male", value: "male" },
  { text: "Female", value: "female" },
]

import BasePageTitle from "@/components/BaseComponents/BasePageTitle.vue";
import selectGender from "@/components/selectGender.vue";
import BaseTab from "@/components/BaseComponents/BaseTab.vue";
import BaseTabWrapper from "@/components/BaseComponents/BaseTabWrapper.vue";
import BaseModal from "@/components/BaseComponents/BaseModal.vue";
import BaseInput from "@/components/BaseComponents/BaseInput.vue";
import ExportBtnDropdown from "@/components/exportBtnDropdown.vue";
import StudentHomePageDetails from "@/views/admin/userDetails/studentHomePageDetails.vue";
import GuardianDetailsTable from "@/views/admin/userDetails/guardianDetailsTable.vue";
import { onClickOutside } from "@vueuse/core";

// import stores
import { useGuardian } from "@/stores/guardians";
import { useStudent } from "@/stores/students";
import { useTeacher } from "@/stores/teachers";
import { useToastStore } from "@/stores/toast-store";

// declare the stores
const guardianStore = useGuardian();
const studentStore = useStudent();
const teacherStore = useTeacher();
const toastStore = useToastStore();

import { ref, computed, onMounted } from "vue";
import { useRoute } from 'vue-router';
const route = useRoute();

const showDropdown = ref(false);
const modalActive = ref(false);
const student_id = ref(null);
const studentDetails = ref(null);
const guardianDetails = ref(null);
const dropdownRef = ref(null);
const isEditing = ref(false);
const isCreating = ref(false);
const btnText = ref("Add Student");

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

// computed properties
const modalTitle = computed(() => {
  if (btnText.value === "Add Student") {
    return "Add Student";
  }
  return "Add Guardian";
});

// computed prop to get the students
const students = computed(() => {
  return studentStore.getStudents;
});

// fetch all guardians of a school
const fetchGuardians = async () => {
  try {
    await guardianStore.fetchAllGuardians();
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
const createMember = async () => {

  if (modalTitle.value === 'Add Guardian') {
    try {
      const data = await guardianStore.createGuardian(guardianDetails.value);
      // assign new guardian to a student
      const assignPayload = {
        guardian_id: data.data.id,
        student_id: student_id.value
      }

      await studentStore.attachParentToStudent(assignPayload);
      // call the toast store to show the toast
      toastStore.showToast({
        title: "Hurray!",
        message: data.message || "Guardian created successfully",
        type: "success",
        timeout: 4000,
      });
    } catch (error) {
      // call the toast store to show the toast
      toastStore.showToast({
        title: "Ooops!",
        message: error.message || "Create Guardian failed",
        type: "error",
        timeout: 4000,
      });
    } finally {
      isCreating.value = false;
      modalActive.value = false;
    }
  } else {
    studentDetails.value.email =
      "student" + Math.random().toString(36).substring(7) + "@gmail.com";

    try {
      const data = await studentStore.createStudent(studentDetails.value);

      // call the toast store to show the toast
      toastStore.showToast({
        title: "Hurray!",
        message: data.message || "Student Created successfully",
        type: "success",
        timeout: 4000,
      });
    } catch (error) {
      console.log(error);
      // call the toast store to show the toast
      toastStore.showToast({
        title: "Ooops!",
        message: error.message || "Create Student failed",
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

    case "Guardians":
      btnText.value = "Add Guardian";
      break;
    default:
      break;
  }
};

onMounted(() => {
  fetchGuardians()
  fetchStudents()
});
</script>

<style lang="scss" scoped></style>
