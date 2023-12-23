<template>
  <div class="flex items-center space-x-2">
    <button
      @click="goToFirstPage"
      :disabled="currentPage === 1"
      class="px-2 py-1 rounded bg-blue-500 text-white disabled:bg-gray-400 disabled:text-gray-600"
    >
      First
    </button>
    <button
      @click="previousPage"
      :disabled="currentPage === 1"
      class="px-2 py-1 rounded bg-blue-500 text-white disabled:bg-gray-400 disabled:text-gray-600"
    >
      Previous
    </button>
    <span class="text-gray-700"
      >Page {{ currentPage }} of {{ totalPages }}</span
    >
    <button
      @click="nextPage"
      :disabled="currentPage === totalPages"
      class="px-2 py-1 rounded bg-blue-500 text-white disabled:bg-gray-400 disabled:text-gray-600"
    >
      Next
    </button>
    <button
      @click="goToLastPage"
      :disabled="currentPage === totalPages"
      class="px-2 py-1 rounded bg-blue-500 text-white disabled:bg-gray-400 disabled:text-gray-600"
    >
      Last
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["page-change"]);

const props = defineProps(["currentPage", "totalPages"]);

const currentPage = ref(props.currentPage);
const totalPages = ref(props.totalPages);

function goToFirstPage() {
  if (currentPage.value > 1) {
    emit("page-change", 1);
  }
}

function previousPage() {
  if (currentPage.value > 1) {
    emit("page-change", currentPage.value - 1);
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    emit("page-change", currentPage.value + 1);
  }
}

function goToLastPage() {
  if (currentPage.value < totalPages.value) {
    emit("page-change", totalPages.value);
  }
}
</script>

<style>
/* No additional custom styling required */
</style>
