<template>
  <div v-if="!noNavRoutes.includes($route.name)">
    <div
      class="flex justify-between space-x-6 py-4 px-8 font-roboto text-base font-normal text-tegbale-text-gray bg-white border-b"
    >
      <form action="" class="w-full max-w-md ">
        <div
          class="relative flex items-center text-tegbale-text-gray focus-within:text-tegbale-blue"
        >
          <input
            type="text"
            name="search"
            placeholder="Search"
            autocomplete="off"
            aria-label="Search"
            class="pl-12 pr-3 py-2 font-medium placeholder:text-tegbale-text-gray text-gray-700 rounded-2xl border-none ring-2 ring-gray-200 focus:ring-tegbale-blue focus:ring-2 w-full"
          />
          <div class="absolute w-10 block ml-2 mr-2 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 ml-3 pointer-events-none"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </div>
      </form>
      <div class="flex items-center space-x-6">
        <BadgeComponent />

        <AvatarComponent />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AvatarComponent from "../components/avatarComponent.vue";
import BadgeComponent from "../components/badgeComponent.vue";

const noNavRoutes = ref(["home", "login", "register"]);
</script>

<style lang="scss" scoped></style>
