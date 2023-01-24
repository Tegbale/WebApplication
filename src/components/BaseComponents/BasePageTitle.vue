<template>
  <div
    class="block w-full items-center space-y-4 sm:space-y-0 sm:flex sm:justify-between"
  >
    <div class="block md:flex items-center space-y-2">
      <p
        class="text-xl sm:text-2xl font-medium text-black capitalize pr-2 md:pr-6"
      >
        {{ pageTitle }}
      </p>
      <div class="flex items-center" v-if="showSubTitle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-5 h-5 block md:hidden text-gray-500"
        >
          <path
            fill-rule="evenodd"
            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clip-rule="evenodd"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5 text-gray-500 hidden md:block"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
        <p class="flex text-sm md:text-2xl capitalize text-gray-500 pl-2">
          {{ subTitle }}
        </p>
      </div>
    </div>

    <button
      class="bg-tegbale-blue outline-none text-white flex justify-center items-center px-4 py-1 md:py-2 font-bold space-x-1 rounded-lg text-sm md:text-base hover:bg-blue-900"
      v-if="showBtn"
      @click="handleButtonClick"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-5 h-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{{ btnText }}</span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  pageTitle: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
  },
  btnText: {
    type: String,
  },
  showBtn: {
    type: Boolean,
    default: false,
  },
  showSubTitle: {
    type: Boolean,
    default: false,
  },
});

// emit with setup script
const emit = defineEmits(["clicked"]);

const handleButtonClick = () => {
  emit("clicked");
};
</script>

<style lang="scss" scoped></style>
