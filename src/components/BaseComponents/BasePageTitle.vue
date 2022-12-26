<template>
  <div class="block space-y-4 sm:space-y-0 sm:flex sm:justify-between">
    <div class="block space-y-2 ">
      <p class="text-xl sm:text-2xl font-medium text-black capitalize">{{ pageTitle }}</p>
      <p
        class="flex text-sm capitalize text-tegbale-text-gray"
        v-if="showSubTitle"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5 text-sm text-tegbale-text-gray"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
        {{ subTitle }}
      </p>
    </div>

    <button
      class="bg-tegbale-blue outline-none text-white flex justify-center items-center px-4 py-2 font-bold space-x-1 rounded-lg text-base hover:bg-blue-900"
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
