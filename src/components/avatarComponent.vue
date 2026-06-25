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
      :src="userStore.avatar"
      alt=""
      v-else
    />

    <div class="text-xs text-gray-500">
      {{ getFullName }} <span class="user_role">({{ userStore.role }})</span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useUsersStore } from "@/stores/user-store";

const userStore = useUsersStore();
const noPicture = ref(false);

onMounted(() => {
  noPicture.value = !userStore.avatar
});

const getInitials = computed(() => {
  if (userStore.firstName && userStore.lastName) {
    return `${userStore.firstName[0]}${userStore.lastName[0]}`
  }
  return null
})

const getFullName = computed(() => {
  if (userStore.firstName && userStore.lastName) {
    return `${userStore.firstName} ${userStore.lastName}`
  }
  return null
})
</script>

<style lang="scss" scoped>
.user_role {
  font-size: xx-small;
}
</style>
