<template>
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
          Email Address
        </th>
        <th
          class="p-3 text-sm font-semibold tracking-wide text-left text-tegbale-text-gray"
        >
          Phone Number
        </th>
        <th
          class="p-3 text-sm font-semibold tracking-wide text-left text-tegbale-text-gray"
        >
          Ward Names
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
      <template
        v-if="allGuardians && allGuardians.data && allGuardians.data.length > 0"
      >
        <tr
          class="border-b-2 border-gray-100 hover:bg-gray-50"
          v-for="guardian in GuardiansArray"
          :key="guardian.id"
        >
          <td class="p-3 text-sm text-tegbale-text-gray font-roboto">
            {{ guardian.id }}
          </td>
          <td
            class="p-3 text-sm text-tegbale-text-gray font-roboto cursor-pointer hover:text-tegbale-blue"
          >
            {{ guardian.name }}
          </td>
          <td class="p-3 text-sm text-tegbale-text-gray font-roboto">
            {{ guardian.email }}
          </td>
          <td class="p-3 text-sm text-tegbale-text-gray font-roboto">
            {{ guardian.phone }}
          </td>
          <td class="p-3 text-sm text-tegbale-text-gray font-roboto">
            <select
              name=""
              id=""
              class="border-transparent focus:border-transparent focus:ring-0"
            >
              <option v-for="ward in guardian.wards" :key="ward.id">
                {{ ward.name }}
              </option>
            </select>
          </td>
          <td class="flex justify-end p-3 space-x-2"></td>
        </tr>
      </template>
      <tr v-else>
        <td
          colspan="5"
          class="text-center py-6 h-52 text-tegbale-text-gray text-xl font-roboto font-medium"
        >
          No Guardian has been added.
        </td>
      </tr>
    </template>
  </BaseDataTable>

  <!-- mobile data table cards -->
  <template
    v-if="allGuardians && allGuardians.data && allGuardians.data.length > 0"
  >
    <div
      class="grid grid-auto-fit gap-4 md:hidden pt-4"
      v-for="guardian in GuardiansArray"
      :key="guardian.id"
    >
      <BaseMobileDataTable
        :column-one-text="guardian.name"
        :column-two-text="guardian.email"
        :column-three-text="guardian.phone"
        :select="true"
        column-one-title="Name"
        column-two-title="Email"
        column-three-title="Phone"
      >
        <template #select>
          <div class="flex items-center">
            wards:
            <select
              name=""
              id=""
              class="border-transparent focus:border-transparent focus:ring-0"
            >
              <option v-for="ward in guardian.wards" :key="ward.id">
                {{ ward.name }}
              </option>
            </select>
          </div>
        </template>
      </BaseMobileDataTable>
    </div>
  </template>
  <div
    class="flex items-center justify-center text-center h-52 md:hidden text-tegbale-text-gray text-xl font-roboto font-medium"
  >
    <p>No Guardian has been added</p>
  </div>
  <div class="">
    <!--  -->
  </div>
</template>

<script setup>
import BaseDataTable from "@/components/BaseComponents/BaseDataTable.vue";
import BaseMobileDataTable from "@/components/BaseComponents/BaseMobileDataTable.vue";
import ExportBtnDropdown from "@/components/exportBtnDropdown.vue";
import { onClickOutside } from "@vueuse/core";

import { ref } from "vue";

// import stores
import { useUserStore } from "@/stores/users";
import { useToastStore } from "@/stores/toast-store";

// declare the stores
const usersStore = useUserStore();
const toastStore = useToastStore();

// pagination variables
const currentPage = ref(1);

const allGuardians = ref({});
const role = ref("parent");

const showDropdown = ref(false);

const dropdownRef = ref(null);

onClickOutside(dropdownRef, () => {
  showDropdown.value = false;
});

const handleShowDropdown = () => {
  showDropdown.value = !showDropdown.value;
};
const fetchAllUsersByRole = async () => {
  try {
    const { data } = await usersStore.getUserByRole(
      role.value,
      currentPage.value
    );
    allGuardians.value = data;
  } catch (error) {
    // Handle error
    toastStore.showToast({
      title: "Error",
      message: error.message || "error in getting users",
      type: "error",
      timeout: 4000,
    });
  }
};

defineExpose({
  role,
  currentPage,
  fetchAllUsersByRole,
});
</script>

<style lang="scss" scoped></style>
