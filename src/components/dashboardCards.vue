<template>
  <div
    class="bg-white border-none px-6 py-3 rounded-lg flex justify-between items-center w-full h-32"
  >
    <slot name="icon"></slot>

    <div class="block text-right capitalize">
      <p class="text-xl text-tegbale-text-gray font-roboto font-normal">
        {{ cardTitle }}
      </p>
      <p class="text-3xl font-semibold font-roboto text-black">
        {{ cardValue }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  cardTitle: {
    type: String,
    required: true,
  },
  cardValue: {
    type: [String, Number],
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
