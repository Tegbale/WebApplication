<template>
  <div>
    <ApplayoutView>
      <div
        class="flex justify-between items-end sm:items-center space-x-2 mt-20"
      >
        <BasePageTitle
          pageTitle="Schools"
          :showBtn="true"
          btnText="Add School"
          @clicked="handleModalAction"
          :showSubTitle="true"
          subTitle="Laurel Nursery and Primary School"
        />
        <!-- export dropdown button for mobie devices only -->
        <ExportBtnDropdown
          class="flex md:hidden mb-0.5"
          ref="dropdownRef"
          :show-dropdown="showDropdown"
          @show-dropdown="showDropdown = !showDropdown"
        />
      </div>

      <BaseTabWrapper class="">
        <BaseTab title="Students">
          <StudentDetailsTable />
        </BaseTab>
        <BaseTab title="Teachers"><TeacherDetailsTable /></BaseTab>
        <BaseTab title="Guardians"> <GuardianDetailsTable /> </BaseTab>
      </BaseTabWrapper>
    </ApplayoutView>
    <BaseModal :modalActive="modalActive" :closeMode="closeModal">
      <template #title>
        <div class="flex justify-between items-center">
          <h3 class="text-lg md:text-2xl font-medium font-roboto text-black">
            {{ modalTitle }}
          </h3>
          <button
            @click="closeModal"
            class="p-2 hover:bg-gray-200 rounded-full"
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
              />
            </div>
            <div>
              <BaseInput
                label="School Location"
                placeholder="Enter School Location"
                type="text"
                class="w-full"
                :modalInput="true"
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
              />
            </div>
            <div>
              <BaseInput
                label="Email Address"
                placeholder="Enter School email"
                type="email"
                class="w-full"
                :modalInput="true"
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
            v-if="modalTitle == 'View School'"
            class="bg-red-600 text-white font-medium font-roboto py-2 px-16 w-full md:max-w-fit rounded-3xl hover:bg-red-400"
          >
            Delete School
          </button>
          <button
            @click="closeModal"
            class="bg-tegbale-text-gray text-white font-medium font-roboto py-2 px-16 w-full md:max-w-fit rounded-3xl hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            class="bg-tegbale-blue text-white font-medium font-roboto py-2 px-10 w-full md:max-w-fit rounded-3xl hover:bg-blue-900"
          >
            {{ modalTitle == "Add School" ? "Add School" : "Save Changes" }}
          </button>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import ApplayoutView from "../ApplayoutView.vue";
import BasePageTitle from "@/components/BaseComponents/BasePageTitle.vue";
import BaseTab from "@/components/BaseComponents/BaseTab.vue";
import BaseTabWrapper from "@/components/BaseComponents/BaseTabWrapper.vue";
import BaseModal from "@/components/BaseComponents/BaseModal.vue";
import BaseInput from "@/components/BaseComponents/BaseInput.vue";
import ExportBtnDropdown from "@/components/exportBtnDropdown.vue";
import StudentDetailsTable from "@/views/admin/userDetails/studentDetailsTable.vue";
import TeacherDetailsTable from "@/views/admin/userDetails/teacherDetailsTable.vue";
import GuardianDetailsTable from "@/views/admin/userDetails/GuardianDetailsTable.vue";
import { onClickOutside } from "@vueuse/core";

import { ref, computed } from "vue";

const showDropdown = ref(false);
const modalActive = ref(false);

const dropdownRef = ref(null);
const isEditing = ref(false);
const isCreating = ref(false);

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
