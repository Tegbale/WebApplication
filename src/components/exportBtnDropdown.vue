<template>
  <div class="relative ">
    <button
      class="relative text-white bg-tegbale-blue hover:bg-blue-900 focus:outline-none font-medium rounded-lg text-sm px-4 py-1 text-center inline-flex items-center justify-self-end"
      type="button"
      @click="handleShowDropdown"
    >
      Export
      <svg
        class="ml-2 w-4 h-4"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </button>
    <!-- Dropdown menu -->
    <div
      v-if="showDropdown"
      class="absolute right-0 z-10 w-44 mt-2 bg-white rounded divide-y divide-gray-100 shadow"
    >
      <ul class="py-1 text-sm text-gray-700" aria-labelledby="dropdownDefault">
        <li>
          <a href="#" class="block py-2 px-4 hover:bg-gray-100">PDF</a>
        </li>
        <li>
          <a href="#" class="block py-2 px-4 hover:bg-gray-100">XLS</a>
        </li>
        <li>
          <a href="#" class="block py-2 px-4 hover:bg-gray-100">CSV</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  showDropdown: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["showDropdown"]);

const handleShowDropdown = () => {
  emit("showDropdown"); // emit the event
};
</script>

<style lang="scss" scoped></style>
