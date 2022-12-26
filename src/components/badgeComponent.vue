<template>
 <div class=" rounded-full hover:bg-gray-100 w-6 h-6">
  <button type="button" class="">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-5 h-5 md:w-6 md:h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
      />
    </svg>

    <!-- <span class="sr-only">Notifications</span> -->
    <div
      class="inline-flex absolute p-2 md:p-0 -top-2 -right-2 justify-center items-center w-4 h-4 md:w-5 md:h-5 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white"
    >
      {{Notifications}}
    </div>
  </button>
 </div>
</template>

<script setup>
import { ref } from 'vue';

    const Notifications = ref(5)
    
</script>

<style lang="scss" scoped></style>
