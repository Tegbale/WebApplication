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
      :src="userStore.photo"
      alt=""
      v-else
    />

    <div class="text-xs text-gray-500">
      {{ getFullName }} ({{ userStore.role }})
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useUsersStore } from "@/stores/user-store";


const userStore = useUsersStore();
const noPicture = ref(false);

onMounted(() => {
  if (userStore.photo) {
    noPicture.value = false;
  } else {
    noPicture.value = true;
  }
});
// computed properties to get the initials of the user
const getInitials = computed(() => {
  if (userStore.firstname && userStore.lastname) {
    return `${userStore.firstname[0]}${userStore.lastname[0]}`;
  }
  return null;
});

//get the full name of the user
const getFullName = computed(() => {
  if (userStore.firstname && userStore.lastname) {
    return `${userStore.firstname} ${userStore.lastname}`;
  }
  return null;
});
</script>

<style lang="scss" scoped></style>
