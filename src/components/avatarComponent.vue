<template>
  <div
    class="flex items-center space-x-2 font-roboto text-tegbale-text-gray text-[8px] sm:text-sm leading-tight"
  >
    <div
      v-if="noPicture"
      class="inline-flex overflow-hidden relative justify-center items-center p-1 w-6 h-6 md:w-10 md:h-10 bg-gray-100 rounded-full"
    >
      <span class="font-medium text-gray-600">{{ getInitials }}</span>
    </div>
    <img
      class="w-6 h-6 md:w-10 md:h-10 rounded-full"
      :src="authUser.photo"
      alt=""
      v-else
    />

    <div class="text-gray-500 hidden sm:block">
      {{ authUser.fullname }}
      <span class="user_role">({{ authUser.role }})</span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";

const userStore = useAuthStore();
const authUser = userStore.user;
const noPicture = ref(false);

onMounted(() => {
  if (authUser.photo) {
    noPicture.value = false;
  } else {
    noPicture.value = true;
  }
});
// computed properties to get the initials of the user
const getInitials = computed(() => {
  if (authUser.firstname && authUser.lastname) {
    return `${authUser.firstname[0]}${authUser.lastname[0]}`;
  }
  return null;
});
</script>

<style lang="scss" scoped>
.user_role {
  font-size: xx-small;
}
</style>
