<template>
  <ApplayoutView>
    <div>
      <div class="flex justify-between items-end">
        <BasePageTitle
          pageTitle="Staff Users"
          :showBtn="true"
          btnText="Create User"
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
              Full Name
            </th>
            <th
              class="p-3 text-sm font-semibold tracking-wide text-left text-tegbale-text-gray"
            >
              Email Address
            </th>
            <th
              class="p-3 text-sm font-semibold tracking-wide text-left text-tegbale-text-gray"
            >
              Role
            </th>
            <th class="flex flex-col p-3">
              <!-- export dropdown button for mobie devices only -->
              <ExportBtnDropdown
                ref="dropdownRef"
                :show-dropdown="showDropdown"
                @show-dropdown="handleShowDropdown"
              />
            </th>
          </tr>
        </template>
        <template #table-body>
          <template v-if="StaffLists.length > 0">
            <tr
              class="border-b-2 border-gray-100"
              v-for="staff in StaffLists"
              :key="staff.id"
            >
              <td class="p-3 text-sm text-tegbale-text-gray font-roboto">
                {{ staff.id }}
              </td>
              <td class="p-3 text-sm text-tegbale-text-gray font-roboto">
                {{ staff.fullName }}
              </td>
              <td class="p-3 text-sm text-tegbale-text-gray font-roboto">
                {{ staff.staffEmail }}
              </td>
              <td class="p-3 text-sm text-tegbale-text-gray font-roboto">
                {{ staff.role }}
              </td>
              <td class="flex justify-end p-3 space-x-2">
                <button
                  @click="handleViewStaff(staff.id)"
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
                  @click="handleEditStaff(staff.id)"
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
              No Staff has been added
            </td>
          </tr>
        </template>
      </BaseDataTable>
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
        <p class="text-sm font-medium font-roboto">User Information</p>
        <div class="grid grid-auto-fit gap-3">
          <div>
            <BaseInput
              label="Full Name"
              placeholder="Enter Full Name"
              type="text"
              class="w-full"
              :modalInput="true"
            />
          </div>
          <div>
            <BaseInput
              label="Email Address"
              placeholder="Enter Email Address"
              type="email"
              class="w-full"
              :modalInput="true"
            />
          </div>
        </div>
      </div>
      <div class="pt-5">
        <!-- <p class="text-sm font-medium font-roboto">Admin Information</p> -->
        <div class="grid grid-auto-fit gap-3">
          <div>
            <BaseInput
              label="Phone Number"
              placeholder="Enter Phone Number"
              type="text"
              class="w-full"
              :modalInput="true"
            />
          </div>
          <div>
            <label for="role" class="text-xs">Role</label>
            <div
              class="relative flex items-center text-gray-300 focus-within:text-tegbale-blue"
              :class="{ 'mt-2': modalInput }"
            >
              <select
                class="border border-gray-300 rounded-2xl leading-5 mt-2 pr-3 pl-10 py-2 w-full hover:border-gray-400 focus:outline-none focus:border-none focus:ring-1 focus:border-gray-400 placeholder:text-[12px] placeholder:tracking-wide placeholder:opacity-50 placeholder:content-center text-tegbale-text-gray"
              >
                <option selected>Select Role</option>
                <option value="2">Admin</option>
                <option value="3">Teacher</option>
                <option value="4">Student</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #button>
      <div
        class="block md:flex items-center md:justify-end md:space-x-4 space-y-3 md:space-y-0 py-10"
      >
        <button
          v-if="modalTitle == 'View User'"
          class="bg-red-600 text-white font-medium font-roboto py-2 px-16 w-full md:max-w-fit rounded-3xl hover:bg-red-400"
        >
          Delete User
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
          {{
            modalTitle == "Create New User" ? "Create New User" : "Save Changes"
          }}
        </button>
      </div>
    </template>
  </BaseModal>
</template>

<script setup>
import ApplayoutView from "../ApplayoutView.vue";
import BasePageTitle from "@/components/BaseComponents/BasePageTitle.vue";
import BaseDataTable from "@/components/BaseComponents/BaseDataTable.vue";
import BaseModal from "@/components/BaseComponents/BaseModal.vue";
import BaseInput from "@/components/BaseComponents/BaseInput.vue";

import { onClickOutside } from "@vueuse/core";

import { ref, computed } from "vue";
import ExportBtnDropdown from "../../components/exportBtnDropdown.vue";

const showDropdown = ref(false);
const modalActive = ref(false);
const StaffLists = ref([
  {
    id: 1,
    fullName: "Precious Ogbodo",
    staffEmail: "emmajayschools@gmail.com",
    role: "Admin",
  },
  {
    id: 2,
    fullName: "Emeka Ahmed",
    staffEmail: "soyabeans@yahoo.com",
    role: "Teacher",
  },
]);

const dropdownRef = ref(null);
const isEditing = ref(false);
const isCreating = ref(false);

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

const handleEditStaff = (id) => {
  isEditing.value = true;
  modalActive.value = !modalActive.value;
  console.log(id);
};

const handleViewStaff = (id) => {
  isEditing.value = false;
  isCreating.value = false;
  modalActive.value = !modalActive.value;

  console.log(id);
};
// computed properties
const modalTitle = computed(() => {
  if (isEditing.value) {
    return "Edit User";
  } else if (isCreating.value) {
    return "Create New User";
  } else {
    return "View User";
  }
});
</script>

<style lang="scss" scoped></style>
