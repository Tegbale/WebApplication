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
          Classrooms
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
      <template v-if="teachersArray.length > 0">
        <tr
          class="border-b-2 border-gray-100 hover:bg-gray-50"
          v-for="teacher in teachersArray"
          :key="teacher.id"
        >
          <td class="p-3 text-sm text-tegbale-text-gray font-roboto">
            {{ teacher.id }}
          </td>
          <td
            class="p-3 text-sm text-tegbale-text-gray font-roboto cursor-pointer hover:text-tegbale-blue"
          >
            {{ teacher.name }}
          </td>
          <td class="p-3 text-sm text-tegbale-text-gray font-roboto">
            {{ teacher.email }}
          </td>
          <td class="p-3 text-sm text-tegbale-text-gray font-roboto">
            {{ teacher.classroom.name }}... ({{
              teacher.classroom.amount
            }})
          </td>
          <td class="flex justify-end p-3 space-x-2"></td>
        </tr>
      </template>
      <tr v-else>
        <td
          colspan="5"
          class="flex items-center justify-center text-center h-52 text-tegbale-text-gray text-xl font-roboto font-medium"
        >
          No Teacher has been added
        </td>
      </tr>
    </template>
  </BaseDataTable>
  <template v-if="teachersArray.length > 0">
    <div
      class="grid grid-auto-fit gap-4 md:hidden pt-4"
      v-for="teacher in teachersArray"
      :key="teacher.id"
    >
      <BaseMobileDataTable
        :column-one-text="teacher.name"
        :column-two-text="teacher.email"
        :column-three-textA="teacher.classroom.name"
        :column-three-textB="teacher.classroom.amount"
        :notClickable="true"
        :subTable="true"
        column-one-title="Name"
        column-two-title="Email Address"
        column-three-title="Classrooms"
      >
      </BaseMobileDataTable>
    </div>
  </template>
</template>

<script setup>
import BaseDataTable from "@/components/BaseComponents/BaseDataTable.vue";
import BaseMobileDataTable from "@/components/BaseComponents/BaseMobileDataTable.vue";
import ExportBtnDropdown from "@/components/exportBtnDropdown.vue";
import { onClickOutside } from "@vueuse/core";

import { ref } from "vue";

const showDropdown = ref(false);

const dropdownRef = ref(null);

const teachersArray = ref([
  {
    id: 1,
    name: "John Doe",
    email: "johnnydoe@example.com",
    classroom: {
      id: 1,
      name: "Primary 3 Classroom",
      amount: 20,
    },
  },
]);

onClickOutside(dropdownRef, () => {
  showDropdown.value = false;
});

const handleShowDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

// computed properties
</script>

<style lang="scss" scoped></style>
