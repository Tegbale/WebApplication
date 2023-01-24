<template>
  <div class="flex items-center space-x-2 font-roboto text-tegbale-text-gray">
    <div
      v-if="noPicture"
      class="inline-flex overflow-hidden relative justify-center items-center w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-full"
    >
      <span class="font-medium text-gray-600">{{ getInitials }}</span>
    </div>
    <img
      class="w-8 h-8 md:w-10 md:h-10 rounded-full"
      src="../assets/staticImages/adminAvatar.jpg"
      alt=""
      v-else
    />

    <div class="text-xs text-gray-500">
      {{ user.fullName }} ({{ user.role }})
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
