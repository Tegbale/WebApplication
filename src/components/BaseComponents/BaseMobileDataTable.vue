<template>
  <div class="bg-white p-4 rounded-lg shadow">
    <div class="grid grid-auto-fit items-center justify-center">
      <div class="flex space-x-3 py-3 font-roboto text-sm font-medium">
        <span>{{ columnOneTitle }}:</span
        ><span
          class="text-blue-700 font-roboto hover:text-blue-900 hover:underline"
          v-if="isClickable"
          ><router-link :to="to">{{ columnOneText }}</router-link></span
        >
        <span class="text-tegbale-text-gray" v-if="notClickable">{{
          columnOneText
        }}</span>
      </div>
      <div class="flex space-x-3 py-3 font-roboto text-sm font-medium">
        <span>{{ columnTwoTitle }}:</span
        ><span class="text-tegbale-text-gray">{{ columnTwoText }}</span>
      </div>
      <div class="flex space-x-3 py-3 font-roboto text-sm font-medium">
        <span>{{ columnThreeTitle }}:</span>
        <span class="text-tegbale-text-gray" v-if="subTable">
          {{ columnThreeTextA }}... ({{ columnThreeTextB }})
        </span>
        <span class="text-tegbale-text-gray" v-else>{{ columnThreeText }}</span>
      </div>
      <div
        class="flex space-x-3 py-3 font-roboto text-sm font-medium"
        v-if="select"
      >
        <slot name="select" />
      </div>
    </div>
    <hr />
    <div class="flex items-center justify-end space-x-3 pt-2">
      <slot name="button" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  columnOneTitle: {
    type: String,
    required: true,
  },
  columnOneText: {
    type: String,
    required: true,
  },
  columnTwoTitle: {
    type: String,
    required: true,
  },
  columnTwoText: {
    type: String,
    required: true,
  },
  columnThreeTitle: {
    type: String,
    required: true,
  },
  columnThreeText: {
    type: String,
  },
  columnThreeTextA: {
    type: String,
  },
  columnThreeTextB: {
    type: String,
  },
  subTable: {
    type: Boolean,
    default: false,
  },
  isClickable: {
    type: Boolean,
    default: false,
  },
  notClickable: {
    type: Boolean,
    default: false,
  },
  select: {
    type: Boolean,
    default: false,
  },
  to: {
    type: Object,
  },
});
</script>

<style lang="scss" scoped></style>
