<template>
  <div>
    <div
      class="flex w-full bg-white outline-none mt-4 rounded-full p-2 md:space-x-6 md:w-fit"
    >
      <button
        v-for="(title, index) in tabTitle"
        :key="index"
        @click="(selectedTitle = title), $emit('changeTab', selectedTitle)"
        class="bg-gray-50 text-tegbale-text-gray hover:text-white focus:text-white rounded-2xl px-6 py-1 hover:bg-blue-300 border-none text-center focus:outline-none text-sm font-normal font-roboto tracking-wider"
        :class="{
          'bg-blue-500 text-white': selectedTitle === title,
        }"
      >
        {{ title }}
      </button>
    </div>
    <slot />
  </div>
</template>

<script setup>
import { ref, useSlots, provide } from "vue";
const slots = useSlots();

defineEmits(["changeTab"]);

const tabTitle = ref(slots.default().map((tab) => tab.props.title));
const selectedTitle = ref(tabTitle.value[0]);

provide("selectedTitle", selectedTitle);
</script>

<style lang="scss" scoped></style>
