<template>
  <div class="flex items-center space-x-2 font-roboto text-tegbale-text-gray">
    <!-- <div v-if="noPicture"
            class="inline-flex overflow-hidden relative justify-center items-center w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-full">
            <span class="font-medium text-gray-600">{{ getInitials }}</span>
        </div>
        <img class="w-8 h-8 md:w-10 md:h-10 rounded-full" :src="authUser.photo" alt="" v-else />

        <div class="text-xs text-gray-500">
            {{ authUser.fullname }} <span class="user_role">({{ authUser.role }})</span>
        </div> -->

    <div
      class="inline-flex overflow-hidden relative justify-center items-center w-4 h-4 md:w-6 md:h-6 bg-gray-100 rounded-full text-xs"
    >
      <span class="font-medium text-gray-600">HA</span>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
