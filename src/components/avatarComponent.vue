<template>
  <div class="flex items-center space-x-6 font-roboto text-base font-normal text-tegbale-text-gray">
    <div
      v-if="noPicture"
      class="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600"
    >
      <span class="font-medium text-gray-600 dark:text-gray-300">{{
        getInitials
      }}</span>
    </div>
    <img
      class="w-10 h-10 rounded-full"
      src="../assets/staticImages/adminAvatar.jpg"
      alt=""
      v-else
    />
    <div class="font-medium dark:text-white">
      <div class="text-sm text-gray-500 dark:text-gray-400 pr-6">
        {{ user.fullName }} ({{ user.role }})
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
const noPicture = ref(false);
const user = ref({
  fullName: "John Doe",
  role: "Admin",
});
//return initials of the user
const getInitials = computed(() => {
  const initials = user.value.fullName.match(/\b\w/g) || [];
  return ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();
});
</script>

<style lang="scss" scoped></style>
