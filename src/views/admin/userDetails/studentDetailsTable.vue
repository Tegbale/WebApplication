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
          Classroom
        </th>
        <th
          class="p-3 text-sm font-semibold tracking-wide text-left text-tegbale-text-gray"
        >
          Guardian
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
      <template v-if="studentsArray.length > 0">
        <tr
          class="border-b-2 border-gray-100 hover:bg-gray-50"
          v-for="student in studentsArray"
          :key="student.id"
        >
          <td class="p-3 text-sm text-tegbale-text-gray font-roboto">
            {{ student.id }}
          </td>
          <td
            class="p-3 text-sm text-tegbale-text-gray font-roboto cursor-pointer hover:text-tegbale-blue"
          >
            {{ student.name }}
          </td>
          <td class="p-3 text-sm text-tegbale-text-gray font-roboto">
            {{ student.classroom }}
          </td>
          <td class="p-3 text-sm text-tegbale-text-gray font-roboto">
            {{ student.guardian }}
          </td>
          <td class="flex justify-end p-3 space-x-2"></td>
        </tr>
      </template>
      <tr v-else>
        <td
          colspan="5"
          class="flex items-center justify-center text-center h-52 text-tegbale-text-gray text-xl font-roboto font-medium"
        >
          No student has been added
        </td>
      </tr>
    </template>
  </BaseDataTable>
  <!-- mobile data table cards -->
  <template v-if="studentsArray.length > 0">
    <div
      class="grid grid-auto-fit gap-4 md:hidden pt-4"
      v-for="student in studentsArray"
      :key="student.id"
    >
      <BaseMobileDataTable
        :column-one-text="student.name"
        :column-two-text="student.classroom"
        :column-three-text="student.guardian"
        :notClickable="true"
        column-one-title="Name"
        column-two-title="Classroom"
        column-three-title="Guardian"
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

const studentsArray = ref([
  {
    name: "Lucky Doe",
    classroom: "Primary 5 classroom",
    id: 1,
    guardian: "John Doe",
  },
  {
    name: "Robert Doe",
    classroom: "Primary 5 classroom",
    id: 2,
    guardian: "John Doe",
  },
  {
    name: "Michael Doe",
    classroom: "Primary 5 classroom",
    id: 3,
    guardian: "John Doe",
  },
  {
    name: "Bobby Doe",
    classroom: "Primary 5 classroom",
    id: 4,
    guardian: "John Doe",
  },
  {
    name: "vicent Doe",
    classroom: "Primary 5 classroom",
    id: 5,
    guardian: "John Doe",
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
